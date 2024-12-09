"use client";

import { useToast } from "@/common/hooks/useToast";
import { ToastVariant } from "@/common/interfaces/toast";
import { instance } from "@/config";
import { createBannerSale } from "@/services/banner.service";
import { joiResolver } from "@hookform/resolvers/joi";
import { useQueryClient } from "@tanstack/react-query";
import { Modal } from "flowbite-react";
import Joi from "joi";
import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";

type TBannerSale = {
	image: string;
	is_active: boolean;
	link: string;
};

const schemaAddress = Joi.object({
	link: Joi.string().required().messages({
		"any.required": "Chưa nhập đường đẫn",
		"string.empty": "Chưa nhập đường đẫn",
	}),
	image: Joi.string().required().messages({
		"any.required": "Chưa tải ảnh lên",
		"string.empty": "Chưa tải ảnh lên",
	}),
	is_active: Joi.boolean().default(true),
});

export function AddBannerSale({ trigger }: { trigger?: ReactNode }) {
	const queryClient = useQueryClient();
	const { toast } = useToast();
	const [openModal, setOpenModal] = useState(false);
	const [selectedCoverImage, setSelectedCoverImage] = useState<File | null>(null);
	const [previewCoverImage, setPreviewCoverImage] = useState<string | null>(null);

	const form = useForm<TBannerSale>({
		resolver: joiResolver(schemaAddress),
	});

	const submit = async () => {
		try {
			if (selectedCoverImage) {
				const coverImageFormData = new FormData();
				coverImageFormData.append("files", selectedCoverImage);
				const coverImageResponse = await instance.post("/upload", coverImageFormData);
				const coverImageUrl = coverImageResponse.data.metadata.fileLinks[0];
				form.setValue("image", coverImageUrl);
				const check = await form.trigger();
				if (!check) return;
				const payload = {
					...form.getValues(),
				};
				const response = await createBannerSale(payload);
				queryClient.invalidateQueries({ queryKey: ["BannerSale"] });
				toast({
					variant: ToastVariant.SUCCESS,
					content: "Thêm mới thành công",
				});
				close();
			}
		} catch (error) {
			toast({
				variant: ToastVariant.ERROR,
				content: `Lỗi khi gửi form: ${error}`,
			});
			console.error("Lỗi khi gửi form:", error);
		}
		close();
	};

	const close = () => {
		setOpenModal(false);
		form.reset();
		setPreviewCoverImage(null);
		setSelectedCoverImage(null);
	};

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

	return (
		<>
			<div onClick={() => setOpenModal(true)} className="w-fit h-fit border-0">
				{trigger}
			</div>

			<Modal className="*:max-w-[600px]" show={openModal} onClose={() => setOpenModal(false)}>
				<Modal.Body className="px-7 py-4 h-fit overflow-visible">
					<form className="py-5 flex flex-col gap-7">
						<h3 className="font-[500] text-lg">Thêm mới ảnh quảng báo</h3>
						<div className="flex flex-col items-center justify-center w-full ">
							<label
								htmlFor={`dropzone-file`}
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
										<div className="contents">
											<AiOutlineCloudUpload className="text-5xl" />
											<p className="mb-2 text-sm">
												<span className="font-semibold">
													Nhấn để tải lên
												</span>{" "}
												hoặc kéo và thả vào
											</p>
											<p className="text-xs">
												SVG, PNG, JPG hoặc GIF (Min. 1400x800px)
											</p>
										</div>
									)}
								</div>
								<input
									id={`dropzone-file`}
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
									{...form.register("link")}
									type="text"
									className="border-zinc-300 ring-0 text-sm"
									placeholder="Đường dẫn điều hướng"
								/>
							</label>
							{form.formState.errors.image && (
								<span className="text-red-500 text-[12px]">
									{form.formState.errors.image.message}
								</span>
							)}
							{form.formState.errors.link && (
								<span className="text-red-500 text-[12px]">
									{form.formState.errors.link.message}
								</span>
							)}
						</div>
						<button
							type="button"
							onClick={() => submit()}
							className="w-full rounded-md  border text-center py-3 cursor-pointer hover:bg-black hover:text-white"
						>
							Thêm mới
						</button>
					</form>
				</Modal.Body>
				<span
					onClick={() => close()}
					className="absolute top-2 right-2 rounded-md hover:bg-zinc-100 cursor-pointer p-2 flex items-center justify-center"
				>
					<IoMdClose />
				</span>
			</Modal>
		</>
	);
}
