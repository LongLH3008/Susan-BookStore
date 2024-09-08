import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Checkbox,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Chip,
  FormGroup,
  Typography,
  Grid,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios"; // Sử dụng axios để gửi request upload
import {
  addProduct,
  editProduct,
  fetchCategory,
  fetchProductById,
} from "@/services/product";
import { AxiosError } from "axios";
import { Book, Image } from "@/schemas/product";
import { Console } from "console";
import { useToast } from "@/common/hooks/useToast";
import { useNavigate, useParams } from "react-router-dom";

const ProductForm: React.FC = () => {
  const { toast } = useToast();
  const nav = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { control, register, handleSubmit, setValue, watch, reset } =
    useForm<Book>();

  // const { fields, append } = useFieldArray({
  //   control,
  //   name: "product_variations",
  // });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategory,
  });

  const selectedCategories = watch("categories");

  const handleCategoryChange = (categoryId: string) => {
    const updatedCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];

    setValue("categories", updatedCategories);
  };

  const { mutateAsync, isError, error } = id
    ? useMutation({
        mutationFn: ({ data, id }: { data: Book; id: string }) =>
          editProduct(data, id),
        onSuccess: (data: any) => {
          toast(data.status, `Thêm thành công`);
          nav("/products");
        },
        onError: (err: any) => {
          toast(err.status, err.message);
        },
      })
    : useMutation({
        mutationFn: addProduct,
        onSuccess: (data: any) => {
          toast(data.status, `Thêm thành công`);
          nav("/products");
        },
        onError: (err: any) => {
          toast(err.status, err.message);
        },
      });

  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [selectedCoverImage, setSelectedCoverImage] = useState<File | null>(
    null
  );
  const [selectedImages, setSelectedImages] = useState<FileList | null>(null);
  const [previewCoverImage, setPreviewCoverImage] = useState<string | null>(
    null
  );
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const onSubmit = async (data: Book) => {
    try {
      let coverImageUrl = "";
      let imageUrls: Image[] = [];

      // Upload ảnh đại diện nếu có
      if (selectedCoverImage) {
        const coverImageFormData = new FormData();
        coverImageFormData.append("files", selectedCoverImage);

        const coverImageResponse = await axios.post(
          "http://localhost:5000/api/v1/upload",
          coverImageFormData
        );
        coverImageUrl = coverImageResponse.data.metadata.fileLinks[0]; // Giả sử URL của ảnh đại diện là phần tử đầu tiên trong mảng
        data.coverImage = coverImageUrl; // Cập nhật URL ảnh đại diện vào form data
      }

      // Upload mảng hình ảnh nếu có
      console.log(selectedImages);
      if (selectedImages) {
        const imagesFormData = new FormData();
        Array.from(selectedImages).forEach((file) => {
          imagesFormData.append("files", file);
        });
        console.log("imagesFormData", imagesFormData);
        const imagesResponse = await axios.post(
          "http://localhost:5000/api/v1/upload",
          imagesFormData
        );

        imageUrls = imagesResponse.data.metadata.fileLinks.map(
          (img: string, index: number) => ({
            id: `img${index + 1}`,
            url: img,
          })
        );

        data.images = imageUrls;
      }
      // Gửi dữ liệu sản phẩm cùng với URL ảnh lên
      if (id) {
        delete data._id;
        delete data.sold;
        delete data.rating;
        delete data.totalReviews;
        delete data.reviews;
        delete data.createdAt;
        delete data.updatedAt;
        delete data.slug;
        delete data.__v;
      }
      id ? await mutateAsync({ data, id }) : await mutateAsync(data);
    } catch (error) {
      console.error("Lỗi khi gửi form:", error);
    }
  };
  const { data: book } = useQuery({
    queryKey: ["book", id],
    queryFn: () => fetchProductById(id!),
    enabled: !!id, // Chỉ thực hiện khi có ID
  });
  console.log("book", book);

  useEffect(() => {
    reset(book?.metadata);
  }, [book]);
  // Lưu trữ các file khi người dùng chọn ảnh và tạo URL xem trước ảnh
  const handleProductImagesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    console.log("files", files);
    if (files) {
      setSelectedImages(files); // Lưu file vào state để upload sau

      // Tạo URL xem trước cho từng ảnh đã chọn
      const imagePreviews: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            imagePreviews.push(reader.result as string);
            setPreviewImages([...imagePreviews]); // Cập nhật URL xem trước
          }
        };
        reader.readAsDataURL(file); // Đọc file dưới dạng URL
      });
    }
  };
  const handleCoverImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedCoverImage(file);

      // Tạo URL xem trước cho ảnh đại diện
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setPreviewCoverImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file); // Đọc file dưới dạng URL
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
        label="Title"
        {...register("title")}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Author"
        {...register("author")}
        fullWidth
        margin="normal"
      />
      <TextField label="ISBN" {...register("isbn")} fullWidth margin="normal" />
      <TextField
        label="Mô tả sản phẩm"
        {...register("description")}
        fullWidth
        multiline
        rows={4}
        margin="normal"
      />
      <TextField
        label="Price"
        type="number"
        {...register("price")}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Discount"
        type="number"
        {...register("discount")}
        fullWidth
        margin="normal"
      />
      {/* <TextField
        label="Sold"
        type="number"
        {...register("sold")}
        fullWidth
        margin="normal"
      /> */}
      {/* Checkbox cho danh mục */}
      <Controller
        name="tags"
        control={control}
        render={({ field }) => (
          <TextField
            label="Tags"
            fullWidth
            margin="normal"
            value={field?.value?.join(", ")} // Hiển thị các thẻ dưới dạng chuỗi
            onChange={(e) => {
              const tagsArray = e.target.value
                .split(",")
                .map((tag) => tag.trim());
              field.onChange(tagsArray);
            }}
            helperText="Enter tags separated by commas"
          />
        )}
      />

      <Typography variant="h6" sx={{ marginTop: 2, marginBottom: 1 }}>
        Chọn danh mục
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {categories?.metadata?.map((category: any) => (
          <FormControlLabel
            key={category?.id}
            control={
              <Checkbox
                checked={selectedCategories?.includes(category?.id)}
                onChange={() => handleCategoryChange(category?.id)}
              />
            }
            label={category?.category_name}
            sx={{ width: "auto" }}
          />
        ))}
      </Box>

      <TextField
        label="Nhà sản xuất"
        {...register("publisher")}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Ngày sản xuất"
        {...register("publicationDate")}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Ngôn ngữ"
        {...register("language")}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Số Trang"
        {...register("numberOfPages")}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Định dạng sách"
        {...register("format")}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Link ebook"
        {...register("ebookDemoLink")}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Sản phẩm tồn kho"
        {...register("stock")}
        fullWidth
        margin="normal"
      />
      {/* <TextField
        label="Hình ảnh"
        {...register("images")}
        fullWidth
        margin="normal"
      /> */}

      <h3>Ảnh đại diện</h3>
      <input type="file" accept="image/*" onChange={handleCoverImageChange} />
      {previewCoverImage && (
        <img src={previewCoverImage} alt="Cover Preview" width="200" />
      )}

      <h3>Mảng hình ảnh</h3>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleProductImagesChange}
      />
      {previewImages.map((src, idx) => (
        <img key={idx} src={src} alt={`Preview ${idx}`} width="200" />
      ))}

      {/* <h3>Biến thể sản phẩm</h3>
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
      </Button> */}

      {/* <FormControlLabel
        control={<Checkbox {...register("isActive")} />}
        label="Kích hoạt sản phẩm"
      /> */}

      <Box mt={2}>
        <Button variant="contained" color="primary" type="submit">
          Lưu sản phẩm
        </Button>
      </Box>
    </Box>
  );
};

export default ProductForm;
