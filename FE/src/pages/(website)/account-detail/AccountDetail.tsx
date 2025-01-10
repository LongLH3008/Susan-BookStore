import defaultImg from "@/common/assets/img/default.png";
import { userState } from "@/common/hooks/useAuth";
import { IUser } from "@/common/interfaces/user";
import Breadcrumb from "@/components/(website)/breadcrumb/breadcrumb";
import { getUsers } from "@/services/auth.service";
import { useQuery } from "@tanstack/react-query";
import { Link, Outlet, useLocation } from "react-router-dom";

const AccountDetail = () => {
	const location = useLocation();
	const { id } = userState();

	const { data: user } = useQuery({
		queryKey: ["userAccount"],
		queryFn: async () => {
			try {
				const res = await getUsers(id);
				return res.metadata as IUser;
			} catch (error) {}
		},
	});

	const nav = [
		{ label: "Hồ sơ người dùng", href: "ho-so-nguoi-dung" },
		{ label: "Đơn hàng", href: "don-hang" },
		{ label: "Sổ địa chỉ", href: "so-dia-chi" },
		{ label: "Đổi mật khẩu", href: "doi-mat-khau" },
	];

	return (
		<>
			<Breadcrumb title="Thông tin tài khoản" />
			<section className="min-[320px]:px-[5%] bg-zinc-100 xl:px-[11.5%] 2xl:px-[17.5%] gap-[30px] py-5">
				<div className="grid grid-cols-10 gap-5 w-full h-[70dvh]">
					<div className="col-span-2 flex flex-col gap-5">
						<div className="h-[25dvh] bg-white shadow-sm rounded-md flex flex-col gap-3 justify-center items-center">
							<figure className="size-20 rounded-full border overflow-hidden grid place-items-center *:w-full *:h-full *:object-cover">
								{user?.user_avatar !== "" ? (
									<img src={user?.user_avatar} alt="" />
								) : (
									<img src={defaultImg} className="opacity-50 scale-75" alt="" />
								)}
							</figure>
							<span className="text-[12px] text-zinc-500">{user?.user_email}</span>
						</div>
						<div className="h-fit bg-white shadow-sm rounded-md flex flex-col p-2 *:p-2 *:px-4 *:text-wrap text-sm text-zinc-500">
							{nav.map((item: any, index: number) => (
								<Link
									key={index}
									className={`${
										location.pathname.includes(item.href)
											? "bg-zinc-100"
											: "hover:bg-zinc-100"
									}`}
									to={item.href}
								>
									{item.label}
								</Link>
							))}
						</div>
					</div>
					<div className="col-span-8 bg-white shadow-sm rounded-md p-5">
						<Outlet />
					</div>
				</div>
			</section>
		</>
	);
};

export default AccountDetail;
