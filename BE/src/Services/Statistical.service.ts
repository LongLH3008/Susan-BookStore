import Order from "../models/Order.model";
import {
  GetAllOrderWithStatisticalRequest,
  GetAllOrderWithStatisticalResponse,
  TopSellingBook,
  TopSellingUser,
} from "./dtos/Statistincal.dto";

class StatisticalService {
  static async StatisticalPrdAndMoney(): Promise<GetAllOrderWithStatisticalResponse> {
    try {
      // Calculate top 5 best-selling books
      const topSellingBooks: TopSellingBook[] = await Order.aggregate([
        { $unwind: "$products" }, // Unwind the products array
        {
          $group: {
            _id: "$products.bookId", // Group by bookId
            totalSold: { $sum: "$products.quantity" }, // Sum quantities sold
            title: { $first: "$products.title" }, // Include book title
          },
        },
        { $sort: { totalSold: -1 } }, // Sort by totalSold descending
        { $limit: 5 }, // Limit to top 5
      ]);

      // Return only the necessary fields
      return {
        topSellingBooks,
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
}

export default StatisticalService;