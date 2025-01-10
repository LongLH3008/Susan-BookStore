import { userState } from "@/common/hooks/useAuth";
import { useToast } from "@/common/hooks/useToast";
import { ICMT } from "@/common/interfaces/comment";
import { Authentication } from "@/common/shared/authentication";
import Comment from "@/components/(website)/comment/comment";
import SkeletonCMT from "@/components/(website)/Skeleton/SkeletonCMT";
import { createCMT, getCMTById } from "@/services/comment.service";
import CloseIcon from "@mui/icons-material/Close";
import NavigationIcon from "@mui/icons-material/Navigation";
import { Dialog, DialogContent, DialogTitle, Fab, IconButton } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const BlogComment = ({ idBlog, isCart }: { idBlog: string; isCart: boolean }) => {
	const [open, setOpen] = useState(false);
	const { register, handleSubmit } = useForm();
	const { toast } = useToast();
	const { id: user_id } = userState();
	const payload = Authentication();
	const { data, isLoading, isError, error, refetch } = useQuery({
		queryKey: ["Comment", idBlog],
		queryFn: async () => await getCMTById(idBlog),
		enabled: !!idBlog,
	});
	console.log("idBlog", idBlog);

	console.log("id", data);

	const { mutate } = useMutation({
		mutationFn: ({ idBlog, cmt }: { idBlog: string; cmt: ICMT }) => createCMT(idBlog, cmt),
		onSuccess: (data: any) => {
			toast({
				variant: data.status,
				content: `Thêm mới Bình luận thành công`,
			});
			refetch();
		},
		onError: (err: any) => {
			const message = "Lỗi khi thêm sản phẩm: ";
			toast({
				variant: err.status,
				content: message + err.response?.data?.error || err.message,
			});
		},
	});

	const onSubmit = (data: any) => {
		if (!payload) {
			setOpen(true);
		} else {
			const cmt = {
				comment_author: payload.id,
				comment_content: data.comment_content,
				comment_likes: 0,
			};
			mutate({ idBlog, cmt });
		}
	};
	const handleClose = () => {
		setOpen(false);
	};
	if (isError) return <div className="">Lỗi tải Bình luận : {error.message}</div>;
	return (
		<>
			<div className="mt-10 mb-24">
				<h3 className="text-xl font-semibold text-[#292929] mb-5">Bình luận</h3>
				<div className="overflow-y-auto h-[300px]">
					{isLoading ? (
						<SkeletonCMT />
					) : (
						data?.metadata?.map((cmt: ICMT) => (
							<Comment cmt={cmt} refetch={refetch} idBlog={idBlog} />
						))
					)}
				</div>
				{user_id !== "" ? (
					<div className="*:text-[13px]">
						<form onSubmit={handleSubmit(onSubmit)} className="my-5">
							<div className="flex items-center">
								<input
									type="text"
									id="message"
									className="block rounded-xl p-2.5 me-3 w-full h-auto text-sm text-gray-900 focus:ring-gray-500 focus:border-gray-100  border border-gray-300 shadow-lg"
									placeholder="Viết bình luận"
									{...register("comment_content")}
									required
								/>
								<button type="submit">
									<Fab variant="extended" size="medium" color="primary">
										<NavigationIcon sx={{ mr: 1 }} />
										Gửi
									</Fab>
								</button>
							</div>
						</form>
					</div>
				) : (
					<Link to={"/dang-nhap"} className="underline hover:text-[#00bfc5] text-sm">
						Đăng nhập để bình luận
					</Link>
				)}
			</div>
			<Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
				<DialogTitle>
					Đăng nhập để <span className="text-blue-800">bình luận</span> :3
					<IconButton
						aria-label="close"
						onClick={handleClose}
						sx={{ position: "absolute", right: 8, top: 8 }}
					>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<DialogContent dividers>
					<Link
						to={"/dang-nhap"}
						className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
					>
						Đăng nhập
					</Link>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default BlogComment;
