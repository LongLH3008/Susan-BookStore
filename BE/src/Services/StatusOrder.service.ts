import { stat } from "fs";
import Order from "../models/Order.model";
import Book from "../models/Book.model";
import SendEmalCheckOutOrder from "../helper/EmailOrder";

class StatusOrerService {


  // pending = "pending", confirmed = "confirmed", shipped = "shipped", cancelled = "cancelled", "success" = "success"
  static async UpdateStatusOrderForAdmin(id: string, state: string) {
    try {
      // checkId Order
      const validStatuses = [
        "pending",
        "confirmed",
        "shipped",
        "cancelled",
        "success",
      ];
      if (!validStatuses.includes(state)) {
        throw new Error(
          "Invalid status. Valid statuses: pending, confirmed, shipped, cancelled"
        );
      }
      // udpate
      const udpateOrder = await Order.findByIdAndUpdate(
        id,
        { state: state },
        { new: true }
      );

      if (!udpateOrder) {
        throw new Error("Order not found");
      }


      const shouldSubtractStockStatus = ["confirmed", "shipped", "success"]


      if (shouldSubtractStockStatus.includes(state)) {
        if (!udpateOrder.isSubtractedStock) {
          const bulkUpdateOperations = udpateOrder.products.map((item: any) => ({
            updateOne: {
              filter: { _id: item.bookId },
              update: { $inc: { stock: -item.quantity } },
            },
          }));

          await Book.bulkWrite(bulkUpdateOperations);
          return await Order.findByIdAndUpdate(id, { isSubtractedStock: true }, { new: true })
        }

      }
      if (state === "cancelled") {
        if (udpateOrder.isSubtractedStock) {
          const bulkUpdateOperations = udpateOrder.products.map((item: any) => ({
            updateOne: {
              filter: { _id: item.bookId },
              update: { $inc: { stock: item.quantity } },
            },
          }));

          await Book.bulkWrite(bulkUpdateOperations);
          (udpateOrder.userInfo.email, udpateOrder.trackingNumber)

        }
        await SendEmalCheckOutOrder.sendCancellationNotification(udpateOrder.userInfo.email,udpateOrder.trackingNumber)
        return await Order.findByIdAndUpdate(id, { isSubtractedStock: false }, { new: true })
      }
      return udpateOrder;
    } catch (err: any) {
      console.log(err.message);
      throw new Error(err.message);
    }
  }
  static async UpdateStatusOrderForClient(id: number) {
    try {
    } catch (err: any) {
      console.log(err.message);
      throw new Error(err.message);
    }
  }
}

export default StatusOrerService;
