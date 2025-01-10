"use client";

import { userState } from "@/common/hooks/useAuth";
import { IReview } from "@/common/interfaces/review";
import { ConvertVNDString } from "@/common/shared/round-number";
import { createReview, updateReviewProductInOrder } from "@/services/review.service";
import { Rating } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { Modal } from "flowbite-react";
import { ReactNode, SyntheticEvent, useState } from "react";
import { IoMdClose } from "react-icons/io";

export function PopupReview({ trigger, data, orderId }: { trigger?: ReactNode; data: any; orderId: string }) {
	const queryClient = useQueryClient();
	const [openModal, setOpenModal] = useState(false);
	const { id: userId } = userState();
	const [rating, setRating] = useState<number>(3);
	const [content, setContent] = useState<string>("");

	console.log(data);

	const calcDiscount =
		Math.abs(data.discount) > 0 ? data.price * Math.abs((100 - data.discount) / 100) : data.price;

	const submit = async () => {
		if (content == "") return;
		const payload: IReview = {
			comment: content,
			userId,
			rating,
		};

		try {
			await createReview(data.bookId, payload);
			await updateReviewProductInOrder({ bookId: data.bookId, orderId, isComment: true });
			queryClient.invalidateQueries({ queryKey: ["orders_user"], exact: true });
			close();
		} catch (err: any) {}
	};

	const close = () => {
		setOpenModal(false);
		setContent("");
	};

	return (
		<>
			<div onClick={() => setOpenModal(true)} className="w-fit h-fit border-0">
				{trigger}
			</div>

			<Modal className="*:max-w-[600px]" show={openModal} onClose={() => setOpenModal(false)}>
				<Modal.Body className="px-7 py-4 h-fit overflow-visible">
					<form className="py-5 flex flex-col gap-7">
						<h3 className="text-xl font-semibold sm:text-2xl">Đánh giá sản phẩm</h3>
						<div className="flex items-start gap-4">
							<figure className="size-28 col-span-1 grid place-items-center rounded-md border border-zinc-200 overflow-hidden">
								<img src={data.image} alt={data.title} />
							</figure>
							<div className="flex flex-col gap-3">
								<div className="col-span-2 font-[500]">{data.title}</div>
								<div className="flex items-center gap-2">
									<div className="col-span-1 text-right p-1 text-white bg-[#00bfc5] text-sm mr-5">
										{Math.abs(data.discount) > 0
											? "- " + Math.abs(data.discount) + "%"
											: ""}
									</div>
									<div className="col-span-1 line-through text-right text-zinc-500 text-sm">
										{Math.abs(data.discount) > 0
											? ConvertVNDString(data.price)
											: ""}
									</div>
									<div className="col-span-1 text-right font-[500] text-lg">
										{ConvertVNDString(calcDiscount)}đ
									</div>
								</div>
							</div>
						</div>
						<Rating
							value={rating}
							onChange={(
								event: SyntheticEvent<Element, Event>,
								newValue: number | null
							) => {
								setRating(newValue as any);
							}}
						/>
						<textarea
							onChange={(e) => setContent(e.target.value)}
							className="h-32 ring-0 border-zinc-300 rounded-md text-sm"
							placeholder="Nhập nội dung"
						></textarea>
						<button
							onClick={() => submit()}
							type="button"
							className="w-full rounded-md  border text-center text-sm py-2 cursor-pointer hover:bg-black hover:text-white"
						>
							Đánh giá
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
