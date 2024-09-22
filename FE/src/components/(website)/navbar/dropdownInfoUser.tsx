import * as icon from "@/common/assets/icon";
import { useAuth, userState } from "@/common/hooks/useAuth";
import { useToast } from "@/common/hooks/useToast";
import { ToastVariant } from "@/common/interfaces/toast";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

type Props = {};

const DropdownInfoUser = (props: Props) => {
	const location = useLocation();
	const { toast, close } = useToast();
	const navigate = useNavigate();
	const { resetState } = userState();

	const { id } = userState();
	const [open, setOpen] = useState<boolean>(false);

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
						<div className="flex flex-col gap-1 pt-1">
							<Link
								to="/don-hang"
								state={{ from: location.pathname }}
								className="text-[12px] p-3 hover:bg-[rgba(0,0,0,0.05)]"
							>
								Đơn hàng
							</Link>
							<Link
								to="/san-pham-yeu-thich"
								state={{ from: location.pathname }}
								className="text-[12px] p-3 hover:bg-[rgba(0,0,0,0.05)]"
							>
								Sản phẩm yêu thích
							</Link>
							<Link
								to="/gio-hang"
								state={{ from: location.pathname }}
								className="text-[12px] p-3 hover:bg-[rgba(0,0,0,0.05)]"
							>
								Giỏ hàng
							</Link>
							<div className="font-semibold h-1  border-b border-zinc-400 text-zinc-800"></div>
							<Link
								to="/doi-mat-khau"
								state={{ from: location.pathname }}
								className="text-[12px] p-3 hover:bg-[rgba(0,0,0,0.05)]"
							>
								Đổi mật khẩu
							</Link>
							<div
								onClick={() => Logout()}
								className="text-[12px] p-3 hover:bg-[rgba(0,0,0,0.05)]"
							>
								Đăng xuất
							</div>
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
								className="text-[12px] p-3 hover:bg-[rgba(0,0,0,0.05)]"
							>
								Đăng nhập
							</Link>
							<Link
								to="/dang-ky"
								state={{ from: location.pathname }}
								className="text-[12px] p-3 hover:bg-[rgba(0,0,0,0.05)]"
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
