import { useToast } from "@/common/hooks/useToast";
import { IProduct } from "@/common/interfaces/product";
import { IReview } from "@/common/interfaces/review";
import { Authentication } from "@/common/shared/authentication";
import Comment from "@/components/(website)/comment/comment";
import SkeletonCMT from "@/components/(website)/Skeleton/SkeletonCMT";
import { createReview, getReviewByIdBook } from "@/services/review.service";
import CloseIcon from "@mui/icons-material/Close";
import { Button, Dialog, DialogActions, DialogTitle, IconButton } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";

interface NotiLogin {
	open: any;
	handleClose: any;
}

const ModalLogin = ({ open, handleClose }: NotiLogin) => {
	return (
		<>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle className="p-16" id="alert-dialog-title">
					{"Vui lòng Đăng nhập trước khi đánh giá sản phẩm :3"}
				</DialogTitle>
				<IconButton
					aria-label="close"
					onClick={handleClose}
					sx={(theme) => ({
						position: "absolute",
						right: 8,
						top: 8,
						color: theme.palette.grey[500],
					})}
				>
					<CloseIcon />
				</IconButton>

				<DialogActions>
					<Button onClick={handleClose} className="text-red-700">
						Thoát
					</Button>
					<Button>
						<Link to={"/dang-nhap"}>Đăng nhập</Link>
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

const Bookservice = ({ detailProduct, isCard }: { detailProduct: IProduct; isCard: boolean }) => {
	const [tab, setTab] = useState<string>("Description");
	const [rating, setRating] = useState<number>(3);
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [isExpanded, setIsExpanded] = useState(false);
	const payload = Authentication();

	const [writeReview, setWriteReview] = useState<boolean>(false);
	const [review, setReview] = useState<string>("");
	const {
		data: reviewIdBook,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["review"],
		queryFn: () => getReviewByIdBook(detailProduct?._id),
	});

	const { toast } = useToast();
	const handleClose = () => {
		setOpenModal(false);
	};
	const { mutate } = useMutation({
		mutationFn: ({ bookId, newReview }: { bookId: string; newReview: IReview }) =>
			createReview(bookId, newReview),
		onSuccess: (data: any) => {
			// navigate(-1);
			toast({
				variant: data.status,
				content: `Thêm đánh giá thành công`,
			});
			refetch();
			setRating(3);
			setReview("");
		},
		onError: (err: any) => {
			const messages = `Lỗi khi thêm đánh giá: `;
			toast({
				variant: err.status,
				content: messages + (err.response?.data || err.message),
			});
		},
	});
	// Hàm xử lý khi form được submit
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!payload) {
			setOpenModal(true);
		} else {
			const newReview = {
				userId: payload.id,
				rating: rating,
				comment: review,
			};
			const bookId = detailProduct?._id;
			console.log("bookId", bookId);

			mutate({ bookId, newReview });
		}

		// console.log("Review submitted:", review);
	};
	// console.log("rating", rating);

	return (
		<>
			<ModalLogin open={openModal} handleClose={handleClose} />
			<hr className="w-full h-[1px] mx-auto my-10 bg-gray-400 border-0 rounded md:my-10"></hr>
			<div className="my-24">
				<div className=" flex justify-center">
					<button
						onClick={() => setTab("Description")}
						className={`${
							tab == "Description" ? "text-gray-900" : "text-gray-300"
						} font-bold  text-xl px-4 hover:text-gray-900`}
					>
						Mô Tả
					</button>
					<button
						onClick={() => setTab("Reviews")}
						className={`${
							tab == "Reviews" ? "text-gray-900" : "text-gray-300"
						} font-bold  text-xl px-4 hover:text-gray-900`}
					>
						Đánh giá
					</button>
				</div>
				<div className=" my-14">
					{/* Description */}
					<div className={`${tab !== "Description" ? "hidden" : ""} text-[#646464] leading-loose `}>
						<p className={`${!isExpanded && "overflow-hidden text-ellipsis line-clamp-4"}`}>
							{detailProduct?.description}
						</p>
						<span
							onClick={() => setIsExpanded(true)}
							className={`${
								isExpanded ? "hidden" : ""
							} font-bold hover:underline cursor-pointer`}
						>
							Xem thêm
						</span>
						<span
							onClick={() => setIsExpanded(false)}
							className={`${
								!isExpanded ? "hidden" : ""
							} font-bold hover:underline cursor-pointer`}
						>
							Thu gọn
						</span>
					</div>
					{/* Reviews */}
					<div className={`${tab !== "Reviews" ? "hidden" : ""}`}>
						{/* Bài review */}
						{!isLoading ? (
							<div className="">
								<div className="max-h-[400px] overflow-y-scroll">
									<h4 className="text-xl font-semibold mb-5">
										{reviewIdBook?.metadata?.totalReviews} Đánh giá
									</h4>
									{reviewIdBook?.metadata?.reviews.length === 0 ? (
										<p className="text-zinc-500 text-sm">
											Chưa có đánh giá nào
										</p>
									) : (
										reviewIdBook?.metadata?.reviews.map((review: IReview) => (
											<Comment cmt={review} />
										))
									)}
								</div>
							</div>
						) : (
							<SkeletonCMT />
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default Bookservice;
