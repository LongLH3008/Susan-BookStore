import { ConflictError, ResourceNotFoundError } from "../cores/error.response";
import Category from "../models/Category.model";
import Product from "../models/Product.model";
import { validate } from "../schemas";
import productSchema from "../schemas/product.schema";
import { deleteNullObject } from "../utils";

interface Filter {

    product_categories?: object
    product_price?: object
    product_rating?: object
    $expr?: object
    $text?: {
        $search: string;
        $language?: string;
        $caseSensitive?: boolean;
        $diacriticSensitive?: boolean;
    };


}

type SortOrder = 1 | -1;

interface SortBy {
    [key: string]: SortOrder;
}

class ProductService {
    static async create({
        product_name,
        product_thumb = "",
        product_description,
        product_price, product_images = [],
        product_variations,
        product_categories,
        product_attributes = {} }: any) {
        validate(productSchema, { product_name, product_description, product_price, product_categories, product_images, product_variations, product_thumb, product_attributes })

        const foundProduct = await Product.findOne({ product_name })
        if (foundProduct) throw new ConflictError("this product already exists")

        for (let category of product_categories) {
            const foundCategory = await Category.findOne({ _id: category })
            if (!foundCategory) throw new ResourceNotFoundError(`categoriy: ${category} not found`)
        }
        
        const newProduct = await Product.create({ product_name, product_thumb, product_description, product_price, product_images, product_variations, product_categories, product_attributes })

        return newProduct
    }
    static async getAllProducts({ page, limit }: { page: number, limit: number }) {
        const skip = (page - 1) * limit
        const products = await Product.find({}).skip(skip).limit(limit).lean()
        return products
    }
    static async getProductByQuery(query: any) {
        const { category_ids, page = 1, limit = 10, sort = "ascByName", minPrice, maxPrice, minRating, search }: {
            category_ids: string,
            page: number,
            limit: number,
            sort: string,
            minPrice: number,
            maxPrice: number,
            minRating: string,
            search: string
        } = query

        let skip: number = 0
        let sortBy: SortBy = {}
        let filter: Filter = {}

        if (category_ids) {
            filter.product_categories = { $all: category_ids.split(",") }
            filter.$expr = {
                $gte: [
                    { $size: { $setIntersection: ['$product_categories', category_ids.split(",")] } },
                    category_ids.split(",").length
                ]
            }

        }

        if (minPrice) {
            filter.product_price = { $gte: minPrice };
        }
        if (maxPrice) {
            filter.product_price = { $lte: maxPrice };
        }

        if (minPrice && maxPrice) {
            filter.product_price = { $gte: minPrice, $lte: maxPrice };
        }

        if (minRating) {
            filter.product_rating = { $gte: parseFloat(minRating) };
        }
        if (search) {
            filter.$text = { $search: search };
        }


        if (page > 0 && limit > 0) {
            skip = (page - 1) * limit;
        }

        console.log(page, limit)
        if (sort) {
            if (sort == "ascByPrice") sortBy = { product_price: 1 };
            if (sort == "descByPrice") sortBy = { product_price: -1 };
            if (sort == "ascByRating") sortBy = { product_rating: 1 };
            if (sort == "descByRating") sortBy = { product_rating: -1 };
            if (sort == "ascByName") sortBy = { product_name: 1 };
            if (sort == "descByName") sortBy = { product_name: -1 };
        }
        const products = await Product.find(filter).sort(sortBy).skip(skip).limit(limit).lean()
        return products
    }

    static async getProductById({ id }: { id: string }) {
        const foundProduct = await Product.findOne({ _id: id })
        if (!foundProduct) throw new ResourceNotFoundError("this product not found")
        return foundProduct
    }
    static async updateProduct(id: string, data: any) {

        const updateObject = deleteNullObject(data)
        const foundProduct = await Product.findOne({ _id: id })
        if (!foundProduct) throw new ResourceNotFoundError("this product not found")

        const updateProduct = await Product.findOneAndUpdate({ _id: id }, updateObject, { new: true })

        return updateProduct
    }
    static async deleteProduct({ id }: { id: string }) {
        const foundProduct = await Product.findOne({ _id: id })
        if (!foundProduct) throw new ResourceNotFoundError("this product not found")
        return await Product.deleteOne({ _id: id })
    }
    static async updateVariation(product_id: string, variant_id: string, data: any) {
        const updateObject = deleteNullObject(data)
        const foundProduct = await Product.findOne({ _id: product_id })
        if (!foundProduct) throw new ResourceNotFoundError("this product not found")

        const updateProduct = await Product.findOneAndUpdate({ _id: product_id, "product_variations.product_variant_id": variant_id }, { $set: { "product_variations.$": updateObject } }, { new: true })

        return updateProduct
    }
}
export default ProductService