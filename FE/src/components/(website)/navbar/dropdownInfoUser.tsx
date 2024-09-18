import * as icon from "@/common/assets/icon";
import { userState } from "@/common/hooks/useAuth";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

type Props = {};

const DropdownInfoUser = (props: Props) => {
	const location = useLocation();
	const { id } = userState();
	const [open, setOpen] = useState<boolean>(false);

	return (
		<div className="relative">
			<span
				onMouseEnter={() => setOpen(true)}
				onMouseLeave={() => setOpen(false)}
				className="max-[1000px]:hidden h-full flex items-center p-1"
				id="infoUserButton"
				data-dropdown-toggle="dropdown_infoUser"
			>
				<img className="w-12" src={icon.infoUser} alt="" />
			</span>
			{open && (
				<div
					onMouseEnter={() => setOpen(true)}
					onMouseLeave={() => setOpen(false)}
					className={`w-[280px] -right-1/4 translate-x-1/4  absolute top-[110%] h-fit duration-200 shadow-lg bg-white p-[35px]`}
				>
					<div className="font-semibold uppercase text-[12px] pb-3 border-b border-zinc-400 text-zinc-800">
						Tài khoản
					</div>
					{id ? (
						<div className="flex flex-col *:p-3 pt-2">
							<Link
								to="/don-hang"
								state={{ from: location.pathname }}
								className="text-[12px] hover:bg-[rgba(0,0,0,0.05)]"
							>
								Đơn hàng
							</Link>
							<Link
								to="/san-pham-yeu-thich"
								state={{ from: location.pathname }}
								className="text-[12px] hover:bg-[rgba(0,0,0,0.05)]"
							>
								Sản phẩm yêu thích
							</Link>
							<Link
								to="/gio-hang"
								state={{ from: location.pathname }}
								className="text-[12px] hover:bg-[rgba(0,0,0,0.05)]"
							>
								Giỏ hàng
							</Link>
							<div className="font-semibold uppercase text-[12px] pb-3 border-b border-zinc-400 text-zinc-800"></div>
							<Link
								to="/doi-mat-khau"
								state={{ from: location.pathname }}
								className="text-[12px] hover:bg-[rgba(0,0,0,0.05)]"
							>
								Đổi mật khẩu
							</Link>
							<Link
								to="/dang-xuat"
								state={{ from: location.pathname }}
								className="text-[12px] hover:bg-[rgba(0,0,0,0.05)]"
							>
								Đăng xuất
							</Link>
						</div>
					) : (
						<div
							className="flex flex-col *:p-3 pt-2"
							onMouseEnter={() => setOpen(true)}
							onMouseLeave={() => setOpen(false)}
						>
							<Link
								to="/dang-nhap"
								state={{ from: location.pathname }}
								className="text-[12px] hover:bg-[rgba(0,0,0,0.05)]"
							>
								Đăng nhập
							</Link>
							<Link
								to="/dang-ky"
								state={{ from: location.pathname }}
								className="text-[12px] hover:bg-[rgba(0,0,0,0.05)]"
							>
								Tạo tài khoản
							</Link>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default DropdownInfoUser;
