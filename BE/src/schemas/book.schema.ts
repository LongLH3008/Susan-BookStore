import joi from "joi"

const bookCreateSchema = joi.object({
    title: joi.string().required().messages({
        "string.empty": "Tiêu đề sách là bắt buộc",
        "any.required": "Trường 'Tiêu đề sách' là bắt buộc",
    }),
    author: joi.string().required().messages({
        "string.empty": "Tên tác giả là bắt buộc",
        "any.required": "Trường 'Tên tác giả' là bắt buộc",
    }),
    isbn: joi.string().required().messages({
        "string.empty": "Mã ISBN là bắt buộc",
        "any.required": "Trường 'Mã ISBN' là bắt buộc",
    }),
    description: joi.string().required().messages({
        "string.empty": "Mô tả sách là bắt buộc",
        "any.required": "Trường 'Mô tả sách' là bắt buộc",
    }),
    price: joi.number().required().messages({
        "number.base": "Giá sách phải là số",
        "any.required": "Trường 'Giá sách' là bắt buộc",
    }),
    discount: joi.number().required().messages({
        "number.base": "Giảm giá phải là số",
        "any.required": "Trường 'Giảm giá' là bắt buộc",
    }),
    coverImage: joi.string().required().messages({
        "string.empty": "Ảnh bìa sách là bắt buộc",
        "any.required": "Trường 'Ảnh bìa sách' là bắt buộc",
    }),
    publisher: joi.string().required().messages({
        "string.empty": "Nhà xuất bản là bắt buộc",
        "any.required": "Trường 'Nhà xuất bản' là bắt buộc",
    }),
    ebookDemoLink: joi.string().required().messages({
        "string.empty": "Link ebook demo là bắt buộc",
        "any.required": "Trường 'Link ebook demo' là bắt buộc",
    }),
    publicationDate: joi.date().required().messages({
        "date.base": "Ngày xuất bản không hợp lệ",
        "any.required": "Trường 'Ngày xuất bản' là bắt buộc",
    }),
    language: joi.string().required().messages({
        "string.empty": "Ngôn ngữ sách là bắt buộc",
        "any.required": "Trường 'Ngôn ngữ sách' là bắt buộc",
    }),
    numberOfPages: joi.number().required().messages({
        "number.base": "Số trang phải là số",
        "any.required": "Trường 'Số trang' là bắt buộc",
    }),
    format: joi.string().valid("Paperback", "Hardcover").required().messages({
        "any.only": "Định dạng sách phải là 'Hardcover' hoặc 'Paperback'",
        "any.required": "Trường 'Định dạng sách' là bắt buộc",
    }),
    categories: joi.array().items(joi.string()).required().messages({
        "array.base": "Danh mục phải là một mảng",
        "any.required": "Trường 'Danh mục' là bắt buộc",
    }),
    tags: joi.array().items(joi.string()).required().messages({
        "array.base": "Thẻ phải là một mảng",
        "any.required": "Trường 'Thẻ' là bắt buộc",
    }),
    stock: joi.number().required().messages({
        "number.base": "Số lượng tồn kho phải là số",
        "any.required": "Trường 'Số lượng tồn kho' là bắt buộc",
    }),
    images: joi.array().items(joi.object({
        id: joi.string().required(),
        url: joi.string().required()
    })).required().messages({
        "array.base": "Hình ảnh phải là một mảng",
        "any.required": "Trường 'Hình ảnh' là bắt buộc",
    }),
    dimensions: joi.object({
        height: joi.number().required(),
        width: joi.number().required(),
        thickness: joi.number().required(),
        unit: joi.string().required()
    }),
    weight: joi.object({
        value: joi.number().required(),
        unit: joi.string().required()
    }),
    edition: joi.string().allow(''),
    series: joi.string().allow(''),
    ageRange: joi.string().allow(''),
});

const bookUpdateSchema = bookCreateSchema.fork(
    Object.keys(bookCreateSchema.describe().keys),
    (schema) => schema.optional()
).append({
    isActive: joi.boolean()
});

const bookQuerySchema = joi.object({
    category_ids: joi.string().optional(),
    page: joi.number().integer().min(1).optional(),
    limit: joi.number().integer().min(1).optional(),
    sort: joi.string().valid("ascByPrice", "descByPrice", "ascByRating", "descByRating", "ascByTitle", "descByTitle").optional(),
    minPrice: joi.number().min(0).optional(),
    maxPrice: joi.number().min(0).optional(),
    minRating: joi.number().min(0).max(5).optional(),
    search: joi.optional()
});

export { bookCreateSchema, bookUpdateSchema, bookQuerySchema };
