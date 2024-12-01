import * as icon from "@/common/assets/icon";
import { userState } from "@/common/hooks/useAuth";
import { searchOrderByTrackingNumber } from "@/services/order.service";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";

const CheckoutSuccess = () => {
	const { code } = useParams();
	const { id } = userState();
	const nav = useNavigate();

	const { data: order } = useQuery({
		queryKey: ["checkoutSuccess"],
		queryFn: async () => {
			try {
				const result = await searchOrderByTrackingNumber(code as string);
				if (result.metadata.data.length == 0) nav("/");
				return result;
			} catch (error) {
				nav("/");
			}
		},
	});

	console.log(order);

	return (
		<>
			<nav className="min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%] flex justify-between items-center h-[67px] border-b border-zinc-300">
				<Link to={"/"}>
					<p className="text-[21px] font-semibold">Susan</p>
				</Link>
				<Link
					to={"/gio-hang"}
					state={{ from: location.pathname }}
					className="flex items-center gap-2 font-semibold"
				>
					Quay lại giỏ hàng <img className="w-[25px]" src={icon.cartCheckout} alt="" />
				</Link>
			</nav>
			<div className="flex flex-col gap-10 w-full relative h-[90dvh] justify-center items-center">
				<div className="flex flex-col items-center gap-1">
					<h3 className="font-[600] italic max-md:text-2xl text-4xl">
						<i className="mr-1 fa-regular fa-circle-check"></i> Cảm ơn đã đặt hàng !
					</h3>
					<span>
						Đơn hàng của bạn đã được tạo thành công <i className="ml-1 fa-solid fa-check"></i>
					</span>
					<span>
						Mã đơn hàng :{" "}
						<a href="" className="border-b pb-[1px] border-[#000]">
							{code}
						</a>
					</span>
				</div>

				<div className="flex items-center justify-center gap-2 max-md:flex-col max-md:*:w-full">
					<Link
						to="/cua-hang"
						className="bg-black text-nowrap text-white px-[25px] py-[10px] text-[14px] hover:bg-zinc-700"
					>
						Tiếp tục mua hàng
					</Link>
					<Link
						to="/gio-hang"
						className="bg-black text-nowrap text-white px-[25px] py-[10px] text-[14px] hover:bg-zinc-700"
					>
						Giỏ hàng
					</Link>
					{id ? (
						<Link
							to="/don-hang"
							className="bg-black text-nowrap text-white px-[25px] py-[10px] text-[14px] hover:bg-zinc-700"
						>
							Lịch sử mua hàng
						</Link>
					) : (
						<Link
							to="/don-hang"
							className="bg-black text-nowrap text-white px-[25px] py-[10px] text-[14px] hover:bg-zinc-700"
						>
							Trở về trang chủ
						</Link>
					)}
				</div>
			</div>
		</>
	);
};

export default CheckoutSuccess;
