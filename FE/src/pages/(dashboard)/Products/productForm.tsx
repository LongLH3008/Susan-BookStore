// import React, { useEffect, useState } from "react";
// import { useForm, useFieldArray, Controller } from "react-hook-form";
// import {
//   TextField,
//   Button,
//   Box,
//   Checkbox,
//   FormControlLabel,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   OutlinedInput,
//   Chip,
//   FormGroup,
//   Typography,
//   Grid,
//   FormLabel,
//   Stack,
// } from "@mui/material";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import axios from "axios"; // Sử dụng axios để gửi request upload
// import {
//   addProduct,
//   editProduct,
//   fetchCategory,
//   fetchProductById,
// } from "@/services/product";
// import { AxiosError } from "axios";
// import { Book, Image } from "@/schemas/product";
// import { Console } from "console";
// import { useToast } from "@/common/hooks/useToast";
// import { useNavigate, useParams } from "react-router-dom";
// import PageLayout from "@/layouts/DashboardLayout";

// const ProductForm: React.FC = () => {
//   const { toast } = useToast();
//   const nav = useNavigate();
//   const { id } = useParams<{ id: string }>();
//   const {
//     control,
//     register,
//     handleSubmit,
//     setValue,
//     watch,
//     reset,
//     formState: { errors },
//   } = useForm<Book>();

//   // const { fields, append } = useFieldArray({
//   //   control,
//   //   name: "product_variations",
//   // });

//   const { data: categories } = useQuery({
//     queryKey: ["categories"],
//     queryFn: fetchCategory,
//   });

//   var selectedCategories = watch("categories");

//   const handleCategoryChange = (categoryId: string) => {
//     const updatedCategories = selectedCategories.includes(categoryId)
//       ? selectedCategories.filter((id) => id !== categoryId)
//       : [...selectedCategories, categoryId];

//     setValue("categories", updatedCategories);
//   };

//   const { mutateAsync, isError, error } = id
//     ? useMutation({
//         mutationFn: ({ data, id }: { data: Book; id: string }) =>
//           editProduct(data, id),
//         onSuccess: (data: any) => {
//           toast(data.status, `Thêm thành công`);
//           nav("/products");
//         },
//         onError: (err: any) => {
//           toast(err.status, err.message);
//         },
//       })
//     : useMutation({
//         mutationFn: addProduct,
//         onSuccess: (data: any) => {
//           toast(data.status, `Thêm thành công`);
//           nav("/products");
//         },
//         onError: (err: any) => {
//           toast(err.status, err.message);
//         },
//       });

//   const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
//   const [selectedCoverImage, setSelectedCoverImage] = useState<File | null>(
//     null
//   );
//   const [selectedImages, setSelectedImages] = useState<FileList | null>(null);
//   const [previewCoverImage, setPreviewCoverImage] = useState<string | null>(
//     null
//   );
//   const [previewImages, setPreviewImages] = useState<string[]>([]);

//   const onSubmit = async (data: Book) => {
//     try {
//       let coverImageUrl = "";
//       let imageUrls: Image[] = [];

//       // Upload ảnh đại diện nếu có
//       if (selectedCoverImage) {
//         const coverImageFormData = new FormData();
//         coverImageFormData.append("files", selectedCoverImage);

//         const coverImageResponse = await axios.post(
//           "http://localhost:5000/api/v1/upload",
//           coverImageFormData
//         );
//         coverImageUrl = coverImageResponse.data.metadata.fileLinks[0];
//         data.coverImage = coverImageUrl;
//       }

//       if (selectedImages) {
//         const imagesFormData = new FormData();
//         Array.from(selectedImages).forEach((file) => {
//           imagesFormData.append("files", file);
//         });
//         console.log("imagesFormData", imagesFormData);
//         const imagesResponse = await axios.post(
//           "http://localhost:5000/api/v1/upload",
//           imagesFormData
//         );

