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
  FormLabel,
  Stack,
  Autocomplete,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios"; // Sử dụng axios để gửi request upload
import { addProduct, editProduct, getProducttById } from "@/services/product";
import { AxiosError } from "axios";
import { Book, Image } from "@/schemas/product";
import { Console } from "console";
import { useToast } from "@/common/hooks/useToast";
import { useNavigate, useParams } from "react-router-dom";
import PageLayout from "@/layouts/DashboardLayout";
import { getCategories, getCategoryById } from "@/services/categories";

const ProductForm: React.FC = () => {
  const { toast } = useToast();
  const nav = useNavigate();
  const { id } = useParams<{ id: string }>();
  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<Book>();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  const formats = [
    { id: "hardcover", label: "Hardcover" },
    { id: "paperback", label: "Paperback" },
  ];
  const options =
    categories?.metadata?.map((category: any) => ({
      id: category?.id,
      label: category?.category_name,
    })) || [];

  const handleCategoryChange = (event: any, newValue: any) => {
    setSelectedCategories(newValue.map((option: any) => option.id));
    setValue("categories", selectedCategories);
  };
  const { mutateAsync, isError, error } = id
    ? useMutation({
        mutationFn: ({ data, id }: { data: Book; id: string }) =>
          editProduct(data, id),
        onSuccess: (data: any) => {
          toast(data.status);
          nav("/san-pham");
        },
        onError: (err: any) => {
          toast(err.status);
        },
      })
    : useMutation({
        mutationFn: addProduct,
        onSuccess: (data: any) => {
          debugger;
          nav("/san-pham");
          toast(data.status);
        },
        onError: (err: any) => {
          toast(err.status);
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

      if (selectedCoverImage) {
        const coverImageFormData = new FormData();
        coverImageFormData.append("files", selectedCoverImage);

        const coverImageResponse = await axios.post(
          "http://localhost:5000/api/v1/upload",
          coverImageFormData
        );
        coverImageUrl = coverImageResponse.data.metadata.fileLinks[0];
        data.coverImage = coverImageUrl;
      }

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

      if (id) {
        delete data?._id;

        if (Array.isArray(data?.images)) {
          data.images = data.images.map((image) => {
            const { _id, ...rest } = image;
            return rest;
          });
        }
        delete data?.sold;
        delete data?.rating;
        delete data?.totalReviews;
        delete data?.reviews;
        delete data?.createdAt;
        delete data?.updatedAt;
        delete data?.slug;
        delete data?.__v;
      }
      id ? await mutateAsync({ data, id }) : await mutateAsync(data);
    } catch (error) {
      console.error("Lỗi khi gửi form:", error);
    }
  };
  const { data: book } = useQuery({
    queryKey: ["book", id],
    queryFn: () => getProducttById(id!),
    enabled: !!id,
  });

  const [isReset, setIsReset] = useState(false);

  useEffect(() => {
    if (book && !isReset) {
      reset({
        ...book.metadata,
        publicationDate: book.metadata.publicationDate
          ? book.metadata.publicationDate.split("T")[0]
          : "",
      });

      if (book.metadata.coverImage) {
        setPreviewCoverImage(book.metadata.coverImage);
      }
      if (book.metadata.images && book.metadata.images.length > 0) {
        setPreviewImages(book.metadata.images.map((img: any) => img.url));
      }
      setIsReset(true);
    }
  }, [book, isReset, reset]);
  const handleProductImagesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    console.log("files", files);
    if (files) {
      setSelectedImages(files);
      const imagePreviews: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            imagePreviews.push(reader.result as string);
            setPreviewImages([...imagePreviews]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };
  const handleCoverImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedCoverImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setPreviewCoverImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Box className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
        <p className="text-2xl font-bold text-gray-800 dark:text-gray-50">
          {id ? "Chỉnh sửa sản phẩm" : "Thêm mới sản phẩm"}
        </p>
      </Box>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        autoComplete="off"
        p={2}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          <FormControl fullWidth>
            <FormLabel>Tiêu đề</FormLabel>
            <TextField
              {...register("title", { required: "Tiêu đề là bắt buộc" })}
              error={!!errors?.title}
              helperText={errors?.title && errors.title.message}
              margin="dense"
            />
          </FormControl>
          <FormControl fullWidth>
            <FormLabel>Tác giả</FormLabel>
            <TextField
              {...register("author", { required: "Tác giả là bắt buộc" })}
              error={!!errors?.author}
              helperText={errors?.author && errors.author.message}
              margin="dense"
            />
          </FormControl>
          <FormControl fullWidth>
            <FormLabel>ISBN</FormLabel>
            <TextField
              {...register("isbn", { required: "ISBN là bắt buộc" })}
              error={!!errors?.isbn}
              helperText={errors?.isbn && errors.isbn.message}
              margin="dense"
            />
          </FormControl>
        </Box>

        <FormControl fullWidth margin="dense">
          <FormLabel>Mô tả</FormLabel>
          <TextField
            {...register("description", { required: "Mô tả là bắt buộc" })}
            error={!!errors?.description}
            helperText={errors?.description && errors.description.message}
            multiline
            rows={3}
            margin="dense"
          />
        </FormControl>

        <Box sx={{ display: "flex", gap: 2 }}>
          <FormControl fullWidth>
            <FormLabel>Giá</FormLabel>
            <TextField
              {...register("price", { required: "Giá là bắt buộc" })}
              type="number"
              error={!!errors?.price}
              helperText={errors?.price && errors.price.message}
              margin="dense"
            />
          </FormControl>
          <FormControl fullWidth>
            <FormLabel>Giảm giá</FormLabel>
            <TextField
              {...register("discount", {
                required: "Giảm giá là bắt buộc",
              })}
              type="number"
              error={!!errors?.discount}
              helperText={errors?.discount && errors.discount.message}
              margin="dense"
            />
          </FormControl>
        </Box>

        <FormControl fullWidth margin="dense">
          <Controller
            name="categories"
            control={control}
            defaultValue={[]} // Đặt giá trị mặc định là mảng rỗng
            rules={{ required: "Danh mục là bắt buộc" }} // Validation: bắt buộc phải chọn
            render={({ field }) => (
              <Autocomplete
                multiple
                options={options} // Các danh mục
                getOptionLabel={(option) => option.label} // Hiển thị tên của mỗi danh mục
                value={options.filter((option) =>
                  field.value.includes(option.id)
                )}
                onChange={(_, newValue) => {
                  const selectedIds = newValue.map((option) => option.id);
                  field.onChange(selectedIds); // Cập nhật giá trị vào React Hook Form
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Chọn danh mục"
                    placeholder="Tìm kiếm..."
                    error={!!errors.categories}
                    helperText={errors.categories?.message}
                  />
                )}
              />
            )}
          />
        </FormControl>

        <Box sx={{ display: "flex", gap: 2 }}>
          <FormControl fullWidth>
            <FormLabel>Nhà xuất bản</FormLabel>
            <TextField
              {...register("publisher", {
                required: "Nhà xuất bản là bắt buộc",
              })}
              error={!!errors?.publisher}
              helperText={errors?.publisher && errors.publisher.message}
              margin="dense"
            />
          </FormControl>
          <FormControl fullWidth>
            <FormLabel>Ngày xuất bản</FormLabel>
            <TextField
              {...register("publicationDate", {
                required: "Ngày xuất bản là bắt buộc",
              })}
              type="date"
              error={!!errors?.publicationDate}
              helperText={errors?.publicationDate?.message}
              margin="dense"
            />
          </FormControl>
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <FormControl fullWidth>
            <FormLabel>Thẻ</FormLabel>
            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  margin="dense"
                  value={field?.value?.join(", ")}
                  onChange={(e) => {
                    const tagsArray = e.target.value
                      .split(",")
                      .map((tag) => tag.trim());
                    field.onChange(tagsArray);
                  }}
                  helperText="Nhập các thẻ phân tách bằng dấu phẩy"
                />
              )}
            />
          </FormControl>

          <FormControl fullWidth>
            <FormLabel>Ngôn ngữ</FormLabel>
            <TextField
              {...register("language", {
                required: "Ngôn ngữ là bắt buộc",
              })}
              error={!!errors?.language}
              helperText={errors?.language && errors.language.message}
              margin="dense"
            />
          </FormControl>

          <FormControl fullWidth>
            <FormLabel>Số trang</FormLabel>
            <TextField
              {...register("numberOfPages", {
                required: "Số trang là bắt buộc",
              })}
              type="number"
              error={!!errors?.numberOfPages}
              helperText={errors?.numberOfPages && errors.numberOfPages.message}
              margin="dense"
            />
          </FormControl>
        </Box>

        <FormControl fullWidth margin="dense">
          <Controller
            name="format"
            control={control}
            defaultValue=""
            rules={{ required: "Định dạng sách là bắt buộc" }}
            render={({ field }) => (
              <Autocomplete
                {...field}
                options={formats}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Chọn định dạng sách"
                    placeholder="Tìm kiếm..."
                    error={!!errors.format}
                    helperText={errors.format?.message}
                  />
                )}
                onChange={(_, value) => field.onChange(value?.label)}
                value={
                  formats.find((option) => option.label === field.value) || null
                }
              />
            )}
          />
        </FormControl>
        <FormControl fullWidth>
          <FormLabel>Link ebook demo</FormLabel>
          <TextField
            {...register("ebookDemoLink", {
              required: "Link ebook demo là bắt buộc", // Validation
            })}
            error={!!errors?.ebookDemoLink}
            helperText={errors?.ebookDemoLink && errors.ebookDemoLink.message}
            margin="dense"
          />
        </FormControl>
        <FormControl fullWidth>
          <FormLabel>Số lượng tồn kho</FormLabel>
          <TextField
            {...register("stock", {
              required: "Số lượng tồn kho là bắt buộc",
            })}
            type="number"
            error={!!errors?.stock}
            helperText={errors?.stock && errors.stock.message}
            margin="dense"
          />
        </FormControl>
        <Box mt={2}>
          <h3>Ảnh đại diện</h3>
          <input
            type="file"
            accept="image/*"
            onChange={handleCoverImageChange}
          />
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
        </Box>

        <Box mt={2}>
          <Button variant="contained" color="primary" type="submit">
            Lưu sản phẩm
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default ProductForm;
