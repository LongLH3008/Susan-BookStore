import Order from "../models/Order.model";

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
