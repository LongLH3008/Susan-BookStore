import { userState } from "@/common/hooks/useAuth";
import { CustomDrawerSidebar } from "@/common/ui/CustomDrawerSidebar";
import { Drawer } from "flowbite-react";
import { useState } from "react";
import { Link } from "react-router-dom";

type Props = {};

const ResponsiveSidebar = (props: Props) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleClose = () => setIsOpen(false);
	const { id } = userState();

	return (
		<>
			<span
				onClick={() => setIsOpen(true)}
				className="min-[1000px]:hidden max-[1000px]:block cursor-pointer relative *:text-[22px] *:text-zinc-800"
			>
				<i className="fa-solid fa-bars absolute top-1/2 -translate-y-1/2 right-0"></i>
			</span>
			<Drawer theme={CustomDrawerSidebar} open={isOpen} onClose={handleClose} position="right">
				<Drawer.Items>
					<div className="h-[68px] flex">
						<button
							onClick={() => setIsOpen(false)}
							className="w-[15%] text-3xl h-full bg-zinc-800 text-white"
						>
							<i className="fa-solid fa-xmark"></i>
						</button>
						<div className="w-[85%] flex justify-between items-center h-full bg-[#e6e6e6] text-[#707070] p-5 *:bg-transparent ">
							<input
								type="text"
								className="outline-none ring-0 border-none"
								placeholder="Tìm kiếm ..."
							/>
							<button className="hover:bg-zinc-700 hover:text-white px-3 py-2 rounded-full">
								<i className="fa-solid fa-magnifying-glass"></i>
							</button>
						</div>
					</div>
					<div className="bg-white w-[85%] ml-[15%] h-screen">
						<div className="py-2 *:py-[0.9rem] grid *:font-semibold *:px-9">
							<Link
								className="hover:bg-zinc-700 hover:text-white"
								onClick={() => setIsOpen(false)}
								to={"/"}
							>
								Trang chủ
							</Link>
							<Link
								className="hover:bg-zinc-700 hover:text-white"
								onClick={() => setIsOpen(false)}
								to={"/cua-hang"}
								state={{ from: location.pathname }}
							>
								Cửa hàng
							</Link>
							<Link
								className="hover:bg-zinc-700 hover:text-white"
								onClick={() => setIsOpen(false)}
								to={"/tin-tuc"}
								state={{ from: location.pathname }}
							>
								Tin tức
							</Link>
							<Link
								className="hover:bg-zinc-700 hover:text-white"
								onClick={() => setIsOpen(false)}
								to={"/gioi-thieu"}
								state={{ from: location.pathname }}
							>
								Giới thiệu
							</Link>
							<Link
								className="hover:bg-zinc-700 hover:text-white"
								onClick={() => setIsOpen(false)}
								to={"/lien-he"}
								state={{ from: location.pathname }}
							>
								Liên hệ
							</Link>
						</div>
						{id ? (
							<>
								<div className="mt-2 py-2 *:py-[0.9rem] grid *:font-semibold *:px-9 border-t">
									<Link
										className="hover:bg-zinc-700 hover:text-white"
										onClick={() => setIsOpen(false)}
										to={"/don-hang"}
										state={{ from: location.pathname }}
									>
										Đơn hàng
									</Link>
									<Link
										className="hover:bg-zinc-700 hover:text-white"
										onClick={() => setIsOpen(false)}
										to={"/san-pham-yeu-thich"}
										state={{ from: location.pathname }}
									>
										Sản phẩm yêu thích
									</Link>
									<Link
										className="hover:bg-zinc-700 hover:text-white"
										onClick={() => setIsOpen(false)}
										to={"/gio-hang"}
										state={{ from: location.pathname }}
									>
										Giỏ hàng
									</Link>
								</div>
								<div className="mt-2 py-2 *:py-[0.9rem] grid *:font-semibold *:px-9 border-t">
									<Link
										className="hover:bg-zinc-700 hover:text-white"
										onClick={() => setIsOpen(false)}
										to={"/doi-mat-khau"}
										state={{ from: location.pathname }}
									>
										Đổi mật khẩu
									</Link>
									<Link
										className="hover:bg-zinc-700 hover:text-white"
										onClick={() => setIsOpen(false)}
										to={"/dang-xuat"}
										state={{ from: location.pathname }}
									>
										Đăng xuất
									</Link>
								</div>
							</>
						) : (
							<div className="mt-2 py-2 *:py-[0.9rem] grid *:font-semibold *:px-9 border-t">
								<Link
									className="hover:bg-zinc-700 hover:text-white"
									onClick={() => setIsOpen(false)}
									to={"/login"}
									state={{ from: location.pathname }}
								>
									Đăng nhập
								</Link>
								<Link
									className="hover:bg-zinc-700 hover:text-white"
									onClick={() => setIsOpen(false)}
									to={"/register"}
									state={{ from: location.pathname }}
								>
									Tạo tài khoản
								</Link>
							</div>
						)}
					</div>
				</Drawer.Items>
			</Drawer>
		</>
	);
};

export default ResponsiveSidebar;
