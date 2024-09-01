import { ConflictError, ResourceNotFoundError, ValidationError } from "../cores/error.response";
import Category from "../models/Category.model";
import Book from "../models/Book.model";
import { bookCreateSchema, bookUpdateSchema, bookQuerySchema } from "../schemas/book.schema";
import { deleteNullObject } from "../utils";
import {
  BookCreateInputDTO,
  BookUpdateInputDTO,
  BookQueryInputDTO,
  BookOutputDTO,
  BookListOutputDTO
} from "./dtos/Book.dto";
import joi from "joi";
class BookService {
  static async create(bookData: BookCreateInputDTO): Promise<BookOutputDTO> {
    const { error } = bookCreateSchema.validate(bookData);
    if (error) throw new ValidationError(error.details[0].message);

    const foundBook = await Book.findOne({ title: bookData.title });
    if (foundBook) throw new ConflictError("This book already exists");

    await Promise.all(bookData.categories.map(async (category: string) => {
      const foundCategory = await Category.findById(category);
      if (!foundCategory) throw new ResourceNotFoundError(`Category: ${category} not found`);
    }));

    const newBook = await Book.create(bookData);
    return newBook.toObject() as BookOutputDTO;
  }

  static async getAllBooks({ page, limit }: { page: number; limit: number }): Promise<BookListOutputDTO> {
    const { error } = bookQuerySchema.validate({ page, limit });
    if (error) throw new ValidationError(error.details[0].message);

    const skip = (page - 1) * limit;
    const books = await Book.find({ isActive: true })
      .skip(skip)
      .limit(limit)
      .lean();
    const total = await Book.countDocuments({ isActive: true });
    return {
      books: books as BookOutputDTO[],
      total,
      page,
      limit
    };
  }

  static async getBookByQuery(query: BookQueryInputDTO): Promise<BookListOutputDTO> {
    const { error } = bookQuerySchema.validate(query);
    if (error) throw new ValidationError(error.details[0].message);

    const {
      category_ids,
      page = 1,
      limit = 10,
      sort = "ascByTitle",
      minPrice,
      maxPrice,
      minRating,
      search,
    } = query;

    let skip: number = (page - 1) * limit;
    let sortBy: { [key: string]: 1 | -1 } = {};
    let filter: any = { isActive: true };

    if (category_ids) {
      const categoriesArray = category_ids.split(",");
      filter.categories = { $in: categoriesArray };
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = minPrice;
      if (maxPrice) filter.price.$lte = maxPrice;
    }

    if (minRating) {
      filter.rating = { $gte: parseFloat(minRating.toString()) };
    }

    if (search) {
      filter.$text = { $search: search };
    }

    if (sort) {
      switch (sort) {
        case "ascByPrice":
          sortBy = { price: 1 };
          break;
        case "descByPrice":
          sortBy = { price: -1 };
          break;
        case "ascByRating":
          sortBy = { rating: 1 };
          break;
        case "descByRating":
          sortBy = { rating: -1 };
          break;
        case "ascByTitle":
          sortBy = { title: 1 };
          break;
        case "descByTitle":
          sortBy = { title: -1 };
          break;
        default:
          break;
      }
    }

    const books = await Book.find(filter)
      .sort(sortBy)
      .skip(skip)
      .limit(limit)
      .lean();
    const total = await Book.countDocuments(filter);
    return {
      books: books as BookOutputDTO[],
      total,
      page,
      limit
    };
  }

  static async getBookById(id: string): Promise<BookOutputDTO> {
    const foundBook = await Book.findOne({ _id: id, isActive: true });
    if (!foundBook) throw new ResourceNotFoundError("Book not found");
    return foundBook.toObject() as BookOutputDTO;
  }

  static async updateBook(id: string, data: BookUpdateInputDTO): Promise<BookOutputDTO> {
    const { error } = bookUpdateSchema.validate(data);
    if (error) throw new ValidationError(error.details[0].message);

    const updateObject = deleteNullObject(data);
    const foundBook = await Book.findOne({ _id: id, isActive: true });
    if (!foundBook) throw new ResourceNotFoundError("Book not found");

    const updatedBook = await Book.findOneAndUpdate(
      { _id: id },
      updateObject,
      { new: true }
    );

    if (!updatedBook) throw new ResourceNotFoundError("Book not found");
    return updatedBook.toObject() as BookOutputDTO;
  }

  static async deleteBook(id: string): Promise<{ message: string }> {
    const foundBook = await Book.findOne({ _id: id });
    if (!foundBook) throw new ResourceNotFoundError("Book not found");
    await Book.deleteOne({ _id: id });
    return { message: "Book deleted successfully" };
  }

  static async unActiveBook(id: string): Promise<{ message: string }> {
    const foundBook = await Book.findOne({ _id: id, isActive: true });
    if (!foundBook) throw new ResourceNotFoundError("Book not found or already inactive");
    await Book.updateOne({ _id: id }, { $set: { isActive: false } });
    return { message: "Book deactivated successfully" };
  }

  static async activeBook(id: string): Promise<{ message: string }> {
    const foundBook = await Book.findOne({ _id: id, isActive: false });
    if (!foundBook) throw new ResourceNotFoundError("Book not found or already active");
    await Book.updateOne({ _id: id }, { $set: { isActive: true } });
    return { message: "Book activated successfully" };
  }

  static async setDiscountByCategoryId(category_id: string, discount: number): Promise<{ message: string }> {
    const foundCategory = await Category.findOne({ _id: category_id });
    if (!foundCategory) throw new ResourceNotFoundError("Category not found");

    await Book.updateMany(
      { categories: category_id, isActive: true },
      { $set: { discount: discount } }
    );
    return { message: "Discount applied to all books in the category" };
  }

  static async setDiscountToAll(discount: number): Promise<{ message: string }> {
    await Book.updateMany(
      { isActive: true },
      { $set: { discount: discount } }
    );
    return { message: "Discount applied to all active books" };
  }

  static async setDiscountByBookId(book_id: string, discount: number): Promise<BookOutputDTO> {
    const { error } = joi.object({
      book_id: joi.string().required(),
      discount: joi.number().min(0).max(100).required()
    }).validate({ book_id, discount });
    if (error) throw new ValidationError(error.details[0].message);

    const foundBook = await Book.findOne({ _id: book_id, isActive: true });
    if (!foundBook) throw new ResourceNotFoundError("Book not found");

    const updatedBook = await Book.findOneAndUpdate(
      { _id: book_id },
      { $set: { discount: discount } },
      { new: true }
    );

    if (!updatedBook) throw new ResourceNotFoundError("Book not found");
    return updatedBook.toObject() as BookOutputDTO;
  }

  static async updateSoldNumber(book_id: string, quantity: number): Promise<BookOutputDTO> {
    const { error } = joi.object({
      book_id: joi.string().required(),
      quantity: joi.number().integer().required()
    }).validate({ book_id, quantity });
    if (error) throw new ValidationError(error.details[0].message);

    const foundBook = await Book.findOne({ _id: book_id });
    if (!foundBook) throw new ResourceNotFoundError("Book not found");

    const updatedBook = await Book.findOneAndUpdate(
      { _id: book_id },
      { $inc: { sold: quantity } },
      { new: true }
    );

    if (!updatedBook) throw new ResourceNotFoundError("Book not found");
    return updatedBook.toObject() as BookOutputDTO;
  }
}

export default BookService;