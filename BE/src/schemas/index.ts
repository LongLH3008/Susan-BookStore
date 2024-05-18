import blogSchema from "./blog.schema";
import categorySchema from "./category.schema";
import commentSchema from "./comment.schema";
import discountSchema from "./discount.schema";
import productSchema from "./product.schema";
import userSchema from "./user.schema";

const validate = (schema: any, objectValidate: any) => {

    return schema.validate(objectValidate, { abortEarly: false });
};

export default {
    blogSchema, categorySchema, commentSchema, discountSchema, productSchema, userSchema, validate
}