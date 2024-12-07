import { BadRequestError, ResourceNotFoundError } from "../cores/error.response";
import { DiscountApplyTo, DiscountType } from '../interfaces/models/IDiscount';
import { IOrderProduct } from "../interfaces/models/IOrder";
import Book from "../models/Book.model";
import Discount from "../models/Discount.model";
import { discountCreateSchema, discountQuerySchema, discountUpdateSchema } from "../schemas/discount.schema";
import { deleteNullObject } from "../utils";
import BookService from "./Book.service";
import {
    DiscountCreateInputDTO,
    DiscountListOutputDTO,
    DiscountOutputDTO,
    DiscountQueryInputDTO,
    DiscountUpdateInputDTO
} from "./dtos/Discount.dto";

const { default: mongoose } = require("mongoose");

interface BookItem {
    product_id: string;
    quantity: number;
    product_price: number;
    discount: number;
    title: string;
    weight?: number;
    height?: number;
    width?: number;
    length?: number
    isbn?: string;
}

export interface DiscountInput {
    products: BookItem[];
    userId?: string;
    code?: string
}

class DiscountService {
    static async createDiscount(data: DiscountCreateInputDTO): Promise<DiscountOutputDTO> {
        const { error } = discountCreateSchema.validate(data);
        if (error) throw new BadRequestError(error.details[0].message);

        const existingDiscount = await Discount.findOne({ discount_code: data.discount_code });
        if (existingDiscount) {
            throw new BadRequestError("Mã giảm giá đã tồn tại");
        }

        if (data?.discount_category_ids && data.discount_category_ids.length > 0) {
            const getBooks = await BookService.getBookByQuery({ category_ids: data.discount_category_ids[0], limit: 9999 })
            data.discount_product_ids = [...getBooks?.books.map((item) => item._id)]
        }

        const newDiscount = await Discount.create(data);
        return newDiscount.toObject() as DiscountOutputDTO;
    }

    static async getAllDiscounts(query: DiscountQueryInputDTO): Promise<DiscountListOutputDTO> {
        const { error } = discountQuerySchema.validate(query);
        if (error) throw new BadRequestError(error.details[0].message);

        const { page = 1, limit = 10, code } = query;
        const skip = (page - 1) * limit;

        const filter: any = { discount_is_active: true };
        if (code) {
            filter.discount_code = code;
        }

        const [discounts, totalCount] = await Promise.all([
            Discount.find(filter).skip(skip).limit(limit).lean(),
            Discount.countDocuments(filter),
        ]);

        const totalPages = Math.ceil(totalCount / limit);
        const mappedDiscounts: DiscountOutputDTO[] = discounts.map(d => ({
            id: d._id.toString(),
            ...d,
            createdAt: (d as any).createdAt?.toISOString(),
            updatedAt: (d as any).updatedAt?.toISOString(),
        }));
        return {
            discounts: mappedDiscounts,
            total: totalCount,
            page,
            limit,
            totalPages,
        };
    }

    static async getAllDiscountsAdmin(query: DiscountQueryInputDTO): Promise<DiscountListOutputDTO> {
        const { error } = discountQuerySchema.validate(query);
        if (error) throw new BadRequestError(error.details[0].message);

        const { page = 1, limit = 10, code } = query;
        const skip = (page - 1) * limit;

        const filter: any = { discount_is_active: true };
        if (code) {
            filter.discount_code = code;
        }

        const [discounts, totalCount] = await Promise.all([
            Discount.find().skip(skip).limit(limit).lean(),
            Discount.countDocuments(filter),
        ]);

        const totalPages = Math.ceil(totalCount / limit);
        const mappedDiscounts: DiscountOutputDTO[] = discounts.map(d => ({
            id: d._id.toString(),
            ...d,
            createdAt: (d as any).createdAt?.toISOString(),
            updatedAt: (d as any).updatedAt?.toISOString(),
        }));
        return {
            discounts: mappedDiscounts,
            total: totalCount,
            page,
            limit,
            totalPages,
        };
    }

