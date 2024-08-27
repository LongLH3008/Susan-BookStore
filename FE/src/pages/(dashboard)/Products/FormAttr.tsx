import { Typography, Box } from "@mui/material";
import React from "react";
import ProductForm from "./productForm";

const FormAttr = () => {
  return (
    <div>
      <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
        <p className="text-2xl font-bold text-gray-800 dark:text-gray-50">
          Products add
        </p>
      </div>
      <ProductForm />
    </div>
  );
};

export default FormAttr;
