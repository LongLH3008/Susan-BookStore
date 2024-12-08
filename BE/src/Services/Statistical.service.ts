import Order from "../models/Order.model";
import {
  GetAllOrderWithStatisticalRequest,
  GetAllOrderWithStatisticalResponse,
  StatisticalOrderDto,
  TopSellingBook,
  TopSellingUser,
} from "./dtos/Statistincal.dto";

class StatisticalService {
  static async StatisticalPrdAndMoney(
    from: Date,
    to: Date,
    page: number = 1,
    limit: number = 5
  ): Promise<GetAllOrderWithStatisticalResponse> {
    try {
      // Chuyển đổi ngày tháng
      const fromDate = new Date(from);
      const toDate = new Date(to);

      // Đảm bảo toDate được đặt về cuối ngày
      toDate.setHours(23, 59, 59, 999);

      const topSellingBooks: TopSellingBook[] = await Order.aggregate([
        {
          $match: {
            createdAt: {
              $gte: fromDate,
              $lte: toDate,
            },
          },
        },
        { $unwind: "$products" },
        {
          $group: {
            _id: "$products.bookId",
            totalSold: { $sum: "$products.quantity" },
            bookName: { $first: "$products.title" },
            totalRevenue: {
              $sum: { $multiply: ["$products.quantity", "$products.price"] },
            },
          },
        },
        { $sort: { totalSold: -1 } },
        { $skip: (page - 1) * limit },
        { $limit: limit },
      ]);

      return {
        topSellingBooks,
        page,
        limit,
      };
    } catch (error) {
      throw error;
    }
  }

  static async TopBuyingUsers(): Promise<TopSellingUser[]> {
    try {
      // check xem có userId với với lấy

      const topBuyingUsers: TopSellingUser[] = await Order.aggregate([
        { $unwind: "$products" }, // Phân tách mảng products
        {
          $group: {
            _id: "$userId", // Nhóm theo userId
            totalPurchased: { $sum: "$products.quantity" }, // Tổng sản phẩm đã mua
          },
        },
        {
          $match: {
            _id: { $ne: null }, // Loại bỏ userId null
          },
        },
        {
          $lookup: {
            from: "User", // Tên collection chứa thông tin người dùng
            localField: "_id", // userId từ Order
            foreignField: "_id", // _id từ User
            as: "userDetails",
          },
        },
        {
          $addFields: {
            user_name: {
              $ifNull: [
                { $arrayElemAt: ["$userDetails.user_name", 0] },
                "Unknown User",
              ],
            }, // Lấy user_name, nếu không có thì mặc định "Unknown User"
          },
        },
        { $sort: { totalPurchased: -1 } }, // Sắp xếp giảm dần
        { $limit: 5 }, // Lấy top 5 người dùng
        { $project: { userDetails: 0 } }, // Loại bỏ userDetails
      ]);

      return topBuyingUsers;
    } catch (error) {
      console.error("Error in TopBuyingUsers:", error);
      throw error;
    }
  }

  // statistical view prd by day and month
  static async filterbydayandmonth(filter: {
    date?: string;
    month?: number;
    year?: number;
  }): Promise<TopSellingUser[]> {
    try {
      const matchStage: any = {};

      // Lọc theo ngày cụ thể (nếu có)
      if (filter.date) {
        const specificDate = new Date(filter.date); // Chuyển đổi thành Date object
        matchStage["$expr"] = {
          $and: [
            { $eq: [{ $dayOfMonth: "$createdAt" }, specificDate.getDate()] },
            { $eq: [{ $month: "$createdAt" }, specificDate.getMonth() + 1] },
            { $eq: [{ $year: "$createdAt" }, specificDate.getFullYear()] },
          ],
        };
      }

      // Lọc theo tháng và năm (nếu có)
      if (filter.month && filter.year) {
        matchStage["$expr"] = {
          $and: [
            { $eq: [{ $month: "$createdAt" }, filter.month] },
            { $eq: [{ $year: "$createdAt" }, filter.year] },
          ],
        };
      }

      // Pipeline chính
      const topBuyingUsers: TopSellingUser[] = await Order.aggregate([
        { $unwind: "$products" }, // Phân tách mảng products
        {
          $group: {
            _id: "$userId", // Nhóm theo userId
            totalPurchased: { $sum: "$products.quantity" }, // Tổng sản phẩm đã mua
          },
        },
        ...(Object.keys(matchStage).length > 0 ? [{ $match: matchStage }] : []), // Áp dụng điều kiện lọc nếu có
        {
          $lookup: {
            from: "users", // Tên collection chứa thông tin người dùng
            localField: "_id", // userId từ Order
            foreignField: "_id", // _id từ User
            as: "userDetails",
          },
        },
        {
          $addFields: {
            user_name: {
              $ifNull: [
                { $arrayElemAt: ["$userDetails.user_name", 0] },
                "Unknown User",
              ],
            },
          },
        },
        { $sort: { totalPurchased: -1 } }, // Sắp xếp giảm dần
        { $limit: 5 }, // Lấy top 5 người dùng
        { $project: { userDetails: 0 } }, // Loại bỏ userDetails
      ]);

      return topBuyingUsers;
    } catch (error) {
      console.error("Error in TopBuyingUsers:", error);
      throw error;
    }
  }

  static async StatisticalOrderbydayAndMonth(filter: {
    date?: string;
    month?: number;
    year?: number;
  }): Promise<StatisticalOrderDto[]> {
    try {
      const matchStage: any = {};

      // Lọc theo ngày cụ thể
      if (filter.date) {
        const specificDate = new Date(filter.date);
        matchStage["$expr"] = {
          $and: [
            { $eq: [{ $dayOfMonth: "$createdAt" }, specificDate.getDate()] },
            { $eq: [{ $month: "$createdAt" }, specificDate.getMonth() + 1] },
            { $eq: [{ $year: "$createdAt" }, specificDate.getFullYear()] },
          ],
        };
      }

      // Lọc theo tháng và năm
      if (filter.month && filter.year) {
        matchStage["$expr"] = {
          $and: [
            { $eq: [{ $month: "$createdAt" }, filter.month] },
            { $eq: [{ $year: "$createdAt" }, filter.year] },
          ],
        };
      }

      // Pipeline
      const orderStatistics: StatisticalOrderDto[] = await Order.aggregate([
        ...(Object.keys(matchStage).length > 0 ? [{ $match: matchStage }] : []),
        { $unwind: "$products" }, // Tách các sản phẩm trong đơn hàng
        {
          $group: {
            _id: null,
            totalOrders: { $sum: 1 }, // Tổng số đơn hàng
            totalRevenue: { $sum: "$total" }, // Tổng doanh thu
            totalSold: { $sum: "$products.quantity" }, // Tổng số sách đã bán
          },
        },
        {
          $project: {
            _id: 0,
            totalOrders: 1,
            totalRevenue: 1,
            totalSold: 1,
          },
        },
      ]);
      return orderStatistics;
    } catch (error: any) {
      console.error("Error in StatisticalOrderbydayAndMonth:", error);
      throw new Error("Không thể thống kê đơn hàng: " + error.message);
    }
  }
}

export default StatisticalService;