    static async updateDiscount(id: string, payload: DiscountUpdateInputDTO): Promise<DiscountOutputDTO> {
        const { error } = discountUpdateSchema.validate(payload);
        if (error) throw new BadRequestError(error.details[0].message);

        if (payload?.discount_category_ids && payload.discount_category_ids.length > 0) {
            const getBooks = await BookService.getBookByQuery({ category_ids: payload.discount_category_ids[0], limit: 9999 })
            payload.discount_product_ids = [...getBooks?.books.map((item) => item._id)]
        }

        const updatedDiscount = await Discount.findOneAndUpdate(
            { _id: id, discount_is_active: true },
            deleteNullObject(payload),
            { new: true }
        ).lean();

        if (!updatedDiscount) {
            throw new ResourceNotFoundError("Mã giảm giá không tồn tại hoặc đã bị vô hiệu hóa");
        }

        return updatedDiscount as unknown as DiscountOutputDTO;
    }

    static async getDiscount(id: string): Promise<DiscountOutputDTO | null> {
        const discount = await Discount.find({
            _id: id,
        }).lean();

        return discount as any;
    }

    static async deleteDiscount(code: string): Promise<DiscountOutputDTO | null> {
        const deletedDiscount = await Discount.findOneAndDelete({
            discount_code: code,
            discount_is_active: true,
        }).lean();

        return deletedDiscount as DiscountOutputDTO | null;
    }

    static async cancelDiscount(code: string, userId: string): Promise<any> {
        const result = await Discount.updateOne(
            { discount_code: code, discount_is_active: true },
            {
                $pull: { discount_users_used: userId },
                $inc: { discount_uses_count: -1, discount_max_uses: 1 },
            }
        );

        if (result.modifiedCount === 0) {
            throw new BadRequestError("Mã giảm giá không tồn tại hoặc đã bị vô hiệu hóa");
        }

        return result;
    }

    static async activateDiscount(code: string): Promise<any> {
        const result = await Discount.updateOne(
            { discount_code: code },
            { discount_is_active: true }
        );

        if (result.modifiedCount === 0) {
            throw new BadRequestError("Mã giảm giá không tồn tại");
        }

        return result;
    }

    static async deactivateDiscount(code: string): Promise<any> {
        const result = await Discount.updateOne(
            { discount_code: code },
            { discount_is_active: false }
        );

        if (result.modifiedCount === 0) {
            throw new BadRequestError("Mã giảm giá không tồn tại");
        }

        return result;
    }

    static async getDiscountByBook(bookId: string): Promise<any> {
        const foundBook = await Book.findOne({ _id: bookId, isActive: true });

        if (!foundBook) {
            throw new ResourceNotFoundError("Sách không tồn tại hoặc đã bị vô hiệu hóa");
        }

        const discounts = await Discount.find({
            discount_is_active: true,
            $or: [
                { discount_applies_to: DiscountApplyTo.all },
                { discount_applies_to: DiscountApplyTo.specific, discount_product_ids: bookId },
                { discount_applies_to: DiscountApplyTo.category, discount_category_ids: { $in: foundBook.categories } }
            ]
        }).lean();

        return discounts;
    }

