import joi from "joi"

const productSchema = joi.object({
    product_name: joi.string().required().messages({
        "string.empty": "Tên sản phẩm không được để trống",
        "any.required": 'Trường "Tên sản phẩm" là bắt buộc',
    }),
    product_thumb: joi.string().required().messages({
        "string.empty": "Ảnh đại diện không được để trống",
        "any.required": 'Trường "Ảnh đại diện" là bắt buộc',
    }),
    product_description: joi.string().required().messages({
        "string.empty": "Mô tả sản phẩm không được để trống",
        "any.required": 'Trường "Mô tả sản phẩm" là bắt buộc',
    }),
    product_price: joi.number().required().messages({
        "number.base": "Giá phải là một số",
        "any.required": "Trường giá là bắt buộc",
    }),
    product_quantity: joi.number().required().messages({
        "number.base": "Số lượng phải là một số",
        "any.required": "Trường số lượng là bắt buộc",
    }),
    product_type: joi.string().required().messages({
        "string.empty": "Loại sản phẩm không được để trống",
        "any.required": 'Trường "Loại sản phẩm" là bắt buộc',
    }),
    product_attributes: joi.object().required().messages({

        "any.required": "Trường thuộc tính sản phẩm là bắt buộc",
    }),
    product_image: joi.array().items(
        joi.object({
            image_id: joi.string(),
            image_url: joi.string().required().messages({
                "string.empty": "URL ảnh chi tiết không được để trống",
                "any.required": "Trường URL ảnh chi tiết là bắt buộc",
            }),
        })
    ),
});

export default productSchema