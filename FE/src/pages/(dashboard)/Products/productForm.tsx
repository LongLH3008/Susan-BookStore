import { useToast } from "@/common/hooks/useToast";
import { ToastVariant } from "@/common/interfaces/toast";
import { Book, Image } from "@/common/schemas/product";
import { getCategories } from "@/services/categories.service";
import { addProduct, editProduct, getProducttById } from "@/services/product.service";
import {
	Autocomplete,
	Backdrop,
	Box,
	Button,
	CircularProgress,
	FormControl,
	FormLabel,
	TextField,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios"; // Sử dụng axios để gửi request upload
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { Link, useNavigate, useParams } from "react-router-dom";

const ProductForm: React.FC = () => {
	const { toast } = useToast();
	const nav = useNavigate();
	const { id } = useParams<{ id: string }>();
	const [open, setOpen] = useState<boolean>(false);

	const queryClient = useQueryClient();

	const {
		control,
		register,
		handleSubmit,
		setValue,
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
	const { mutateAsync, isError, error, isPending } = id
		? useMutation({
				mutationFn: ({ data, id }: { data: Book; id: string }) => editProduct(data, id),
				onSuccess: (data: any) => {
					nav("/quan-tri/san-pham");
					toast({
						variant: ToastVariant.SUCCESS,
						content: `Cập nhật sản phẩm thành công`,
					});
					queryClient.invalidateQueries({ queryKey: ["BooksAdmin"] });
				},
				onError: (err: any) => {
					const message = "Lỗi khi cập nhật sản phẩm: ";
					toast({
						variant: ToastVariant.ERROR,
						content: message + err.response?.data?.error || err.message,
					});
				},
		  })
		: useMutation({
				mutationFn: addProduct,
				onSuccess: (data: any) => {
					nav("/quan-tri/san-pham");
					toast({
						variant: ToastVariant.SUCCESS,
						content: `Thêm mới sản phẩm thành công`,
					});
				},
				onError: (err: any) => {
					let message = "Lỗi khi thêm sản phẩm: ";
					toast({
						variant: ToastVariant.ERROR,
						content: message + error.response?.data || error.message,
					});
				},
		  });
	const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
	const [selectedCoverImage, setSelectedCoverImage] = useState<File | null>(null);
	const [selectedImages, setSelectedImages] = useState<FileList | null>(null);
	const [previewCoverImage, setPreviewCoverImage] = useState<string | null>(null);
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
				const imagesResponse = await axios.post("http://localhost:5000/api/v1/upload", imagesFormData);

				imageUrls = imagesResponse.data.metadata.fileLinks.map((img: string, index: number) => ({
					id: `img${index + 1}`,
					url: img,
				}));

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
			console.log(data);

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
	const handleProductImagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
	const handleCoverImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
	useEffect(() => {
		setOpen(isPending);
	}, [isPending]);
	return (
		<>
			<div className="p-5 flex justify-between items-center bg-white shadow-sm rounded-lg mb-[50px]">
				<div className="flex items-center gap-3">
					<i className="fa-solid fa-ticket"></i>
					<h2 className={`text-xl font-[500]`}>{!id ? "Thêm" : "Sửa"} sản phẩm</h2>
				</div>
				<div className="flex items-center gap-2">
					<Link
						to={"/quan-tri/san-pham/"}
						type="reset"
						className="size-10 bg-zinc-900 hover:bg-[#00bfc5] grid place-items-center text-white rounded-md text-2xl hover:scale-110 duration-200"
					>
						<FaArrowRightFromBracket />
					</Link>
				</div>
			</div>
			<Box
				component="form"
				onSubmit={handleSubmit(onSubmit)}
				noValidate
				autoComplete="off"
				p={3}
				bgcolor="background.paper"
				borderRadius={2}
				boxShadow={3}
			>
				<Box sx={{ display: "flex", gap: 2, mb: 2 }}>
					<FormControl fullWidth>
						<FormLabel>Tiêu đề</FormLabel>
						<TextField
							{...register("title", { required: "Tiêu đề là bắt buộc" })}
							error={!!errors?.title}
							helperText={errors?.title && errors.title.message}
							size="small"
						/>
					</FormControl>
					<FormControl fullWidth>
						<FormLabel>Tác giả</FormLabel>
						<TextField
							size="small"
							{...register("author", { required: "Tác giả là bắt buộc" })}
							error={!!errors?.author}
							helperText={errors?.author && errors.author.message}
						/>
					</FormControl>
					<FormControl fullWidth>
						<FormLabel>ISBN</FormLabel>
						<TextField
							size="small"
							{...register("isbn", { required: "ISBN là bắt buộc" })}
							error={!!errors?.isbn}
							helperText={errors?.isbn && errors.isbn.message}
						/>
					</FormControl>
				</Box>

				<Box sx={{ display: "flex", gap: 2, mb: 2 }}>
					<FormControl fullWidth>
						<FormLabel>Giá</FormLabel>
						<TextField
							size="small"
							{...register("price", {
								required: "Giá là bắt buộc",
								valueAsNumber: true, // Chuyển đổi giá trị nhập vào thành số
								min: {
									value: 0,
									message: "Giá phải lớn hơn hoặc bằng 0",
								},
								max: {
									value: 10000000,
									message: "Giá không được vượt quá 10,000,000",
								},
							})}
							type="number"
							error={!!errors?.price}
							helperText={errors?.price && errors.price.message}
						/>
					</FormControl>

					<FormControl fullWidth>
						<FormLabel>Giảm giá</FormLabel>
						<TextField
							size="small"
							{...register("discount", {
								required: "Giảm giá là bắt buộc",
								valueAsNumber: true,
								min: {
									value: 0,
									message: "Giảm giá phải lớn hơn hoặc bằng 0",
								},
								max: {
									value: 100,
									message: "Giảm giá không được vượt quá 100%",
								},
							})}
							type="number"
							error={!!errors?.discount}
							helperText={errors?.discount && errors.discount.message}
						/>
					</FormControl>

					<FormControl fullWidth>
						<FormLabel>Danh mục</FormLabel>
						<Controller
							name="categories"
							control={control}
							defaultValue={[]}
							rules={{ required: "Danh mục là bắt buộc" }}
							render={({ field }) => (
								<Autocomplete
									multiple
									options={options}
									getOptionLabel={(option) => option.label}
									value={options.filter((option: any) =>
										field.value.includes(option.id)
									)}
									onChange={(_, newValue) => {
										const selectedIds = newValue.map((option) => option.id);
										field.onChange(selectedIds);
									}}
									renderInput={(params) => (
										<TextField
											{...params}
											variant="outlined"
											label="Chọn danh mục"
											placeholder="Tìm kiếm..."
											size="small"
											error={!!errors.categories}
											helperText={errors.categories?.message}
										/>
									)}
								/>
							)}
						/>
					</FormControl>
				</Box>

				<Box sx={{ display: "flex", gap: 2, mb: 2 }}>
					<FormControl fullWidth>
						<FormLabel>Nhà xuất bản</FormLabel>
						<TextField
							size="small"
							{...register("publisher", {
								required: "Nhà xuất bản là bắt buộc",
							})}
							error={!!errors?.publisher}
							helperText={errors?.publisher && errors.publisher.message}
						/>
					</FormControl>
					<FormControl fullWidth>
						<FormLabel>Ngày xuất bản</FormLabel>
						<TextField
							size="small"
							{...register("publicationDate", {
								required: "Ngày xuất bản là bắt buộc",
							})}
							type="date"
							error={!!errors?.publicationDate}
							helperText={errors?.publicationDate?.message}
						/>
					</FormControl>
				</Box>

				<Box sx={{ display: "flex", gap: 2, mb: 2 }}>
					<FormControl fullWidth>
						<FormLabel>Thẻ</FormLabel>
						<Controller
							name="tags"
							control={control}
							render={({ field }) => (
								<TextField
									fullWidth
									size="small"
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
							size="small"
							error={!!errors?.language}
							helperText={errors?.language && errors.language.message}
						/>
					</FormControl>

					<FormControl fullWidth>
						<FormLabel>Số trang</FormLabel>
						<TextField
							{...register("numberOfPages", {
								required: "Số trang là bắt buộc",
							})}
							size="small"
							type="number"
							error={!!errors?.numberOfPages}
							helperText={errors?.numberOfPages && errors.numberOfPages.message}
						/>
					</FormControl>
				</Box>
				<Box sx={{ display: "flex", gap: 2, mb: 2 }}>
					<FormControl fullWidth>
						<FormLabel>Định dạng sách</FormLabel>
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
											size="small"
											label="Chọn định dạng sách"
											placeholder="Tìm kiếm..."
											error={!!errors.format}
											helperText={errors.format?.message}
										/>
									)}
									onChange={(_, value) => field.onChange(value?.label)}
									value={
										formats.find((option) => option.label === field.value) ||
										null
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
							size="small"
							error={!!errors?.ebookDemoLink}
							helperText={errors?.ebookDemoLink && errors.ebookDemoLink.message}
						/>
					</FormControl>
					<FormControl fullWidth>
						<FormLabel>Số lượng tồn kho</FormLabel>
						<TextField
							{...register("stock", {
								required: "Số lượng tồn kho là bắt buộc",
							})}
							size="small"
							type="number"
							error={!!errors?.stock}
							helperText={errors?.stock && errors.stock.message}
						/>
					</FormControl>
				</Box>
				<FormControl fullWidth>
					<FormLabel>Mô tả</FormLabel>
					<TextField
						size="small"
						{...register("description", { required: "Mô tả là bắt buộc" })}
						error={!!errors?.description}
						helperText={errors?.description && errors.description.message}
						multiline
						rows={3}
					/>
				</FormControl>
				<Box mt={2}>
					<h3>Ảnh đại diện</h3>
					<Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
						<input type="file" accept="image/*" onChange={handleCoverImageChange} />
						{previewCoverImage && (
							<img
								src={previewCoverImage}
								alt="Cover Preview"
								style={{ maxWidth: "200px", borderRadius: "8px" }}
							/>
						)}
					</Box>

					<h3>Mảng hình ảnh</h3>
					<Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
						<input type="file" accept="image/*" multiple onChange={handleProductImagesChange} />
						{previewImages.map((src, idx) => (
							<img
								key={idx}
								src={src}
								alt={`Preview ${idx}`}
								style={{ maxWidth: "200px", borderRadius: "8px" }}
							/>
						))}
					</Box>
				</Box>

				<Box mt={2}>
					<Button variant="contained" color="primary" type="submit">
						Lưu sản phẩm
					</Button>
				</Box>
			</Box>
			<Backdrop sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })} open={open}>
				<CircularProgress color="inherit" />
			</Backdrop>
		</>
	);
};

export default ProductForm;
