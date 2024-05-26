import { ResourceNotFoundError } from "../cores/error.response";
import { IOrder, IOrderProduct, OrderState } from "../interfaces/models/IOrder";
import Order from "../models/Order.model";
import Product from "../models/Product.model";

class OrderService {
  // Phương thức để tạo đơn hàng mới
  static async create(orderData: IOrder) {
    try {
      // Xác thực và tính toán dữ liệu đơn hàng
      const validatedProducts = await Promise.all(
        orderData.order_products.map(async (product: IOrderProduct) => {
          // Lấy sản phẩm từ cơ sở dữ liệu
          const productFromDb = await Product.findById(product.product_id);
          console.log("idproduct", productFromDb);
          if (!productFromDb)
            throw new ResourceNotFoundError(
              `Không tìm thấy sản phẩm với id ${product.product_id}`
            );
          // console.log(
          //   "productFromDb.product_variations",
          //   productFromDb.product_variations
          // );

          // Tìm biến thể sản phẩm cụ thể
          const productVariant = productFromDb.product_variations.find(
            (variant) => {
              console.log("test variant", variant);
              return variant.product_variant_id === product.order_item_id;
            }
          );
          // console.log("productVariant", productVariant);

          if (!productVariant)
            throw new ResourceNotFoundError(
              `Không tìm thấy biến thể sản phẩm với id ${product.order_item_id}`
            );

          // Kiểm tra nếu có đủ hàng tồn kho cho biến thể
          if (productVariant.product_quantity < product.product_quantity)
            throw new Error(
              `Không đủ hàng tồn kho cho sản phẩm ${productFromDb.product_name} biến thể ${productVariant.product_variant_id}`
            );

          // Tính tổng và tổng biến thể sản phẩm
          const productSubtotal =
            productVariant.product_price * product.product_quantity;
          const productDiscount = product.product_discount || 0;
          const productTotal = productSubtotal - productDiscount;
          // console.log("productTotal", productTotal);
          // console.log("productSubtotal", productSubtotal);
          // console.log("productDiscount", productDiscount);

          return {
            ...product,
            product_price: productVariant.product_price,
            product_subtotal: productSubtotal,
            product_total: productTotal,
          };
        })
      );

      // Tạo đối tượng đơn hàng mới với sản phẩm đã xác thực
      const newOrder = new Order({
        order_user_id: orderData.order_user_id,
        order_shipping: orderData.order_shipping,
        order_payment: orderData.order_payment,
        order_products: validatedProducts,
        order_tracking_number: orderData.order_tracking_number || "",
        order_state: orderData.order_state || OrderState.pending,
      });

      // Bắt đầu phiên giao dịch
      const session = await Order.startSession();
      session.startTransaction();

      try {
        // Lưu đơn hàng mới
        const savedOrder = await newOrder.save({ session });

        // Cập nhật số lượng sản phẩm trong kho
        await Promise.all(
          orderData.order_products.map(async (product: IOrderProduct) => {
            await Product.updateOne(
              {
                _id: product.product_id,
                "product_variations.product_variant_id": product.order_item_id,
              },
              {
                $inc: {
                  "product_variations.$.product_quantity":
                    -product.product_quantity,
                },
              },
              { session }
            );
          })
        );

        // Cam kết giao dịch
        await session.commitTransaction();
        session.endSession();

        return savedOrder;
      } catch (error) {
        // Hủy giao dịch trong trường hợp lỗi
        await session.abortTransaction();
        session.endSession();
        throw error;
      }
    } catch (error: any) {
      console.error("Lỗi khi tạo đơn hàng:", error);
      throw new Error("Không thể tạo đơn hàng: " + error.message);
    }
  }

  // Phương thức để lấy đơn hàng theo ID
  static async getOrderById({ id }: { id: string }) {
    const order = await Order.findOne({ _id: id });
    if (!order) throw new ResourceNotFoundError("Không tìm thấy đơn hàng này");
    return order;
  }

  // Phương thức để lấy tất cả đơn hàng với phân trang
  static async getAllOrders({ page, limit }: { page: number; limit: number }) {
    const skip = (page - 1) * limit;
    const orders = await Order.find({}).skip(skip).limit(limit).lean();
    return orders;
  }

  // Phương thức để xóa đơn hàng theo ID
  static async deleteOrder({ id }: { id: string }) {
    const deletedOrder = await Order.deleteOne({ _id: id });
    if (!deletedOrder.deletedCount)
      throw new ResourceNotFoundError("Không tìm thấy đơn hàng này");
    return deletedOrder;
  }

  // Phương thức để cập nhật đơn hàng theo ID
  static async updateOrder({
    id,
    updateData,
  }: {
    id: string;
    updateData: Partial<IOrder>;
  }) {
    const updatedOrder = await Order.findOneAndUpdate({ _id: id }, updateData, {
      new: true,
    });
    if (!updatedOrder)
      throw new ResourceNotFoundError("Không tìm thấy đơn hàng này");
    return updatedOrder;
  }
}

export default OrderService;
