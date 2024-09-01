import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Grid,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { addProduct } from "@/services/product";
import { AxiosError } from "axios";

interface ProductFormValues {
  product_name: string;
  product_description: string;
  product_price: number;
  product_thumb: string;
  product_categories: string[];
  product_variations: {
    product_variant_id: string;
    product_quantity: number;
    product_price: number;
    is_default: boolean;
    isActive: boolean;
  }[];
  product_images: {
    image_id: string;
    image_url: string;
  }[];
  product_attributes: Record<string, any>;
  isActive: boolean;
}

const ProductForm: React.FC = () => {
  const { control, register, handleSubmit, setValue, watch } =
    useForm<ProductFormValues>({
      defaultValues: {
        product_name: "",
        product_description: "",
        product_price: 0,
        product_thumb: "vsbgseg",
        product_categories: ["664ff507a063645cbd2f906f"],
        product_variations: [],
        product_images: [],
        product_attributes: {},
        isActive: true,
      },
    });

  const { fields, append } = useFieldArray({
    control,
    name: "product_variations",
  });

  const { mutateAsync, isError, error } = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      console.log("Sản phẩm đã được thêm thành công");
    },
    onError: (error: AxiosError) => {
      console.error(
        "Lỗi khi thêm sản phẩm:",
        error.response?.data || error.message
      );
    },
  });

  const onSubmit = async (data: ProductFormValues) => {
    try {
      await mutateAsync(data);
    } catch (error) {
      // Error handling is already done in onError of useMutation
    }
  };

  const handleProductImagesUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files) {
      const uploadedImages: { image_id: string; image_url: string }[] = [];

      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          uploadedImages.push({
            image_id: file.name, // Using file name as ID
            image_url: result,
          });
          setValue("product_images", uploadedImages);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      autoComplete="off"
      p={2}
    >
      <TextField
        label="Tên sản phẩm"
        {...register("product_name")}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Mô tả sản phẩm"
        {...register("product_description")}
        fullWidth
        multiline
        rows={4}
        margin="normal"
      />
      <TextField
        label="Giá sản phẩm"
        type="number"
        {...register("product_price")}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Danh mục sản phẩm"
        {...register("product_categories")}
        fullWidth
        margin="normal"
      />

      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleProductImagesUpload}
      />
      {watch("product_images").map((image, idx) => (
        <img
          key={idx}
          src={image.image_url}
          alt={`Product Image ${idx}`}
          width="200"
        />
      ))}

      <h3>Biến thể sản phẩm</h3>
      {fields.map((item, index) => (
        <Box key={item.id} mb={2}>
          <TextField
            label="Mã biến thể"
            {...register(`product_variations.${index}.product_variant_id`)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Số lượng"
            type="number"
            {...register(`product_variations.${index}.product_quantity`)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Giá biến thể"
            type="number"
            {...register(`product_variations.${index}.product_price`)}
            fullWidth
            margin="normal"
          />
          <FormControlLabel
            control={
              <Checkbox
                {...register(`product_variations.${index}.is_default`)}
              />
            }
            label="Là mặc định"
          />
          <FormControlLabel
            control={
              <Checkbox {...register(`product_variations.${index}.isActive`)} />
            }
            label="Kích hoạt"
          />
        </Box>
      ))}
      <Button
        variant="outlined"
        onClick={() =>
          append({
            product_variant_id: "",
            product_quantity: 0,
            product_price: 0,
            is_default: false,
            isActive: true,
          })
        }
      >
        Thêm biến thể
      </Button>

      {/* <h3>Thuộc tính sản phẩm</h3>
      <TextField
        label="Thuộc tính"
        {...register("product_attributes")}
        fullWidth
        margin="normal"
      /> */}

      <FormControlLabel
        control={<Checkbox {...register("isActive")} />}
        label="Kích hoạt sản phẩm"
      />

      <Box mt={2}>
        <Button variant="contained" color="primary" type="submit">
          Lưu sản phẩm
        </Button>
      </Box>
    </Box>
  );
};

export default ProductForm;
