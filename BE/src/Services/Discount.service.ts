"use strict";

import { BadRequestError } from "../cores/error.response";
import Discount from "../models/Discount.model";
import Product from "../models/Product.model";
import { validate } from "../schemas";
import discountSchema from "../schemas/discount.schema";
import { deleteNullObject } from "../utils";

const { default: mongoose } = require("mongoose");



class DiscountService {
    static async createDiscount(payload: any) {
        const {
            discount_name,

            //ma giam gia
            discount_code,
            //loai ma giam gai
            discount_type,
            discount_description,

            //gia tri giam gia
            discount_value,
            //ap dung voi
            discount_applies_to,
            //ma san pha mduoc ap dung
            discount_product_ids,
            //ma danh muc duoc ap dung
            discount_category_ids,
            //so lan su dung cua ma giam gia
            discount_stock,

            //gia tri don hang toi thieu de su dung
            discount_min_order_value,
            //so lan su dung toi da cho moi user
            discount_max_use_per_user,
            //danh sach user da su dung
            discount_user_used,
            //tinh trang ma giam gia
            discount_start_date,
            discount_end_date,
        } = payload;
        validate(discountSchema, payload)

        if (new Date() > new Date(discount_end_date)) {
            throw new BadRequestError("discount code has expired");
        }

        //create index for discount code
        const foundDiscountCode = await Discount
            .findOne({
                discount_code: discount_code,
            })
            .lean();

        if (foundDiscountCode && foundDiscountCode.discount_is_active)
            throw new BadRequestError("discount code already exists");
        const newDiscount = await Discount.create({
            discount_name,
            discount_code,
            discount_type,
            discount_description,
            discount_value,
            discount_category_ids,
            discount_stock,
            discount_min_order_value,
            discount_max_use_per_user,
            discount_user_used,
            discount_start_date,
            discount_end_date,
            discount_applies_to,
            discount_product_ids: discount_applies_to === "specific" ? discount_product_ids : [],
        });
        return newDiscount;
    }
    static async getAll({ limit, page }: any) {
        const skip = (page - 1) * limit;
        const [discounts, totalCount] = await Promise.all([
            Discount.find({ discount_is_active: true }).skip(skip).limit(limit).lean(),
            Discount.countDocuments({}),
        ]);

        const totalPages = Math.ceil(totalCount / limit);

        return {
            discounts,
            totalPages,
        };
    }
    static async updateDiscount(payload: any) {

        const foundShop = await Discount
            .findOne({
                discount_code: payload.code,
                discount_shopId: new mongoose.Types.ObjectId(payload.shopId),
            })
            .lean();
        if (!foundShop) throw new BadRequestError("discount code not found");
        const result = await Discount.updateOne(
            {
                discount_code: payload.code,
            },
            deleteNullObject(payload),
            { new: true }
        );
        return result;
    }
    static async getAllDiscountCodesWithProduct({ code, limit, page }: any) {
        const skip = (page - 1) * limit;

        const foundDiscount = await Discount
            .findOne({
                discount_code: code,

            })
            .skip(skip).limit(limit)
            .lean();
        if (!foundDiscount || !foundDiscount.discount_is_active)
            throw new BadRequestError("discount code not found");
        if (foundDiscount.discount_applies_to === "all") {
            const filter = {
                isActive: true,
            };
            return await Product.find({
                limit,
                page,
                sort: "ctime",
                filter,
                select: ["product_name"],
            }).lean();
        }
        if (foundDiscount.discount_applies_to === "specific") {
            const filter = {
                isPublish: true,
                _id: { $in: foundDiscount.discount_product_ids },
            };

            return await Product.find(filter).skip(skip).limit(limit).lean();
        }
    }




    static async getDiscountAmount({ code, products, userId }: any) {
        const foundDiscount = await Discount.findOne({
            discount_code: code,

        });
        if (!foundDiscount) throw new BadRequestError("discount code not found");

        const {
            discount_is_active,
            discount_start_date,
            discount_end_date,
            discount_min_order_value,
            discount_max_use_per_user,
            discount_value,

            discount_type,
            discount_stock
        } = foundDiscount;
        if (!discount_is_active)
            throw new BadRequestError("discount code is not active");
        if (!discount_stock)
            throw new BadRequestError("discount code is out of stock");
        if (
            new Date() < new Date(discount_start_date) ||
            new Date() > new Date(discount_end_date)
        )
            throw new BadRequestError("discount code has expired");
        let total = 0;
        if (discount_min_order_value > 0) {
            total = products.reduce((acc: number, cur: any) => {
                return acc + cur.product_price * cur.quantity;
            }, 0);
            if (total < discount_min_order_value)
                throw new BadRequestError("order value is not enough");
        }
        if (discount_max_use_per_user > 0) {
            const foundUser = await Discount.find({
                discount_code: code,
                discount_users_used: userId,
            });
            if (foundUser.length >= discount_max_use_per_user)
                throw new BadRequestError("you have already used this code");
        }

        const amount =
            discount_type === "fixed_amount"
                ? discount_value
                : (discount_value * total) / 100;

        return {
            total,
            discount: amount,
            totalPrice: total - amount,
        };
    }
    static async deleteDiscount({ code }: any) {
        const deleteDiscount = await Discount.findOneAndDelete({
            discount_code: code,
            discount_is_active: true,

        });

        return deleteDiscount;
    }
    static async cancelDiscount({ code, userId }: any) {
        const foundDiscount = await Discount.findOne({
            discount_code: code,
        });
        if (!foundDiscount) throw new BadRequestError("discount code not found");

        const result = await Discount.updateOne(
            { _id: foundDiscount._id },
            {
                $pull: { discount_users_used: userId },
                $inc: { discount_uses_count: 1, discount_max_uses: 1 },
            }
        );

        return result;
    }
    static async activeDiscount({ code }: any) {
        const foundDiscount = await Discount.findOne({
            discount_code: code,
        });
        if (!foundDiscount) throw new BadRequestError("discount code not found");
        const result = await Discount.updateOne(
            { _id: foundDiscount._id },
            {
                discount_is_active: true,
            }
        );
        return result;
    }
    static async inActiveDiscount({ code }: any) {
        const foundDiscount = await Discount.findOne({
            discount_code: code,
        });
        if (!foundDiscount) throw new BadRequestError("discount code not found");
        const result = await Discount.updateOne(
            { _id: foundDiscount._id },
            {
                discount_is_active: false,
            }
        );
        return result;
    }
    static async getDiscountByProduct({ productId }: any) {
        const discountApplyToAll = await Discount.find({
            discount_applies_to: "all",
            discount_is_active: true
        })
        const foundDiscountWithProductId = await Discount.find({
            discount_is_active: true,
            discount_product_ids: productId,
        });

        return { ...discountApplyToAll, ...foundDiscountWithProductId };
    }
}

export default DiscountService;
