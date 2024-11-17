import { userState } from "@/common/hooks/useAuth";
import Breadcrumb from "@/components/(website)/breadcrumb/breadcrumb";
import { getOrderByUser } from "@/services/order.service";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import OrderItem from "./_components/orderItem";

type Props = {};

const Order = (props: Props) => {
	const [page, setPage] = useState<number>(1);

	const { id } = userState();
	const { data: orders } = useQuery({
		queryKey: ["orders_user"],
		queryFn: async () => await getOrderByUser({ userId: id, page }),
	});

	console.log(orders);

	return (
		<>
			<Breadcrumb title="Đơn hàng" />
			<section className="min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%] grid grid-cols-1 md:grid-cols-2 gap-[30px] pt-[30px] mb-[80px] max-[968px]:pt-[100px] min-[968px]:mb-[100px]">
				<div className="flex flex-col w-full col-span-2">
					<h3 className="font-semibold text-2xl mb-5">
						Danh sách đơn hàng ({orders?.metadata?.data.length})
					</h3>
					<div className="h-[70dvh] relative overflow-y-scroll flex flex-col gap-4 pb-5 pr-3">
						{orders && orders?.metadata?.data.length > 0 ? (
							orders?.metadata.data.map((item: any, index: number) => (
								<OrderItem key={index} item={item} />
							))
						) : (
							<div className="h-[50dvh] flex items-center justify-center text-zinc-400 rounded-md border-[2px] border-dashed">
								Chưa có đơn hàng nào được tạo
							</div>
						)}
					</div>
				</div>
			</section>
		</>
	);
};

export default Order;
