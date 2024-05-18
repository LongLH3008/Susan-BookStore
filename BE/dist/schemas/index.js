"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blog_schema_1 = __importDefault(require("./blog.schema"));
const category_schema_1 = __importDefault(require("./category.schema"));
const comment_schema_1 = __importDefault(require("./comment.schema"));
const discount_schema_1 = __importDefault(require("./discount.schema"));
const product_schema_1 = __importDefault(require("./product.schema"));
const user_schema_1 = __importDefault(require("./user.schema"));
const validate = (schema, objectValidate) => {
    return schema.validate(objectValidate, { abortEarly: false });
};
exports.default = {
    blogSchema: blog_schema_1.default, categorySchema: category_schema_1.default, commentSchema: comment_schema_1.default, discountSchema: discount_schema_1.default, productSchema: product_schema_1.default, userSchema: user_schema_1.default, validate
};
