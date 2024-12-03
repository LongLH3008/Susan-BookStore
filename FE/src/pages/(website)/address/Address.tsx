import { userState } from "@/common/hooks/useAuth";
import Breadcrumb from "@/components/(website)/breadcrumb/breadcrumb";
import { getUserAddress } from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";

const Address = () => {
	const { id } = userState();
	const { data } = useQuery({
		queryKey: ["address"],
		queryFn: async () => await getUserAddress({ user_id: id }),
	});

	return (
		<>
			<Breadcrumb title="Sổ địa chỉ" />
			<section className="min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%] grid grid-cols-1 md:grid-cols-2 gap-[30px] pt-[30px] mb-[80px] max-[968px]:pt-[100px] min-[968px]:mb-[100px]">
				<div className="flex flex-col w-full col-span-2">
					<h3 className="font-semibold text-2xl mb-5">
						Danh sách địa chỉ ({data?.metadata?.data.length})
					</h3>
					<div className="h-[70dvh] relative overflow-y-scroll flex flex-col gap-4 pb-5 pr-3">
						{data && data?.metadata?.data.length > 0 ? (
							data?.metadata.data.map((item: any, index: number) => (
								<div className="rounded-md p-5 flex"></div>
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