    static async getDiscountAmount2(data: DiscountInput) {


        const { products, code, userId } = data;

        let subtotal = products.reduce((acc: number, cur: BookItem) => {
            return acc + (cur.product_price * cur.quantity);
        }, 0);
        let discountAmount = products.reduce((acc: number, cur: BookItem) => {
            return acc + (cur.product_price * cur.quantity * Math.abs(cur.discount) / 100);
        }, 0)

        let discountAmountVoucher = 0;

        let productsAfterDiscount: IOrderProduct[] = []


        if (!code) {
            for (const product of products) {
                const productAfterDiscount = {
                    ...product,
                    discountAmount: 0,
                    discountAmountVoucher: 0,
                    total: 0,
                    subtotal: 0,
                    title: product.title
                };
                productAfterDiscount.subtotal = product.product_price * product.quantity;
                productAfterDiscount.discountAmount = product.product_price * product.quantity * Math.abs(product.discount) / 100
                productAfterDiscount.total = productAfterDiscount.subtotal - productAfterDiscount.discountAmount;

                productsAfterDiscount.push({
                    bookId: product.product_id,
                    title: product.title,
                    name: product.title,
                    quantity: product.quantity,
                    price: product.product_price,
                    discount: product.discount,
                    discountAmountVoucher: productAfterDiscount.discountAmountVoucher,
                    discountAmount: productAfterDiscount.discountAmount,
                    total: productAfterDiscount.total,
                    subtotal: productAfterDiscount.subtotal,
                    isbn: product.isbn,
                    length: product.length ? Math.round(product.length) : 0,
                    width: product.width ? Math.round(product.width) : 0,
                    weight: product.weight ? Math.round(product.weight) : 0,
                    height: product.height ? Math.round(product.height) : 0

                });
            }
            return {
                productsAfterDiscount,
                subtotal,
                discountAmount,
                discountAmountVoucher,
                code,
                total: subtotal - discountAmount - discountAmountVoucher,
            };
        }
        let foundDiscount = await Discount.findOne({ discount_code: code });
        if (!foundDiscount) throw new BadRequestError("Mã giảm giá không tồn tại");

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

        if (!discount_is_active) throw new BadRequestError("Mã giảm giá không còn hoạt động");
        if (!discount_stock) throw new BadRequestError("Mã giảm giá đã hết lượt sử dụng");
        if (new Date() < new Date(discount_start_date) || new Date() > new Date(discount_end_date)) {
            throw new BadRequestError("Mã giảm giá đã hết hạn");
        }

        if (discount_min_order_value > 0 && subtotal < discount_min_order_value) {
            throw new BadRequestError("Giá trị đơn hàng chưa đủ để áp dụng mã giảm giá");
        }

        if (discount_max_use_per_user > 0) {
            const foundUser = await Discount.countDocuments({
                discount_code: code,
                discount_users_used: userId,
            });
            if (foundUser >= discount_max_use_per_user) {
                throw new BadRequestError("Bạn đã sử dụng hết số lần cho phép của mã giảm giá này");
            }
        }

        for (let product of products) {

            const productAfterDiscount = {
                ...product,
                discountAmount: 0,
                discountAmountVoucher: 0,
                total: 0,
                subtotal: 0,
                title: product.title
            };


            const foundBook = await Book.findById(product.product_id).lean();
            if (!foundBook) throw new ResourceNotFoundError("Sách không tồn tại");

            if (discount_applies_to === DiscountApplyTo.all) {
                const discountValue = discount_type === DiscountType.fix_amount
                    ? discount_value
                    : (discount_value * product.product_price * product.quantity) / 100;
                discountAmountVoucher += discountValue * product.quantity;
                productAfterDiscount.discountAmountVoucher = discountValue;

            } else if (discount_applies_to === DiscountApplyTo.specific && discount_product_ids.includes(product.product_id)) {
                const discountValue = discount_type === DiscountType.fix_amount
                    ? discount_value
                    : (discount_value * product.product_price * product.quantity) / 100;
                discountAmountVoucher += discountValue * product.quantity;
                productAfterDiscount.discountAmountVoucher = discountValue;
            } else if (discount_applies_to === DiscountApplyTo.category && foundBook.categories.some((category: string) => discount_category_ids.includes(category))) {
                const discountValue = discount_type === DiscountType.fix_amount
                    ? discount_value
                    : (discount_value * product.product_price * product.quantity) / 100;
                discountAmountVoucher += discountValue * product.quantity;
                productAfterDiscount.discountAmountVoucher = discountValue;
            }


            productAfterDiscount.subtotal = product.product_price * product.quantity;
            productAfterDiscount.discountAmount = product.product_price * product.quantity * product.discount / 100
            productAfterDiscount.total = productAfterDiscount.subtotal - productAfterDiscount.discountAmount - productAfterDiscount.discountAmountVoucher;

            productsAfterDiscount.push({
                bookId: product.product_id,
                title: product.title,
                name: product.title,
                quantity: product.quantity,
                price: product.product_price,
                discount: product.discount,
                discountAmountVoucher: productAfterDiscount.discountAmountVoucher,
                discountAmount: productAfterDiscount.discountAmount,
                total: productAfterDiscount.total,
                subtotal: productAfterDiscount.subtotal,
                isbn: product.isbn,
                length: product.length ? Math.round(product.length) : 0,
                width: product.width ? Math.round(product.width) : 0,
                weight: product.weight ? Math.round(product.weight) : 0,
                height: product.height ? Math.round(product.height) : 0

            });

        }


        return {
            productsAfterDiscount,
            subtotal,
            discountAmount,
            discountAmountVoucher,
            code,
            total: subtotal - discountAmount - discountAmountVoucher,
        };
    }

}

export default DiscountService;