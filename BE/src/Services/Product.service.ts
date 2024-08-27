import { ConflictError, ResourceNotFoundError } from "../cores/error.response";
import Category from "../models/Category.model";
import Product from "../models/Product.model";
import { validate } from "../schemas";
import productSchema from "../schemas/product.schema";
import { deleteNullObject } from "../utils";

interface Filter {
  product_categories?: object;
  product_price?: object;
  product_rating?: object;
  $expr?: object;
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
    product_price,
    product_images = [],
    product_variations,
    product_categories,
    product_attributes = {},
  }: any) {
    validate(productSchema, {
      product_name,
      product_description,
      product_price,
      product_categories,
      product_images,
      product_variations,
      product_thumb,
      product_attributes,
    });
    const foundProduct = await Product.findOne({ product_name });
    if (foundProduct) throw new ConflictError("this product already exists");

    for (let category of product_categories) {
      const foundCategory = await Category.findOne({ _id: category });
      if (!foundCategory)
        throw new ResourceNotFoundError(`categoriy: ${category} not found`);
    }

    const newProduct = await Product.create({
      product_name,
      product_thumb,
      product_description,
      product_price,
      product_images,
      product_variations,
      product_categories,
      product_attributes,
    });
    return newProduct;
  }
  static async getAllProducts({
    page,
    limit,
  }: {
    page: number;
    limit: number;
  }) {
    const skip = (page - 1) * limit;
    const products = await Product.find({
      product_categories: { $not: { $size: 0 } }
    })
      .skip(skip)
      .limit(limit)
      .lean();
    return products;
  }
  // static async getProductByQuery(query: any) {
  //   const {
  //     category_ids,
  //     page = 1,
  //     limit = 10,
  //     sort = "ascByName",
  //     minPrice,
  //     maxPrice,
  //     minRating,
  //     search,
  //   }: {
  //     category_ids: string;
  //     page: number;
  //     limit: number;
  //     sort: string;
  //     minPrice: number;
  //     maxPrice: number;
  //     minRating: string;
  //     search: string;
  //   } = query;

  //   let skip: number = 0;
  //   let sortBy: SortBy = {};
  //   let filter: Filter = {};


  //   if (category_ids) {
  //     const categoriesArray = category_ids.split(",");
  //     filter.product_categories = { $in: categoriesArray, $not: { $size: 0 } };
  //   }

  //   if (minPrice) {
  //     filter.product_price = { $gte: minPrice };
  //   }
  //   if (maxPrice) {
  //     filter.product_price = { $lte: maxPrice };
  //   }

  //   if (minPrice && maxPrice) {
  //     filter.product_price = { $gte: minPrice, $lte: maxPrice };
  //   }

  //   if (minRating) {
  //     filter.product_rating = { $gte: parseFloat(minRating) };
  //   }
  //   if (search) {
  //     filter.$text = { $search: search };
  //   }

  //   if (page > 0 && limit > 0) {
  //     skip = (page - 1) * limit;
  //   }

  //   console.log(page, limit);
  //   if (sort) {
  //     if (sort == "ascByPrice") sortBy = { product_price: 1 };
  //     if (sort == "descByPrice") sortBy = { product_price: -1 };
  //     if (sort == "ascByRating") sortBy = { product_rating: 1 };
  //     if (sort == "descByRating") sortBy = { product_rating: -1 };
  //     if (sort == "ascByName") sortBy = { product_name: 1 };
  //     if (sort == "descByName") sortBy = { product_name: -1 };
  //   }
  //   const products = await Product.find(filter)
  //     .sort(sortBy)
  //     .skip(skip)
  //     .limit(limit)
  //     .lean();
  //   return products;
  // }
  private static buildFilterAndSortQuery({
    category_ids,
    minPrice,
    maxPrice,
    minRating,
    search,
    sort,
    includeUncategorized = false,
  }: {
    category_ids?: string;
    minPrice?: number;
    maxPrice?: number;
    minRating?: string;
    search?: string;
    sort?: string;
    includeUncategorized?: boolean;
  }): { filter: Filter; sortBy: SortBy } {
    let filter: Filter = {};
    let sortBy: SortBy = {};

    if (category_ids) {
      const categoriesArray = category_ids.split(",");
      filter.product_categories = includeUncategorized
        ? { $in: categoriesArray }
        : { $in: categoriesArray, $not: { $size: 0 } };
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

    if (sort) {
      switch (sort) {
        case "ascByPrice":
          sortBy = { product_price: 1 };
          break;
        case "descByPrice":
          sortBy = { product_price: -1 };
          break;
        case "ascByRating":
          sortBy = { product_rating: 1 };
          break;
        case "descByRating":
          sortBy = { product_rating: -1 };
          break;
        case "ascByName":
          sortBy = { product_name: 1 };
          break;
        case "descByName":
          sortBy = { product_name: -1 };
          break;
        default:
          break;
      }
    }

    return { filter, sortBy };
  }

  static async getProductByQuery(query: any) {
    const { category_ids, page = 1, limit = 10, sort = "ascByName", minPrice, maxPrice, minRating, search } = query;

    const skip = (page - 1) * limit;
    const { filter, sortBy } = this.buildFilterAndSortQuery({
      category_ids,
      minPrice,
      maxPrice,
      minRating,
      search,
      sort,
    });

    const products = await Product.find(filter).sort(sortBy).skip(skip).limit(limit).lean();
    return products;
  }

  static async getProductByQueryAdmin(query: any) {
    const { category_ids, page = 1, limit = 10, sort = "ascByName", minPrice, maxPrice, minRating, search } = query;

    const skip = (page - 1) * limit;
    const { filter, sortBy } = this.buildFilterAndSortQuery({
      category_ids,
      minPrice,
      maxPrice,
      minRating,
      search,
      sort,
      includeUncategorized: true,
    });

    const products = await Product.find(filter).sort(sortBy).skip(skip).limit(limit).lean();
    return products;
  }


  static async getProductById({ id }: { id: string }) {
    const foundProduct = await Product.findOne({ _id: id, isActive: true });
    if (!foundProduct)
      throw new ResourceNotFoundError("this product not found");
    return foundProduct;
  }

  static async updateProduct(id: string, data: any): Promise<any> {
    const updateObject = deleteNullObject(data);
    const foundProduct = await Product.findOne({ _id: id, isActive: true });
    if (!foundProduct)
      throw new ResourceNotFoundError("this product not found");

    const updateProduct = await Product.findOneAndUpdate(
      { _id: id },
      updateObject,
      { new: true }
    );

    return updateProduct;
  }
  static async deleteProduct({ id }: { id: string }) {
    const foundProduct = await Product.findOne({ _id: id });
    if (!foundProduct)
      throw new ResourceNotFoundError("this product not found");
    return await Product.deleteOne({ _id: id });
  }
  static async updateVariation(
    product_id: any,
    variant_id: any,
    data: any
  ): Promise<any> {
    const updateObject = deleteNullObject(data);
    console.log(product_id, variant_id, updateObject);

    const foundProduct = await Product.findOne({ _id: product_id });
    if (!foundProduct)
      throw new ResourceNotFoundError("this product not found");

    const updateProduct = await Product.findOneAndUpdate(
      { _id: product_id, "product_variations.product_variant_id": variant_id },
      { $set: { "product_variations.$": updateObject } },
      { new: true }
    );

    return updateProduct;
  }
  static async unActiveProduct({ id }: { id: string }) {
    const foundProduct = await Product.findOne({ _id: id, isActive: true });
    if (!foundProduct) throw new ResourceNotFoundError("this product not found");
    return await Product.updateOne({ _id: id }, { $set: { isActive: false } });
  }
  // static async unActiveProduct({ id }: { id: string }) {
  //   const foundProduct = await Product.findOne({ _id: id });
  //   if (!foundProduct) throw new ResourceNotFoundError("this product not found");
  //   return await Product.updateOne({ _id: id }, { $set: { isActive: false } });

  // }
  static async activeProduct({ id }: { id: string }) {
    const foundProduct = await Product.findOne({ _id: id, isActive: true });
    if (!foundProduct) throw new ResourceNotFoundError("this product not found");
    return await Product.updateOne({ _id: id }, { $set: { isActive: true } });

  }
  static async setDiscountByCategoryId({ category_id, discount }: { category_id: string, discount: number }) {
    const foundCategory = await Category.findOne({ _id: category_id });
    if (!foundCategory) throw new ResourceNotFoundError("This category not found");

    return await Product.updateMany(
      {
        product_categories: { $in: [category_id] },
        isActive: true
      },
      { $set: { product_discount: discount } }
    );
  }
  static async setDiscountToAll({ discount }: { discount: number }) {
    return await Product.updateMany(
      { isActive: true },
      { $set: { product_discount: discount } }
    );
  }
  static async setDiscountByProductId({ product_id, discount }: { product_id: string, discount: number }) {
    const foundProduct = await Product.findOne({ _id: product_id });
    if (!foundProduct) throw new ResourceNotFoundError("This Product not found");

    return await Product.updateOne(
      {
        _id: product_id,
        isActive: true
      },
      { $set: { product_discount: discount } }
    );
  }

  static async updateSoldNumber({ product_id, quantity }: { product_id: string, quantity: number }) {
    const foundProduct = await Product.findOne({ _id: product_id });
    if (!foundProduct) throw new ResourceNotFoundError("This Product not found");

    return await Product.updateOne(
      {
        _id: product_id
      },
      { $inc: { product_sold: quantity } }
    );
  }


}
export default ProductService;