//         imageUrls = imagesResponse.data.metadata.fileLinks.map(
//           (img: string, index: number) => ({
//             id: `img${index + 1}`,
//             url: img,
//           })
//         );

//         data.images = imageUrls;
//       }
//       // Gửi dữ liệu sản phẩm cùng với URL ảnh lên
//       if (id) {
//         delete data._id;
//         delete data.sold;
//         delete data.rating;
//         delete data.totalReviews;
//         delete data.reviews;
//         delete data.createdAt;
//         delete data.updatedAt;
//         delete data.slug;
//         delete data.__v;
//       }
//       id ? await mutateAsync({ data, id }) : await mutateAsync(data);
//     } catch (error) {
//       console.error("Lỗi khi gửi form:", error);
//     }
//   };
//   const { data: book } = useQuery({
//     queryKey: ["book", id],
//     queryFn: () => fetchProductById(id!),
//     enabled: !!id,
//   });

//   const [isReset, setIsReset] = useState(false);

//   useEffect(() => {
//     if (book && !isReset) {
//       reset({
//         ...book.metadata,
//         publicationDate: book.metadata.publicationDate
//           ? book.metadata.publicationDate.split("T")[0]
//           : "",
//       });

//       if (book.metadata.coverImage) {
//         setPreviewCoverImage(book.metadata.coverImage);
//       }
//       if (book.metadata.images && book.metadata.images.length > 0) {
//         setPreviewImages(book.metadata.images.map((img: any) => img.url));
//       }
//       setIsReset(true);
//     }
//   }, [book, isReset, reset]);
//   selectedCategories = book?.metadata?.categories || [];
//   const handleProductImagesChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const files = event.target.files;
//     console.log("files", files);
//     if (files) {
//       setSelectedImages(files);
//       const imagePreviews: string[] = [];
//       Array.from(files).forEach((file) => {
//         const reader = new FileReader();
//         reader.onloadend = () => {
//           if (reader.result) {
//             imagePreviews.push(reader.result as string);
//             setPreviewImages([...imagePreviews]);
//           }
//         };
//         reader.readAsDataURL(file);
//       });
//     }
//   };
//   const handleCoverImageChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       setSelectedCoverImage(file);

//       const reader = new FileReader();
//       reader.onloadend = () => {
//         if (reader.result) {
//           setPreviewCoverImage(reader.result as string);
//         }
//       };
//       reader.readAsDataURL(file);
//     }
//   };
//   return (
//     <>
//       <PageLayout>
//         <div className="p-0 sm:ml-64 h-[100%] dark:bg-gray-800">
//           <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
//             <p className="text-2xl font-bold text-gray-800 dark:text-gray-50">
//               {id ? "Products Page Edit" : "Products Page Add"}
//             </p>
//           </div>
//           <Box
//             component="form"
//             onSubmit={handleSubmit(onSubmit)}
//             noValidate
//             autoComplete="off"
//             p={2}
//           >
//             <Box sx={{ display: "flex", gap: 2 }}>
//               <FormControl fullWidth>
//                 <FormLabel>Title</FormLabel>
//                 <TextField
//                   {...register("title", { required: "Title is Required" })}
//                   error={!!errors?.title}
//                   helperText={errors?.title && errors.title.message}
//                   margin="dense"
//                 />
//               </FormControl>
//               <FormControl fullWidth>
//                 <FormLabel>Author</FormLabel>
//                 <TextField
//                   {...register("author", { required: "Author is Required" })}
//                   error={!!errors?.author}
//                   helperText={errors?.author && errors.author.message}
//                   margin="dense"
//                 />
//               </FormControl>
//               <FormControl fullWidth>
//                 <FormLabel>ISBN</FormLabel>
//                 <TextField
//                   {...register("isbn", { required: "ISBN is Required" })}
//                   error={!!errors?.isbn}
//                   helperText={errors?.isbn && errors.isbn.message}
//                   margin="dense"
//                 />
//               </FormControl>
//             </Box>

