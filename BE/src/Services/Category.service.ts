
import { ConflictError, ResourceNotFoundError } from "../cores/error.response";
import Book from "../models/Book.model";
import Category from "../models/Category.model";
import { validate } from "../schemas";
import categorySchema from "../schemas/category.schema";
import { ICategoryCreateDTO, ICategoryResponseDTO, ICategoryUpdateDTO } from "./dtos/Category.dto";

export class CategoryService {
    static async create(data: ICategoryCreateDTO): Promise<ICategoryResponseDTO> {
        validate(categorySchema, data);
        const foundCategory = await Category.findOne({ category_name: data.category_name });
        if (foundCategory) throw new ConflictError("This category already exists");

        const newCategory = await Category.create(data);
        return newCategory.toObject() as ICategoryResponseDTO;
    }

    static async getOne({ id }: { id: string }): Promise<ICategoryResponseDTO> {
        const foundCategory = await Category.findOne({ _id: id });
        if (!foundCategory) throw new ResourceNotFoundError("This category not found");
        return foundCategory.toObject() as ICategoryResponseDTO;
    }

    static async getAll({ page, limit }: { page: number; limit: number }): Promise<ICategoryResponseDTO[]> {
        const skip = (page - 1) * limit;
        const categories = await Category.find({}).skip(skip).limit(limit).lean();
        return categories.map(category => ({
            id: category._id,
            category_name: category.category_name,
            category_thumb: category.category_thumb,
            createdAt: new Date(category.createAt),
            updatedAt: new Date(category.updateAt),
            is_active: category.is_active,
        }));
    }

    static async update(data: ICategoryUpdateDTO): Promise<ICategoryResponseDTO> {
        const foundCategory = await Category.findOne({ _id: data.id });
        if (!foundCategory) throw new ResourceNotFoundError("This category not found");

        if (data.category_name) foundCategory.category_name = data.category_name;
        if (data.category_thumb) foundCategory.category_thumb = data.category_thumb;

        await foundCategory.save();
        return foundCategory.toObject() as ICategoryResponseDTO;
    }

    static async delete({ id }: { id: string }): Promise<{ message: string }> {
        const foundCategory = await Category.findOne({ _id: id });
        if (!foundCategory) throw new ResourceNotFoundError("This category not found");
        await Category.deleteOne({ _id: id });
        return { message: "Category deleted successfully" };
    }

    static async active({ id }: { id: string }): Promise<ICategoryResponseDTO> {
        const foundCategory = await Category.findOne({ _id: id });
        if (!foundCategory) throw new ResourceNotFoundError("This category not found");
        foundCategory.is_active = true;
        await foundCategory.save();
        return foundCategory.toObject() as ICategoryResponseDTO;
    }

    static async inActive({ id }: { id: string }): Promise<ICategoryResponseDTO> {
        const foundCategory = await Category.findOne({ _id: id });
        if (!foundCategory) throw new ResourceNotFoundError("This category not found");

        const allBooksByCategory = await Book.find({
            categories: { $in: [id] }
        });

        const updatePromises = allBooksByCategory.map((book) =>
            Book.updateOne({ _id: book._id }, { $pull: { categories: id } })
        );

        await Promise.all(updatePromises);
        foundCategory.is_active = false;
        await foundCategory.save();
        return foundCategory.toObject() as ICategoryResponseDTO;
    }
}
