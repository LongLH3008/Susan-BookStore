import joi from "joi"

const productSchema = joi.object({
    product_name: joi.string().required().messages({
        "string.empty": "Tên sản phẩm là bắt buộc",
        "any.required": "Trường 'Tên sản phẩm' là bắt buộc",
    }),
    product_thumb: joi.string().required().messages({
        "string.empty": "Ảnh đại diện sản phẩm là bắt buộc",
        "any.required": "Trường 'Ảnh đại diện sản phẩm' là bắt buộc",
    }),
    product_description: joi.string().required().messages({
        "string.empty": "Mô tả sản phẩm là bắt buộc",
        "any.required": "Trường 'Mô tả sản phẩm' là bắt buộc",
    }),
    product_variations: joi.array().required().messages({
        "any.required": "Phân loại sản phẩm là bắt buộc",
    }),

    product_categories: joi.array().required().messages({
        "string.empty": "Loại sản phẩm là bắt buộc",
        "any.required": "Trường 'Loại sản phẩm' là bắt buộc",
    }),
    product_price: joi.number().required().messages({
        "string.empty": "Giá sản phẩm là bắt buộc",
        "any.required": "Trường 'Giá sản phẩm' là bắt buộc",
    }),
    product_discount: joi.number().required().messages({
        "string.empty": "Giá sản phẩm là bắt buộc",
        "any.required": "Trường 'Giá sản phẩm' là bắt buộc",
    }),
    product_images: joi.array().items(
        joi.object({
            image_id: joi.string().allow(null, ""),
            image_url: joi.string().required().messages({
                "string.empty": "URL ảnh sản phẩm là bắt buộc",
                "any.required": "Trường 'URL ảnh sản phẩm' là bắt buộc",
            }),
        })
    ),
    product_attributes: joi.object(),
});

export default productSchema;