//             <FormControl fullWidth>
//               <FormLabel>Description</FormLabel>
//               <TextField
//                 {...register("description", {
//                   required: "Description is Required",
//                 })}
//                 type="number"
//                 error={!!errors?.description}
//                 helperText={errors?.description && errors.description.message}
//                 multiline
//                 rows={3}
//                 margin="dense"
//               />
//             </FormControl>
//             <Box sx={{ display: "flex", gap: 2 }}>
//               <FormControl fullWidth>
//                 <FormLabel>Price</FormLabel>
//                 <TextField
//                   {...register("price", { required: "Price is Required" })}
//                   type="number"
//                   error={!!errors?.price}
//                   helperText={errors?.price && errors.price.message}
//                   margin="dense"
//                 />
//               </FormControl>
//               <FormControl fullWidth>
//                 <FormLabel>Discount</FormLabel>
//                 <TextField
//                   {...register("discount", {
//                     required: "Discount is Required",
//                   })}
//                   type="number"
//                   error={!!errors?.discount}
//                   helperText={errors?.discount && errors.discount.message}
//                   margin="dense"
//                 />
//               </FormControl>
//             </Box>
//             {/* <TextField
//         label="Sold"
//         type="number"
//         {...register("sold")}
//         fullWidth
//         margin="normal"
//       /> */}

//             <FormLabel>Category</FormLabel>
//             <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
//               {categories?.metadata?.map((category: any) => (
//                 <FormControlLabel
//                   key={category?.id}
//                   control={
//                     <Checkbox
//                       checked={selectedCategories?.includes(category?.id)}
//                       onChange={() => handleCategoryChange(category?.id)}
//                     />
//                   }
//                   label={category?.category_name}
//                   sx={{ width: "auto" }}
//                 />
//               ))}
//             </Box>
//             <Box sx={{ display: "flex", gap: 2 }}>
//               <FormControl fullWidth>
//                 <FormLabel>Publisher</FormLabel>
//                 <TextField
//                   {...register("publisher", {
//                     required: "Publisher is Required",
//                   })}
//                   error={!!errors?.publisher}
//                   helperText={errors?.publisher && errors.publisher.message}
//                   margin="dense"
//                 />
//               </FormControl>
//               <FormControl fullWidth>
//                 <FormLabel>PublicationDate</FormLabel>
//                 <TextField
//                   {...register("publicationDate", {
//                     required: "PublicationDate is Required",
//                   })}
//                   type="date"
//                   error={!!errors?.publicationDate}
//                   helperText={
//                     errors?.publicationDate && errors.publicationDate.message
//                   }
//                   margin="dense"
//                 />
//               </FormControl>
//             </Box>
//             <Box sx={{ display: "flex", gap: 2 }}>
//               <FormControl fullWidth>
//                 <FormLabel>Tags</FormLabel>
//                 <Controller
//                   name="tags"
//                   control={control}
//                   render={({ field }) => (
//                     <TextField
//                       fullWidth
//                       margin="dense"
//                       value={field?.value?.join(", ")}
//                       onChange={(e) => {
//                         const tagsArray = e.target.value
//                           .split(",")
//                           .map((tag) => tag.trim());
//                         field.onChange(tagsArray);
//                       }}
//                       helperText="Enter tags separated by commas"
//                     />
//                   )}
//                 />
//               </FormControl>
//               <FormControl fullWidth>
//                 <FormLabel>Language</FormLabel>
//                 <TextField
//                   {...register("language", {
//                     required: "Language is Required",
//                   })}
//                   error={!!errors?.language}
//                   helperText={errors?.language && errors.language.message}
//                   margin="dense"
//                 />
//               </FormControl>

