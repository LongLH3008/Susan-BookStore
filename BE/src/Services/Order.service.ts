import { ResourceNotFoundError } from "../cores/error.response";
import { IOrder, IOrderProduct, OrderState } from "../interfaces/models/IOrder";
import Order from "../models/Order.model";

class OrderService {
  static async create(orderData: IOrder) {
    try {
      console.log(orderData);
      const newOrder = new Order({
        order_user_id: orderData.order_user_id,
        order_shipping: orderData.order_shipping,
        order_payment: orderData.order_payment,
        order_products: orderData.order_products.map(
          (product: IOrderProduct) => ({
            order_item_id: product.order_item_id,
            product_id: product.product_id,
            product_name: product.product_name,
            product_quantity: product.product_quantity,
            product_price: product.product_price,
            product_subtotal: product.product_price * product.product_quantity,
            product_discount: product.product_discount || 0,
            product_total:
              product.product_price * product.product_quantity -
              (product.product_discount || 0),
          })
        ),
        order_tracking_number: orderData.order_tracking_number || "",
        order_state: orderData.order_state || OrderState.pending,
      });
      console.log("newOrder", newOrder);
      const savedOrder = await newOrder.save();
      return savedOrder;
    } catch (error: any) {
      console.error("Error creating order:", error);
      throw new Error("Failed to create order: " + error.message);
    }
  }

  static async getOrderById({ id }: { id: string }) {
    const order = await Order.findOne({ _id: id });
    if (!order) throw new ResourceNotFoundError("this order not found");
    return order;
  }

  static async getAllOrders({ page, limit }: { page: number; limit: number }) {
    const skip = (page - 1) * limit;
    const orders = await Order.find({}).skip(skip).limit(limit).lean();
    return orders;
  }

  static async deleteOrder ({ id }: { id: string }) {
    const deletedOrder = await Order.deleteOne({ _id: id });
    if (!deletedOrder.deletedCount) throw new ResourceNotFoundError("this order not found");
    return deletedOrder
  }

  static async updateOrder({ id, updateData }: { id: string, updateData: Partial<IOrder> }) {
    const updatedOrder = await Order.findOneAndUpdate(
      { _id: id },
      updateData,
      { new: true }
    );
    if (!updatedOrder) throw new ResourceNotFoundError("This order not found");
    return updatedOrder;
  }
}

export default OrderService;
