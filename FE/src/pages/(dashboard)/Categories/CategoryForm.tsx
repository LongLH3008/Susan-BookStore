import { useToast } from "@/common/hooks/useToast";
import { ToastVariant } from "@/common/interfaces/toast";
import { createCategory, updateCategory } from "@/services/categories.service";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";

const CategoryForm = ({ id, selectedCategory, onClose, refetch, open }: any) => {
	const { toast } = useToast();
	const [categoryName, setCategoryName] = useState(selectedCategory?.category_name || "");
	const [selectedCategoryThumb, setSelectedCategoryThumb] = useState<File | null>(null);
	const [categoryThumbPreview, setCategoryThumbPreview] = useState<string | null>(null); // State cho ảnh preview

	useEffect(() => {
		// Cập nhật tên danh mục và ảnh đại diện khi selectedCategory thay đổi
		if (selectedCategory) {
			setCategoryName(selectedCategory.category_name);
			setCategoryThumbPreview(selectedCategory.category_thumb);
		}
	}, [selectedCategory]);

	const { mutateAsync: updateCategoryMutate } = useMutation({
		mutationFn: updateCategory,
		onSuccess: (data) => {
			toast({
				variant: ToastVariant.SUCCESS,
				content: `Cập nhật danh mục thành công`,
			});
			refetch();
			setCategoryName("");
			onClose();
			window.location.reload();
		},
		onError: (error: any) => {
			let message = "Lỗi khi cập nhật danh mục: ";
			toast({
				variant: ToastVariant.ERROR,
				content: message,
			});
		},
	});

	const { mutateAsync: createCategoryMutate } = useMutation({
		mutationFn: createCategory,
		onSuccess: (data) => {
			toast({
				variant: ToastVariant.SUCCESS,
				content: `Thêm danh mục thành công`,
			});
			refetch();
			setCategoryName(""); // Reset tên danh mục mới
			onClose();
		},
		onError: (error: any) => {
			let message = "Lỗi khi thêm danh mục: ";
			toast({
				variant: ToastVariant.ERROR,
				content: message,
			});
		},
	});

	const handleSubmit = async () => {
		try {
			let categoryThumbUrl = "";

			// Upload ảnh đại diện nếu có
			if (selectedCategoryThumb) {
				const categoryThumbFormData = new FormData();
				categoryThumbFormData.append("files", selectedCategoryThumb);
				const categoryThumbResponse = await axios.post(
					"http://localhost:5000/api/v1/upload",
					categoryThumbFormData
				);
				categoryThumbUrl = categoryThumbResponse.data.metadata.fileLinks[0];
			}

			const data = {
				category_name: categoryName,
				category_thumb: categoryThumbUrl || selectedCategory?.category_thumb,
			};

			// Gọi hàm tạo hoặc cập nhật
			if (id) {
				await updateCategoryMutate({ id, ...data });
			} else {
				await createCategoryMutate(data);
			}
		} catch (error) {
			console.error("Lỗi khi gửi form:", error);
		}
	};

	const handleCategoryThumbChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			const file = event.target.files[0];
			const reader = new FileReader();
			reader.onloadend = () => {
				setCategoryThumbPreview(reader.result as string);
			};
			reader.readAsDataURL(file);
			setSelectedCategoryThumb(file);
		}
	};

	return (
		<Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
			<DialogTitle>
				{id ? "Chỉnh sửa danh mục" : "Thêm mới danh mục"}
				<IconButton
					aria-label="close"
					onClick={onClose}
					sx={{ position: "absolute", right: 8, top: 8 }}
				>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<DialogContent dividers>
				<Box>
					<TextField
						label="Tên danh mục"
						variant="outlined"
						fullWidth
						value={categoryName}
						className="my-4"
						onChange={(e) => setCategoryName(e.target.value)} // Cập nhật tên danh mục
					/>
					<input
						type="file"
						accept="image/*"
						onChange={handleCategoryThumbChange} // Hàm chọn ảnh
						className="my-4"
					/>

					{/* Hiển thị ảnh đại diện preview nếu có */}
					{categoryThumbPreview && (
						<Box mt={2}>
							<Typography variant="h6">Ảnh đại diện preview:</Typography>
							<img
								src={categoryThumbPreview}
								alt="Ảnh đại diện"
								style={{ width: "200px", height: "auto", marginTop: "10px" }}
							/>
						</Box>
					)}

					{/* Hiển thị ảnh đại diện hiện tại nếu có */}
					{selectedCategory?.category_thumb && !categoryThumbPreview && (
						<Box mt={2}>
							<Typography variant="h6">Ảnh đại diện hiện tại:</Typography>
							<img
								src={selectedCategory.category_thumb}
								alt="Ảnh đại diện"
								style={{ width: "200px", height: "auto", marginTop: "10px" }}
							/>
						</Box>
					)}
				</Box>
			</DialogContent>
			<Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
				<Button onClick={onClose}>Hủy</Button>
				<Button onClick={handleSubmit} color="primary" sx={{ ml: 1 }}>
					{id ? "Lưu" : "Thêm"} {/* Thay đổi nhãn nút */}
				</Button>
			</Box>
		</Dialog>
	);
};

export default CategoryForm;
