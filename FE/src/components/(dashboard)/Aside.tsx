import { Logo } from "@/common/assets/img";
import { useAuth, userState } from "@/common/hooks/useAuth";
import { useToast } from "@/common/hooks/useToast";
import { ToastVariant } from "@/common/interfaces/toast";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Aside = (props: any) => {
	const navigate = useNavigate();
	const { toast, close } = useToast();
	const { resetState } = userState();
	const [resizeAside, setResizeAside] = useState(false);

	const { onSubmit } = useAuth({
		action: "LOGOUT",
		onSuccess: () => {
			resetState();
			close();
			navigate("/dang-nhap");
		},
		onError: (err: any) => console.log(err),
	});

	const Logout = () => {
		toast({
			variant: ToastVariant.CONFIRM,
			content: "Bạn muốn đăng xuất",
			confirm: onSubmit,
			confirmTextButton: "Đồng ý",
		});
	};

	return (
		<div
			className={`duration-300 relative ease-in-out transition-all  flex flex-col justify-between gap-3 p-5 h-screen px-3 pb-4 text-[#535353] bg-white dark:bg-gray-800
			${resizeAside ? "w-20" : "w-[20%]"}`}
		>
			<ul className="font-medium *:overflow-hidden">
				<li
					className={`flex items-center mb-10 justify-${
						resizeAside
							? "center rounded-md shadow-lg border border-black duration-200"
							: "start"
					} w-full`}
				>
					<img className="p-5 duration-300 min-w-[80px] w-[70%] object-cover" src={Logo} alt="" />
				</li>
				<li className="">
					<Link to={""}>
						<div className="flex items-center h-[50px] px-5 relative overflow-hidden hover:bg-zinc-200 rounded-md">
							<i className="fa-solid fa-chart-simple"></i>
							<span
								className={`absolute whitespace-nowrap duration-300 top-1/2 -translate-y-1/2 left-14 ease-in-out ${
									resizeAside
										? "translate-x-[150%] opacity-0"
										: "translate-x-0 opacity-1"
								}`}
							>
								Thống kê
							</span>
						</div>
					</Link>
				</li>
				<li className="">
					<Link
						to={"/quan-tri/nguoi-dung"}
						className="flex items-center h-[50px] px-5 relative overflow-hidden hover:bg-zinc-200 rounded-md"
					>
						<i className="fa-solid fa-user"></i>
						<span
							className={`absolute whitespace-nowrap duration-700 top-1/2 -translate-y-1/2 left-14 ease-in-out ${
								resizeAside ? "translate-x-[150%] opacity-0" : "translate-x-0 opacity-1"
							}`}
						>
							Người dùng
						</span>
					</Link>
				</li>
				<li className="">
					<Link
						to={"/quan-tri/anh-quang-cao"}
						className="flex items-center h-[50px] px-5 relative overflow-hidden hover:bg-zinc-200 rounded-md"
					>
						<i className="fa-solid fa-image"></i>
						<span
							className={`absolute whitespace-nowrap duration-700 top-1/2 -translate-y-1/2 left-14 ease-in-out ${
								resizeAside ? "translate-x-[150%] opacity-0" : "translate-x-0 opacity-1"
							}`}
						>
							Ảnh quảng cáo
						</span>
					</Link>
				</li>
				<li className="">
					<Link
						to={"/quan-tri/danh-muc"}
						className="flex items-center h-[50px] px-5 relative overflow-hidden hover:bg-zinc-200 rounded-md"
					>
						<i className="w-5 fa-solid fa-layer-group"></i>
						<span
							className={`absolute whitespace-nowrap duration-700 top-1/2 -translate-y-1/2 left-14 ease-in-out ${
								resizeAside ? "translate-x-[150%] opacity-0" : "translate-x-0 opacity-1"
							}`}
						>
							Danh mục
						</span>
					</Link>
				</li>
				<li className="">
					<Link
						to={"/quan-tri/san-pham"}
						className="flex items-center h-[50px] px-5 relative overflow-hidden hover:bg-zinc-200 rounded-md"
					>
						<i className="fa-solid fa-boxes-stacked"></i>
						<span
							className={`absolute whitespace-nowrap duration-700 top-1/2 -translate-y-1/2 left-14 ease-in-out ${
								resizeAside ? "translate-x-[150%] opacity-0" : "translate-x-0 opacity-1"
							}`}
						>
							Sản phẩm
						</span>
					</Link>
				</li>
				<li className="">
					<Link
						to={"/quan-tri/ma-giam-gia"}
						className="flex items-center h-[50px] px-5 relative overflow-hidden hover:bg-zinc-200 rounded-md"
					>
						<i className="fa-solid fa-ticket"></i>
						<span
							className={`absolute whitespace-nowrap duration-700 top-1/2 -translate-y-1/2 left-14 ease-in-out ${
								resizeAside ? "translate-x-[150%] opacity-0" : "translate-x-0 opacity-1"
							}`}
						>
							Mã giảm giá
						</span>
					</Link>
				</li>
				<li className="">
					<Link
						to={"/quan-tri/don-hang"}
						className="flex items-center h-[50px] px-5 relative overflow-hidden hover:bg-zinc-200 rounded-md"
					>
						<i className="fa-solid fa-cart-shopping"></i>
						<span
							className={`absolute whitespace-nowrap duration-700 top-1/2 -translate-y-1/2 left-14 ease-in-out ${
								resizeAside ? "translate-x-[150%] opacity-0" : "translate-x-0 opacity-1"
							}`}
						>
							Đơn hàng
						</span>
					</Link>
				</li>
				<li className="">
					<Link
						to={"/quan-tri/tin-tuc"}
						className="flex items-center h-[50px] px-5 relative overflow-hidden hover:bg-zinc-200 rounded-md"
					>
						<i className="fa-solid fa-blog"></i>
						<span
							className={`absolute whitespace-nowrap duration-700 top-1/2 -translate-y-1/2 left-14 ease-in-out ${
								resizeAside ? "translate-x-[150%] opacity-0" : "translate-x-0 opacity-1"
							}`}
						>
							Tin tức
						</span>
					</Link>
				</li>
				<li className="">
					<Link
						to={"/quan-tri/binh-luan"}
						className="flex items-center h-[50px] px-5 relative overflow-hidden hover:bg-zinc-200 rounded-md"
					>
						<i className="fa-solid fa-comment"></i>
						<span
							className={`absolute whitespace-nowrap duration-700 top-1/2 -translate-y-1/2 left-14 ease-in-out ${
								resizeAside ? "translate-x-[150%] opacity-0" : "translate-x-0 opacity-1"
							}`}
						>
							Bình luận
						</span>
					</Link>
				</li>
			</ul>
			<div className="flex flex-col gap-2">
				<div
					onClick={Logout}
					className="flex items-center cursor-pointer h-[50px] px-5 relative overflow-hidden border hover:text-white hover:bg-zinc-900 border-zinc-900 rounded-md"
				>
					<i className="fa-solid fa-power-off"></i>
					<span
						className={`absolute whitespace-nowrap duration-700 top-1/2 -translate-y-1/2 left-14 ease-in-out ${
							resizeAside ? "translate-x-[150%] opacity-0" : "translate-x-0 opacity-1"
						}`}
					>
						Đăng xuất
					</span>
				</div>
				<div
					onClick={() => setResizeAside(!resizeAside)}
					className="flex items-center h-[50px] px-5 relative cursor-pointer overflow-hidden bg-[rgba(0,0,0,0.9)] rounded-lg text-white"
				>
					<i
						className={`fa-solid fa-chevron-left duration-700 ease-in-out ${
							resizeAside && "rotate-180"
						}`}
					></i>
					<span
						className={`absolute whitespace-nowrap duration-700 top-1/2 -translate-y-1/2 left-14 text-sm ease-in-out ${
							resizeAside ? "translate-x-[150%] opacity-0" : "translate-x-0 opacity-1"
						}`}
					>
						Thu nhỏ
					</span>
				</div>
			</div>
		</div>
	);
};

export default Aside;
