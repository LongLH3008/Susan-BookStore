import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Application, Express } from "express";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Clean Architecture API",
            version: "1.0.0",
        },
        definitions: {
            User: {
                type: "object",
                properties: {
                    id: { type: "string", description: "User ID" },
                    user_name: { type: "string", description: "User's name" },
                    user_email: { type: "string", description: "User's email address" },
                    user_phone_number: { type: "string", description: "User's phone number" },
                    user_password: { type: "string", description: "User's password (hashed)" },
                    user_status: { type: "string", description: "User's status", enum: ["active", "block", "pending"] },
                    user_address: { type: "string", description: "User's address" },
                    user_reward_points: { type: "number", description: "User's reward points" },
                    user_role: { type: "string", description: "User's role", enum: ["admin", "user", "root"] },
                    user_avatar: { type: "string", description: "User's avatar URL" },
                    user_gender: { type: "string", description: "User's gender" },
                    user_wishlist: { type: "array", items: { type: "string" }, description: "User's wishlist (array of product IDs)" },
                    user_auth_type: { type: "string", description: "User's authentication type", enum: ["local", "google"] },
                    createAt: { type: "string", format: "date-time", description: "User creation date" },
                    updateAt: { type: "string", format: "date-time", description: "User update date" }
                }
            },
            Error: {
                type: 'object',
                properties: {
                    status: { type: "string", description: "Error status code" },
                    code: { type: "integer", description: "Error code" },
                    message: { type: "string", description: "Error message" },
                    stack: { type: "string", description: "Error stack trace (optional)" }
                }
            },
            Category: {
                type: "object",
                properties: {
                    id: { type: "string", description: "Category ID" },
                    category_name: { type: "string", description: "Category name" },
                    category_thumb: { type: "string", description: "Category thumbnail URL (optional)" },
                    is_active: { type: "boolean", description: "Indicates if the category is active" },
                    createAt: { type: "string", format: "date-time", description: "Category creation date" },
                    updateAt: { type: "string", format: "date-time", description: "Category update date" }
                }
            },
            Book: {
                type: "object",
                properties: {
                    id: { type: "string", description: "Book ID" },
                    title: { type: "string", description: "Book title" },
                    author: { type: "string", description: "Book author" },
                    isbn: { type: "string", description: "Book ISBN" },
                    description: { type: "string", description: "Book description" },
                    price: { type: "number", description: "Book price" },
                    discount: { type: "number", description: "Book discount percentage" },
                    sold: { type: "number", description: "Number of books sold" },
                    coverImage: { type: "string", description: "URL of the book cover image" },
                    publisher: { type: "string", description: "Book publisher" },
                    publicationDate: { type: "string", format: "date", description: "Book publication date" },
                    language: { type: "string", description: "Book language" },
                    numberOfPages: { type: "number", description: "Number of pages in the book" },
                    format: { type: "string", enum: ["Hardcover", "Paperback"], description: "Book format" },
                    categories: { type: "array", items: { type: "string" }, description: "List of category IDs the book belongs to" },
                    tags: { type: "array", items: { type: "string" }, description: "List of tags associated with the book" },
                    rating: { type: "number", description: "Average rating of the book" },
                    slug: { type: "string", description: "Book slug for URL" },
                    ebookDemoLink: { type: "string", description: "Link to ebook demo (optional)" },
                    reviews: { type: "array", items: { $ref: '#/definitions/Review' }, description: "List of reviews for the book" },
                    stock: { type: "number", description: "Number of books in stock" },
                    totalReviews: { type: "number", description: "Total number of reviews" },
                    images: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                id: { type: "string", description: "Image ID" },
                                url: { type: "string", description: "Image URL" },
                            },
                        },
                        description: "Array of additional book images",
                    },
                    dimensions: {
                        type: "object",
                        properties: {
                            height: { type: "number", description: "Book height" },
                            width: { type: "number", description: "Book width" },
                            thickness: { type: "number", description: "Book thickness" },
                            unit: { type: "string", description: "Unit of measurement for dimensions" },
                        },
                        description: "Book dimensions (optional)"
                    },
                    weight: {
                        type: "object",
                        properties: {
                            value: { type: "number", description: "Book weight value" },
                            unit: { type: "string", description: "Unit of measurement for weight" },
                        },
                        description: "Book weight (optional)"
                    },
                    edition: { type: "string", description: "Book edition (optional)" },
                    series: { type: "string", description: "Book series (optional)" },
                    ageRange: { type: "string", description: "Age range for the book (optional)" },
                    isActive: { type: "boolean", description: "Indicates if the book is active" },
                    createdAt: { type: "string", format: "date-time", description: "Book creation date" },
                    updatedAt: { type: "string", format: "date-time", description: "Book update date" }
                }
            },
            Cart: {
                type: 'object',
                properties: {
                    cart_user_id: { type: 'string', description: 'User ID associated with the cart' },
                    cart_state: {
                        type: 'string',
                        description: 'Current state of the cart',
                        enum: ['active', 'pending', 'completed', 'failed']
                    },
                    cart_count_products: { type: 'number', description: 'Number of products in the cart' },
                    cart_total_price: { type: 'number', description: 'Total price of the cart' },
                    cart_products: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                product_id: { type: 'string', description: 'Product ID' },
                                product_quantity: { type: 'number', description: 'Quantity of the product in the cart' },
                                selected: { type: 'boolean', description: 'Indicates if the product is selected for checkout' }
                            }
                        },
                        description: 'List of products in the cart'
                    },
                    createAt: { type: 'string', format: 'date-time', description: 'Cart creation date' },
                    updateAt: { type: 'string', format: 'date-time', description: 'Cart update date' }
                }
            },
            Discount: {
                type: "object",
                properties: {
                    discount_code: { type: "string", description: "Discount code" },
                    discount_name: { type: "string", description: "Discount name" },
                    discount_type: {
                        type: "string",
                        description: "Type of discount (percentage or fixed amount)",
                        enum: [
                            "percentage",
                            "fixed_amount"
                        ]
                    },
                    discount_description: { type: "string", description: "Discount description" },
                    discount_value: { type: "number", format: "float", description: "Discount value" },
                    discount_applies_to: {
                        type: "string",
                        description: "What the discount applies to (all, specific products, category)",
                        enum: [
                            "all",
                            "specific",
                            "category"
                        ]
                    },
                    discount_product_ids: {
                        type: "array",
                        items: { type: "string", format: "uuid" },
                        description: "List of product IDs if the discount applies to specific products (optional)"
                    },
                    discount_category_ids: {
                        type: "array",
                        items: { type: "string", format: "uuid" },
                        description: "List of category IDs if the discount applies to a specific category (optional)"
                    },
                    discount_stock: { type: "number", format: "integer", description: "Number of times the discount code can be used (optional)" },
                    discount_min_order_value: { type: "number", format: "float", description: "Minimum order value to use the discount (optional)" },
                    discount_max_use_per_user: { type: "number", format: "integer", description: "Maximum number of times the discount can be used per user (optional)" },
                    discount_users_used: {
                        type: "array",
                        items: { type: "string", format: "uuid" },
                        description: "List of user IDs who have used the discount (optional)"
                    },
                    discount_is_active: { type: "boolean", description: "Indicates if the discount is active" },
                    discount_start_date: { type: "string", format: "date-time", description: "Discount start date" },
                    discount_end_date: { type: "string", format: "date-time", description: "Discount end date" }
                }
            },
            Blog: {
                type: "object",
                properties: {
                    blog_title: { type: "string", description: "Title of the blog post" },
                    blog_content: { type: "string", description: "Content of the blog post" },
                    blog_author: { type: "string", description: "Author ID of the blog post" },
                    blog_tags: { type: "array", items: { type: "string" }, description: "Tags associated with the blog post" },
                    blog_slug: { type: "string", description: "Slug for the blog post" },
                    blog_image: { type: "string", description: "URL of the blog post's image" },
                    blog_views: { type: "number", description: "Number of times the blog post has been viewed" },
                    blog_comments: {
                        type: "array",
                        items: {
                            $ref: '#/definitions/Comment' // Reference the Comment schema
                        },
                        description: "Comments associated with the blog post"
                    },
                    viewedBy: { type: "array", items: { type: "string" }, description: "Array of User IDs who have viewed the blog post" },
                    createdAt: { type: "string", format: "date-time", description: "Date and time the blog post was created" },
                    updatedAt: { type: "string", format: "date-time", description: "Date and time the blog post was last updated" }
                }
            },
            Comment: {
                type: "object",
                properties: {
                    comment_author: { type: "string", description: "User ID of the comment author" },
                    comment_content: { type: "string", description: "Content of the comment" },
                    comment_likes: { type: "number", description: "Number of likes for the comment" },
                    likedBy: { type: "array", items: { type: "string" }, description: "Array of User IDs who liked the comment" },
                    comment_createdAt: { type: "string", format: "date-time", description: "Date and time the comment was created" },
                    comment_updatedAt: { type: "string", format: "date-time", description: "Date and time the comment was last updated" }
                }
            },
            RefreshToken: {
                type: 'object',
                properties: {
                    refreshToken: { type: 'string', description: 'Refresh token for user authentication' },
                    userId: { type: 'string', description: 'User ID associated with the refresh token' },
                    createdAt: { type: 'string', format: 'date-time', description: 'Timestamp when the refresh token was created' },
                    expiredAt: { type: 'string', format: 'date-time', description: 'Timestamp when the refresh token expires' },
                },
            },
            Review: {
                type: "object",
                properties: {
                    userId: { type: "string", description: "ID of the user who wrote the review" },
                    rating: { type: "number", format: "float", description: "Rating given by the user (1-5)" },
                    comment: { type: "string", description: "The user's comment on the book" },
                    createdAt: { type: "string", format: "date-time", description: "Date and time when the review was created" },
                }
            },

        }
    },
    apis: ["./src/routers/Docs.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

function setupSwagger(app: Application) {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

export { setupSwagger };