import useBanner from "@/common/hooks/useBanner";
import { useToast } from "@/common/hooks/useToast";
import { IBannerSale } from "@/common/interfaces/banner";
import { ToastVariant } from "@/common/interfaces/toast";
import { UpdateBannerSale, UpdateStatusBannerSale } from "@/services/banner.service";
import {
	Backdrop,
	Box,
	Button,
	CircularProgress,
	Fab,
	ImageList,
	ImageListItem,
	Tooltip,
	Typography,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { FaBox, FaBoxOpen } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { AddBannerSale } from "./AddBannerSale";

const BannerSalePage = () => {
	const { DataBannerSale } = useBanner();
	const queryClient = useQueryClient();
	const { toast } = useToast();
	const nav = useNavigate();
	const [confirmOpen, setConfirmOpen] = useState(false);
	const [open, setOpen] = useState<string | undefined>("");
	const [selectedCoverImage, setSelectedCoverImage] = useState<File | null>(null);
	const [previewCoverImage, setPreviewCoverImage] = useState<string | null>(null);
	const [link, setLink] = useState<string>("");

	const { mutateAsync, isPending } = useMutation({
		mutationFn: ({ data, id }: { data: IBannerSale; id: string }) => UpdateBannerSale(id, data),
		onSuccess: (data: any) => {
			toast({
				variant: ToastVariant.SUCCESS,
				content: `Chỉnh sửa ảnh thành công`,
			});
			queryClient.invalidateQueries({ queryKey: ["BannerSale"] });
			setOpen("");
		},
		onError: (error: AxiosError) => {
			const message = "Lỗi khi Chỉnh sửa ảnh : ";
			toast({
				variant: ToastVariant.ERROR,
				content: message + (error.response?.data || error.message),
			});
		},
	});
	const isActive = useMutation({
		mutationFn: ({ id, payload }: { id: string; payload: { is_active: boolean } }) =>
			UpdateStatusBannerSale(id, payload),
		onSuccess: (data: any) => {
			toast({
				variant: ToastVariant.SUCCESS,
				content: `Cập nhật thành công`,
			});
			DataBannerSale.refetch();
		},
		onError: (error: any) => {
			const message = "Lỗi Thao tác : ";
			toast({
				variant: ToastVariant.ERROR,
				content: message + (error.response?.data || error.message),
			});
		},
	});

	const handleChangeLink = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLink(e.target.value);
	};

	const onEdit = async (id: string) => {
		setLink("");
		try {
			if (previewCoverImage && previewCoverImage !== "") {
				const data = {
					image: previewCoverImage,
					link,
				};
				await mutateAsync({ data, id });
				return;
			}
			if (selectedCoverImage) {
				const coverImageFormData = new FormData();
				coverImageFormData.append("files", selectedCoverImage);
				const coverImageResponse = await axios.post(
					"http://localhost:5000/api/v1/upload",
					coverImageFormData
				);
				const coverImageUrl = coverImageResponse.data.metadata.fileLinks[0];
				console.log("coverImageUrl", coverImageUrl);
				const data = {
					image: coverImageUrl,
					link,
				};
				await mutateAsync({ data, id });
			}
		} catch (error) {
			toast({
				variant: ToastVariant.ERROR,
				content: `Lỗi khi gửi form: ${error}`,
			});
			console.error("Lỗi khi gửi form:", error);
		}
	};

	// lấy ảnh đại diện
	const handleCoverImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file?.type.match("image/*")) {
			toast({
				variant: ToastVariant.ERROR,
				content: "File không đúng định dạng",
			});
			return;
		}
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

	const openItem = (arg: any) => {
		setOpen(arg._id);
		setLink(arg.link);
		setPreviewCoverImage(arg.image);
	};

	useEffect(() => {
		setConfirmOpen(isPending);
	}, [isPending]);
	//Block ảnh
	const onLock = (id: string) => {
		const payload = {
			is_active: true,
		};
		isActive.mutate({ id, payload });
	};
	const onUnlock = (id: string) => {
		const payload = {
			is_active: false,
		};
		isActive.mutate({ id, payload });
	};

	if (DataBannerSale.isLoading) {
		return (
			<div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
				<CircularProgress />
			</div>
		);
	}

	if (DataBannerSale.isError) {
		return (
			<Typography variant="h6" color="error">
				Error loading blogs.
			</Typography>
		);
	}

	if (!DataBannerSale.data || !Array.isArray(DataBannerSale.data.metadata.data)) {
		return (
			<Typography variant="h6" color="textSecondary">
				No banners available.
			</Typography>
		);
	}

	return (
		<>
			<div className="rounded-lg shadow-sm bg-white p-5 mb-[50px] flex justify-between items-center">
				<div className="flex items-center gap-3">
					<i className="fa-solid fa-image"></i>
					<h2 className={`text-xl font-[500]`}>Ảnh quảng cáo</h2>
				</div>
				<AddBannerSale
					trigger={
						<button
							type="button"
							className="size-10 bg-zinc-900 hover:bg-[#00bfc5] grid place-items-center text-white rounded-md text-2xl hover:scale-110 duration-200"
						>
							<IoMdAdd />
						</button>
					}
				/>
			</div>
			<ImageList className="w-full h-auto">
				{DataBannerSale?.data?.metadata?.data?.map((item: IBannerSale) => (
					<ImageListItem key={item._id} className="border border-gray-200">
						{open === item._id ? (
							<div className="h-[300px]">
								<div className="flex flex-col items-center justify-center w-full ">
									<label
										htmlFor={`dropzone-file-${item._id}`}
										className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
									>
										<div className="flex flex-col items-center justify-center pt-5 pb-6">
											{previewCoverImage ? (
												<img
													src={previewCoverImage}
													alt="Cover Preview"
													width="100"
												/>
											) : (
												<img
													src={item.image}
													alt="Cover Preview"
													width="100"
												/>
											)}
										</div>
										<input
											id={`dropzone-file-${item._id}`}
											type="file"
											className="hidden"
											accept="image/*"
											onChange={handleCoverImageChange}
										/>
									</label>
									<label
										htmlFor={`dropzone-file`}
										className="flex gap-3 items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
									>
										<div className="flex flex-col items-center justify-center pt-5 pb-6">
											<p className="text-sm">Đường dẫn điều hướng</p>
										</div>
										<input
											onChange={(e) => handleChangeLink(e)}
											id={`dropzone-file`}
											type="text"
											defaultValue={item.link}
											className="border-zinc-300 ring-0 text-sm"
											placeholder="Đường dẫn điều hướng"
										/>
									</label>
								</div>
								<div className="flex items-center justify-end gap-4 my-4">
									<Button variant="outlined" onClick={() => setOpen(undefined)}>
										Hủy
									</Button>
									<Button variant="contained" onClick={() => onEdit(item._id)}>
										Cập nhật
									</Button>
								</div>
							</div>
						) : (
							<img
								src={`${item.image}`}
								alt=""
								loading="lazy"
								className="h-[300px] object-cover"
							/>
						)}
						{open !== item._id && (
							// Nút chỉnh sửa
							<>
								<Box
									sx={{
										transform: "translateZ(0px)",
										flexGrow: 1,
									}}
								>
									{item.is_active ? (
										<Tooltip
											title="Ngừng kích hoạt"
											onClick={() => onUnlock(item._id)}
										>
											<Fab
												className="absolute right-6 bottom-6"
												color="inherit"
												aria-label="edit"
											>
												<FaBoxOpen className="text-xl" />{" "}
											</Fab>
										</Tooltip>
									) : (
										<Tooltip title="Kích hoạt" onClick={() => onLock(item._id)}>
											<Fab
												className="absolute right-6 bottom-6"
												color="inherit"
												aria-label="edit"
											>
												<FaBox className="text-[17px]" />
											</Fab>
										</Tooltip>
									)}
								</Box>
								<Box
									sx={{
										transform: "translateZ(0px)",
										flexGrow: 1,
									}}
								>
									<Tooltip
										title="Chỉnh sửa"
										className="absolute right-24 bottom-6"
										onClick={() => openItem(item)}
									>
										<Fab color="primary" aria-label="add">
											<FiEdit className="text-xl" />
										</Fab>
									</Tooltip>
								</Box>
							</>
						)}
					</ImageListItem>
				))}
			</ImageList>

			{/* confirm pending */}
			<Backdrop sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })} open={confirmOpen}>
				<CircularProgress color="inherit" />
			</Backdrop>
		</>
	);
};

export default BannerSalePage;
