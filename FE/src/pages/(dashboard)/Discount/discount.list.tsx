import { useToast } from "@/common/hooks/useToast";
import { ToastVariant } from "@/common/interfaces/toast";
import { IVoucher } from "@/common/interfaces/voucher";
import { getAllVoucher, voucherService } from "@/services/voucher.service";
import { useQuery } from "@tanstack/react-query";
import { FiEdit } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
type Props = {};
const DiscountList = (props: Props) => {
	const { toast, close } = useToast();

	const { data }: any = useQuery({
		queryKey: ["voucher_list"],
		queryFn: () => getAllVoucher(),
	});

	const { onAction: remove } = voucherService({
		action: "REMOVE",
		onSuccess: () => {
			close();
			setTimeout(() => {
				toast({ variant: ToastVariant.SUCCESS, content: "Xóa thành công" });
			}, 300);
		},
		onError: (err: any) => toast({ variant: err.status, content: err.message }),
	});

	const removeVoucher = (code: string) => {
		toast({
			variant: ToastVariant.CONFIRM,
			content: `Xác nhận xóa Voucher [ ${code} ] ?`,
			confirmTextButton: "Xóa",
			confirm: () => remove(code),
		});
	};

	return (
		<div className="text-zinc-700 h-full flex flex-col justify-between">
			<div className="rounded-lg shadow-sm bg-white p-5 flex justify-between items-center">
				<div className="flex items-center gap-3">
					<i className="fa-solid fa-ticket"></i>
					<h2 className={`text-xl font-[500]`}>Mã giảm giá</h2>
				</div>
				<Link
					to={"/quan-tri/ma-giam-gia/them-moi"}
					className="size-10 bg-zinc-900 hover:bg-[#00bfc5] grid place-items-center text-white rounded-md text-2xl hover:scale-110 duration-200"
				>
					<IoMdAdd />
				</Link>
			</div>
			<div className="flex flex-col gap-5">
				<div className="bg-white p-3 pt-0 rounded-md shadow-md overflow-y-scroll h-[55dvh]">
					<table className="table-fixed relative w-full text-sm">
						<thead className="sticky top-0 left-0 bg-white shadow-sm py-2">
							<tr className="border-b *:p-2 *:py-5 *:text-left *:font-[500] text-zinc-500">
								<th className="w-[5%]">STT</th>
								<th className="w-[10%]">Mã</th>
								<th className="w-[10%]">Loại</th>
								<th>Áp dụng</th>
								<th>Số lượng</th>
								<th>Đã sử dụng</th>
								<th className="w-[10%]">Ngày bắt đầu</th>
								<th className="w-[10%]">Ngày kết thúc</th>
								<th className="w-[10%]">Trạng thái</th>
								<th className="w-[10%]">Hành động</th>
							</tr>
						</thead>
						<tbody className="text-zinc-500 w-full">
							{data?.metadata.discounts.length > 0 ? (
								data?.metadata.discounts.map((item: IVoucher, index: number) => (
									<tr
										key={index}
										className="border-b *:p-2 *:py-5 *:text-left hover:bg-zinc-50"
									>
										<td>{index + 1}</td>
										<td>Malcolm</td>
										<td>abc</td>
										<td>all</td>
										<td>22</td>
										<td>12</td>
										<td>30/09/2024</td>
										<td>30/09/2024</td>
										<td>hoạt động</td>
										<td className="flex items-center gap-2">
											<span className="size-10 border text-lg text-zinc-400 hover:border-[#00bfc5] hover:text-[#00bfc5] cursor-pointer font-light grid place-content-center">
												<FiEdit />
											</span>
											<span
												onClick={() =>
													removeVoucher(item.discount_code)
												}
												className="size-10 border text-2xl text-zinc-400 hover:border-red-500 hover:text-red-500 cursor-pointer font-light grid place-content-center"
											>
												<MdDeleteOutline />
											</span>
										</td>
									</tr>
								))
							) : (
								<tr className="w-full h-full">
									<td colSpan={10}>
										<div className="h-[45dvh] flex justify-center items-center">
											Chưa có dữ liệu !
										</div>
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
				<div className="flex justify-end *:size-8 *:grid *:place-items-center text-zinc-400 *:bg-white *:rounded-md gap-2 *:shadow-md *:duration-200 *:ease-in-out *:cursor-pointer text-sm">
					<span>1</span>
					<span>1</span>
					<span>1</span>
				</div>
			</div>
		</div>
	);
};

export default DiscountList;