//               <FormControl fullWidth>
//                 <FormLabel>NumberOfPages</FormLabel>
//                 <TextField
//                   {...register("numberOfPages", {
//                     required: "NumberOfPages is Required",
//                   })}
//                   type="number"
//                   error={!!errors?.numberOfPages}
//                   helperText={
//                     errors?.numberOfPages && errors.numberOfPages.message
//                   }
//                   margin="dense"
//                 />
//               </FormControl>
//             </Box>
//             <Box sx={{ display: "flex", gap: 2 }}>
//               <FormControl fullWidth>
//                 <FormLabel>Format</FormLabel>
//                 <TextField
//                   {...register("format", {
//                     required: "Format is Required",
//                   })}
//                   error={!!errors?.format}
//                   helperText={errors?.format && errors.format.message}
//                   margin="dense"
//                 />
//               </FormControl>
//               <FormControl fullWidth>
//                 <FormLabel>EbookDemoLink</FormLabel>
//                 <TextField
//                   {...register("ebookDemoLink", {
//                     required: "EbookDemoLink is Required",
//                   })}
//                   error={!!errors?.ebookDemoLink}
//                   helperText={
//                     errors?.ebookDemoLink && errors.ebookDemoLink.message
//                   }
//                   margin="dense"
//                 />
//               </FormControl>
//               <FormControl fullWidth>
//                 <FormLabel>Stock</FormLabel>
//                 <TextField
//                   {...register("stock", {
//                     required: "Stock is Required",
//                   })}
//                   type="number"
//                   error={!!errors?.stock}
//                   helperText={errors?.stock && errors.stock.message}
//                   margin="dense"
//                 />
//               </FormControl>
//             </Box>

//             {/* <TextField
//         label="Hình ảnh"
//         {...register("images")}
//         fullWidth
//         margin="normal"
//       /> */}

//             <h3>Ảnh đại diện</h3>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleCoverImageChange}
//             />
//             {previewCoverImage && (
//               <img src={previewCoverImage} alt="Cover Preview" width="200" />
//             )}

//             <h3>Mảng hình ảnh</h3>
//             <input
//               type="file"
//               accept="image/*"
//               multiple
//               onChange={handleProductImagesChange}
//             />
//             {previewImages.map((src, idx) => (
//               <img key={idx} src={src} alt={`Preview ${idx}`} width="200" />
//             ))}

//             {/* <h3>Biến thể sản phẩm</h3>
//       {fields.map((item, index) => (
//         <Box key={item.id} mb={2}>
//           <TextField
//             label="Mã biến thể"
//             {...register(`product_variations.${index}.product_variant_id`)}
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             label="Số lượng"
//             type="number"
//             {...register(`product_variations.${index}.product_quantity`)}
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             label="Giá biến thể"
//             type="number"
//             {...register(`product_variations.${index}.product_price`)}
//             fullWidth
//             margin="normal"
//           />
//           <FormControlLabel
//             control={
//               <Checkbox
//                 {...register(`product_variations.${index}.is_default`)}
//               />
//             }
//             label="Là mặc định"
//           />
//           <FormControlLabel
//             control={
//               <Checkbox {...register(`product_variations.${index}.isActive`)} />
//             }
//             label="Kích hoạt"
//           />
//         </Box>
//       ))}
//       <Button
//         variant="outlined"
//         onClick={() =>
//           append({
//             product_variant_id: "",
//             product_quantity: 0,
//             product_price: 0,
//             is_default: false,
//             isActive: true,
//           })
//         }
//       >
//         Thêm biến thể
//       </Button> */}

//             {/* <FormControlLabel
//         control={<Checkbox {...register("isActive")} />}
//         label="Kích hoạt sản phẩm"
//       /> */}

//             <Box mt={2}>
//               <Button variant="contained" color="primary" type="submit">
//                 Lưu sản phẩm
//               </Button>
//             </Box>
//           </Box>
//         </div>
//       </PageLayout>
//     </>
//   );
// };

// export default ProductForm;
