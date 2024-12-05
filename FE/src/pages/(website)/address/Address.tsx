import { userState } from "@/common/hooks/useAuth";
import { useToast } from "@/common/hooks/useToast";
import { ToastVariant } from "@/common/interfaces/toast";
import Breadcrumb from "@/components/(website)/breadcrumb/breadcrumb";
import { getUserAddress, removeUserAddress } from "@/services/user.service";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FaLocationDot } from "react-icons/fa6";
import { AddAddress } from "./_components/AddAddress";
import { UpdateAddress } from "./_components/UpdateAddress";

const Address = () => {
	const queryClient = useQueryClient();
	const { toast, close } = useToast();
	const { id } = userState();
	const { data } = useQuery({
		queryKey: ["userAddress"],
		queryFn: async () => await getUserAddress({ user_id: id }),
	});

	const confirmDelete = (id: string) => {
		toast({
			variant: ToastVariant.CONFIRM,
			content: "Bạn có muốn xóa địa chỉ này ?",
			confirm: async () => {
				try {
					await removeUserAddress(id);
					queryClient.invalidateQueries({ queryKey: ["userAddress"], exact: true });
					close();
				} catch (error) {}
			},
			confirmTextButton: "Đồng ý",
		});
	};

	return (
		<>
			<Breadcrumb title="Sổ địa chỉ" />
			<section className="min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%] grid grid-cols-1 md:grid-cols-2 gap-[30px] py-5">
				<div className="flex flex-col w-full col-span-2">
					<div className="flex justify-between items-center mb-5">
						<h3 className="font-semibold text-lg md:text-2xl">
							Danh sách địa chỉ ({data?.metadata?.data.length})
						</h3>
						{data?.metadata?.data && data?.metadata?.data.length < 5 && (
							<AddAddress
								trigger={
									<button
										type="button"
										className={`flex gap-1 hover:underline text-[12px] items-center border-0`}
									>
										Thêm đia chỉ
									</button>
								}
							/>
						)}
					</div>

					<div className="flex flex-col gap-4 pb-5">
						{data && data?.metadata?.data.length > 0 ? (
							data?.metadata.data.map((item: IUserAddress, index: number) => (
								<div
									key={index}
									className="rounded-md p-5 flex items-center justify-between border border-zinc-200 hover:bg-zinc-100 cursor-pointer shadow-md"
								>
									<div className="flex items-center max-w-[70%] min-w-[50%] ">
										<span className="sm:mr-4 mr-2">
											<FaLocationDot className="text-[#00bfc5]" />
										</span>
										<span className="text-wrap text-zinc-600 text-sm">
											SDT: {item.phone} <br></br> {item.address},{" "}
											{item.ward.split("/")[0].trim()},{" "}
											{item.district.split("/")[0].trim()},{" "}
											{item.province.split("/")[0].trim()}
										</span>
									</div>
									<div className="flex items-center gap-3 text-[12px]">
										<UpdateAddress
											dataAddress={item}
											trigger={
												<span className="hover:underline">
													Cập nhật
												</span>
											}
										/>
										<span
											onClick={() => confirmDelete(item._id)}
											className="hover:text-red-600 hover:underline"
										>
											Xóa
										</span>
									</div>
								</div>
							))
						) : (
							<div className="h-[50dvh] flex items-center justify-center text-zinc-400 rounded-md border-[2px] border-dashed">
								Chưa có địa chỉ nào được tạo
							</div>
						)}
					</div>
				</div>
			</section>
		</>
	);
};

export default Address;
