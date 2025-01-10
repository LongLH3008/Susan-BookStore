import {stat} from "fs";
import Order from "../models/Order.model";
import Book from "../models/Book.model";
import SendEmalCheckOutOrder from "../helper/EmailOrder";
import emailQueue from "../queues/mail.queue";
import {InternalServerError, ResourceNotFoundError} from "../cores/error.response";
import {Interface} from "node:readline/promises";

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
                {state: state},
                {new: true}
            );

            if (!udpateOrder) {
                throw new Error("Order not found");
            }


            const shouldSubtractStockStatus = ["confirmed", "shipped", "success"]


            if (shouldSubtractStockStatus.includes(state)) {


                if (!udpateOrder.isSubtractedStock) {
                    const productsFromServer = await Promise.all(udpateOrder.products.map(item => Book.findOne({_id: item.bookId})))

                    if (productsFromServer.some(book => !book)) throw new ResourceNotFoundError("Book not found!")

                    if (productsFromServer.some((item, index) => item!.stock < udpateOrder.products[index].quantity)) throw new InternalServerError("Some books is out of stock, please check again!")
                    const bulkUpdateOperations = udpateOrder.products.map((item: any) => ({
                        updateOne: {
                            filter: {_id: item.bookId},
                            update: {$inc: {stock: -item.quantity, sold: item.quantity}},
                        },
                    }));

                    await Book.bulkWrite(bulkUpdateOperations);
                    return await Order.findByIdAndUpdate(id, {isSubtractedStock: true}, {new: true})
                }

            }
            if (state === "cancelled") {
                if (udpateOrder.isSubtractedStock) {
                    const bulkUpdateOperations = udpateOrder.products.map((item: any) => ({
                        updateOne: {
                            filter: {_id: item.bookId},
                            update: {$inc: {stock: item.quantity, sold: -item.quantity}},
                        },
                    }));

                    await Book.bulkWrite(bulkUpdateOperations);
                }
                emailQueue.push({
                    type: "cancelOrder",
                    email: udpateOrder.userInfo.email,
                    trackingNumber: udpateOrder.trackingNumber

                })
                return await Order.findByIdAndUpdate(id, {isSubtractedStock: false}, {new: true})
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
