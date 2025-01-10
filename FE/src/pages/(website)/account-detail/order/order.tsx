import { userState } from "@/common/hooks/useAuth";
import { getOrderByUser } from "@/services/order.service";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import OrderItem from "./orderItem";

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
			<div className="flex flex-col w-full col-span-2">
				<h3 className="font-semibold md:text-xl mb-5">
					Danh sách đơn hàng ({orders?.metadata?.data.length})
				</h3>
				<div className="h-[70dvh] relative overflow-y-scroll flex flex-col gap-4 pb-5 pr-3">
					{orders && orders?.metadata?.data.length > 0 ? (
						orders?.metadata.data.map((item: any, index: number) => (
							<OrderItem key={index} item={item} />
						))
					) : (
						<div className="h-[50dvh] flex items-center justify-center text-zinc-400 text-sm">
							Chưa có đơn hàng nào được tạo
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default Order;
