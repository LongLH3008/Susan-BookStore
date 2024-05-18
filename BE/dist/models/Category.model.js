"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const COLLECTION_NAME = "Category";
const DOCUMENT_NAME = "Categories";
const CategorySchema = new mongoose_1.default.Schema({
    category_name: {
        type: String,
        required: true,
    },
    category_thumb: {
        type: String,
        required: true,
    },
    is_active: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
});
const Category = mongoose_1.default.model(DOCUMENT_NAME, CategorySchema);
exports.default = Category;
