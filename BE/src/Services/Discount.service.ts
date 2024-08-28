"use strict";

import { BadRequestError, InternalServerError, ResourceNotFoundError } from "../cores/error.response";
import Discount from "../models/Discount.model";
import Product from "../models/Product.model";
import { validate } from "../schemas";
import discountSchema from "../schemas/discount.schema";
import { deleteNullObject } from "../utils";

const { default: mongoose } = require("mongoose");


interface Product {
    productId: string
    quantity: number
    discountCode: string
    price: number

}




class DiscountService {
    static async createDiscount(data: any) {
        console.log(data)
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
            discount_users_used,
            //tinh trang ma giam gia
            discount_start_date,
            discount_end_date,
        } = data;

        console.log(discount_name,
            discount_code,
            discount_type,
            discount_description,
            discount_value,
            discount_category_ids,
            discount_stock,
            discount_min_order_value,
            discount_max_use_per_user,
            discount_users_used,
            discount_start_date,
            discount_end_date,
            discount_applies_to,)
        validate(discountSchema, data)

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
            discount_users_used,
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
            discount_applies_to,
            discount_category_ids,
            discount_product_ids,

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



        let total = products.reduce((acc: number, cur: any) => {
            return acc + cur.product_price * cur.quantity;
        }, 0);
        if (discount_min_order_value > 0) {
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

        if (discount_applies_to == "all") {
            let amount =
                discount_type === "fixed_amount"
                    ? discount_value
                    : (discount_value * total) / 100;

            return {
                total,
                discount: amount,
                totalPrice: total - amount,
            };
        } else if (discount_applies_to == "specific" && discount_product_ids.length > 0) {
            let amount = 0
            products.filter((product: any) => {
                if (discount_product_ids.includes(product.product_id.toString())) {
                    amount += discount_type === "fixed_amount" ? discount_value : (discount_value * product.product_price) / 100;
                }
            })
            return {
                total,
                discount: amount,
                totalPrice: total - amount,
            };
        } else {
            let amount = 0;
            products.forEach((product: any) => {
                if (product.categories.some((category: any) => discount_category_ids.includes(category.toString()))) {
                    if (discount_type === "fixed_amount") {
                        amount += discount_value;
                    } else {
                        amount += (discount_value * product.product_price) / 100;
                    }
                }
            });

            return {
                total,
                discount: amount,
                totalPrice: total - amount,
            };
        }

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

    static async getDiscountByProduct(productId: string): Promise<any> {
        const foundProduct = await Product.findOne({
            _id: productId
        });

        if (!foundProduct) {
            throw new ResourceNotFoundError("This product doesn't exist!");
        }

        const discounts = await Discount.find({
            $or: [
                { discount_applies_to: "all", discount_is_active: true },
                { discount_is_active: true, discount_product_ids: productId },
                { discount_is_active: true, discount_category_ids: { $in: foundProduct.product_categories } }
            ]
        });

        return discounts;
    }

    // {
    //     "products": [
    //         {
    //             "product_id": "66c49ff8b394a1c9ab51a83c",
    //             "quantity": 2,
    //             "product_price": 10000,
    //             "code":"SUMMER2024"
    //         }
    //     ],
    //     "userId":"235234234234234"
    // }
    static async getDiscountAmount2(data: any) {
        const { products, userId } = data;

        let total = products.reduce((acc: number, cur: any) => {
            return acc + cur.product_price * cur.quantity;
        }, 0);

        let amount = 0;

        const discountCache: { [code: string]: any } = {};


        for (let product of products) {
            const { code } = product;
            if (!code) continue;

            let foundDiscount = discountCache[code];
            if (!foundDiscount) {
                foundDiscount = await Discount.findOne({ discount_code: code })
                if (!foundDiscount) throw new BadRequestError("Discount code not found");
                discountCache[code] = foundDiscount;
            }

            const {
                discount_is_active,
                discount_start_date,
                discount_end_date,
                discount_min_order_value,
                discount_max_use_per_user,
                discount_value,
                discount_applies_to,
                discount_category_ids,
                discount_product_ids,
                discount_type,
                discount_stock,
            } = foundDiscount;

            if (!discount_is_active) throw new BadRequestError("Discount code is not active");
            if (!discount_stock) throw new BadRequestError("Discount code is out of stock");
            if (new Date() < new Date(discount_start_date) || new Date() > new Date(discount_end_date)) {
                throw new BadRequestError("Discount code has expired");
            }

            if (discount_min_order_value > 0 && total < discount_min_order_value) {
                throw new BadRequestError("Order value is not enough");
            }

            if (discount_max_use_per_user > 0) {
                const foundUser = await Discount.countDocuments({
                    discount_code: code,
                    discount_users_used: userId,
                })
                if (foundUser >= discount_max_use_per_user) {
                    throw new BadRequestError("You have already used this code");
                }
            }

            if (discount_applies_to === "all") {
                amount += discount_type === "fixed_amount"
                    ? discount_value
                    : (discount_value * product.product_price * product.quantity) / 100;
            } else if (discount_applies_to === "specific" && discount_product_ids.includes(product.product_id)) {
                amount += discount_type === "fixed_amount"
                    ? discount_value
                    : (discount_value * product.product_price) / 100;
            } else if (product.categories.some((category: any) => discount_category_ids.includes(category))) {
                amount += discount_type === "fixed_amount"
                    ? discount_value
                    : (discount_value * product.product_price) / 100;
            }


            discountCache[code].discount_users_used.push(userId);
            discountCache[code].discount_stock = discount_stock - 1;
            if (discountCache[code].discount_stock < 0) throw new BadRequestError("Discount code is out of stock");
        }


        await Discount.bulkWrite(Object.values(discountCache).map((discount: any) => ({
            updateOne: {
                filter: { _id: discount._id },
                update: {
                    $set: { discount_stock: discount.discount_stock },
                    $push: { discount_users_used: userId },
                },
            },
        })));


        return {
            total,
            discount: amount,
            totalPrice: total - amount,
        };

    }

}




export default DiscountService;
