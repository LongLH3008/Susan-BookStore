import { useToast } from "@/common/hooks/useToast";
import { ICMT } from "@/common/interfaces/comment";
import { Authentication } from "@/common/shared/authentication";
import { useFindUserById } from "@/components/findUserById";
import { formatDateTime } from "@/components/formatDate";
import { deleteCMT, updateCMT } from "@/services/comment.service";
import { Menu, MenuItem } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

interface IComment {
	userId?: string;
	rating?: number;
	comment?: string;
	_id?: string;
	createdAt?: string;
	comment_author?: string;
	comment_content?: string;
	comment_likes?: number;
	likedBy?: string[];
	comment_createdAt?: string;
	comment_updatedAt?: string;
}
interface CommentProps {
	cmt: IComment;
	refetch?: () => void;
	idBlog?: string;
}
const Comment = ({ cmt, refetch = () => {}, idBlog }: CommentProps) => {
	const payload = Authentication();
	const { toast } = useToast();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [edit, setEdit] = useState<boolean>(false);
	const [comment, setComment] = useState<string>("");
	const [open, setOpen] = useState(false);
	const openMenu = Boolean(anchorEl);

	const getCommentContent = () => cmt?.comment || cmt?.comment_content;
	const getCreatedAt = () => cmt?.createdAt || cmt?.comment_createdAt;
	const getUserAvatar = () =>
		user?.user_avatar || "https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg";

	const { user } = useFindUserById(cmt?.userId || cmt?.comment_author);

	const { mutate } = useMutation({
		mutationFn: ({
			actionType,
			idBlog,
			idCMT,
			cmt,
		}: {
			actionType: "update" | "delete";
			idBlog: string;
			idCMT: string;
			cmt: ICMT;
		}) => {
			if (actionType === "update") {
				return updateCMT(idBlog, idCMT, cmt);
			}
			if (actionType === "delete") {
				return deleteCMT(idBlog, idCMT);
			}
		},
		onSuccess: (data: any, variables: any) => {
			if (variables.actionType === "update") {
				toast({
					variant: data.status,
					content: `Cập nhật Bình luận thành công`,
				});
			} else if (variables.actionType === "delete") {
				toast({
					variant: data.status,
					content: `Xóa Bình luận thành công`,
				});
			}
			refetch();
		},
		onError: (err: any) => {
			const message = "Lỗi khi thực hiện hành động: ";
			toast({
				variant: err.status,
				content: message + err.response?.data?.error || err.message,
			});
		},
	});

	const handleClose = () => {
		setOpen(false);
	};
	const handleCloseMenu = () => {
		setAnchorEl(null);
	};
	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(e.currentTarget);
		console.log("anchorEl", anchorEl);
	};
	const HandlerLike = () => {
		if (!payload) {
			setOpen(true);
		} else {
			console.log("payload", payload);
		}
	};
	const handleUpdateCMT = (idCMT: string, idUser: string, like: number) => {
		if (idBlog) {
			const cmt = {
				comment_author: idUser,
				comment_content: comment,
				comment_likes: like,
			};
			mutate({
				actionType: "update",
				idBlog,
				idCMT,
				cmt,
			});
		}
	};
	const handleDeleteCMT = (idCMT: string) => {
		if (idBlog) {
			mutate({
				actionType: "delete",
				idBlog,
				idCMT,
				cmt: {} as ICMT,
			});
		} else {
			toast({
				variant: 200,
				content: "Lỗi k nhận k lấy đc id Blog",
			});
		}
	};
	return (
		<>
			<div key={cmt?._id} className="flex my-5">
				<img src={getUserAvatar()} alt={user?.user_name} className="w-12 h-12 rounded-full" />
				<div className="ms-4">
					<div className="flex items-start group">
						<div className="p-3 bg-gray-200 rounded-xl w-fit max-w-[400px] ">
							<h4 className="text-gray-900 font-bold">{user?.user_name}</h4>
							{edit ? (
								<div className="">
									<input
										type="text"
										onChange={(e) => setComment(e.target.value)}
										placeholder="Viết bình luận "
										defaultValue={getCommentContent()}
										className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-gray-500 focus:border-gray-500 "
									/>
									<div className="flex justify-end *:ms-3">
										<button
											onClick={() => {
												setEdit(false);
												handleUpdateCMT(
													cmt._id || "",
													cmt?.comment_author || "",
													cmt?.comment_likes || 0
												);
											}}
											className="text-gray-500 hover:text-green-700"
										>
											<i className="fa-solid fa-check"></i>
										</button>
										<button
											onClick={() => setEdit(false)}
											className="text-gray-500 hover:text-red-700"
										>
											<i className="fa-solid fa-x"></i>
										</button>
									</div>
								</div>
							) : (
								<p className="text-gray-700">{getCommentContent()}</p>
							)}
						</div>
						<div className="">
							<button
								onClick={handleClick}
								aria-controls={openMenu ? "basic-menu" : undefined}
								aria-haspopup="true"
								aria-expanded={openMenu ? "true" : undefined}
								className={`items-center justify-center ms-2 w-7 h-7 text-sm hover:bg-gray-100 rounded-full ${
									payload?.id === cmt?.comment_author ? "flex" : "hidden"
								}`}
							>
								<i className="fa-solid fa-ellipsis"></i>
							</button>
							<Menu
								id="basic-menu"
								anchorEl={anchorEl}
								open={openMenu}
								onClose={handleCloseMenu}
								MenuListProps={{
									"aria-labelledby": "basic-button",
								}}
							>
								<MenuItem
									onClick={() => {
										setEdit(true);
										setAnchorEl(null);
									}}
								>
									Chỉnh sửa
								</MenuItem>
								<MenuItem
									onClick={() => {
										setAnchorEl(null);
										handleDeleteCMT(cmt._id || "");
									}}
								>
									Xóa
								</MenuItem>
							</Menu>
						</div>
					</div>

					<div className="flex items-center justify-between mt-2">
						<div className="flex items-center ">
							<span className="text-gray-400 text-sm">
								{formatDateTime(getCreatedAt(), "dateTime")}
							</span>
						</div>
						{cmt.comment_likes && cmt.comment_likes > 0 ? (
							<div className="ms-3 flex items-end">
								<p>{cmt.comment_likes == 1 || ""}</p>
								<div className="w-6 h-6 flex justify-center items-center rounded-full text-white bg-blue-700">
									<i className="fa-solid fa-thumbs-up"></i>
								</div>
							</div>
						) : (
							""
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default Comment;
