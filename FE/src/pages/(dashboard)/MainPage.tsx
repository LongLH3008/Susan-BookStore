import { StatiticsContext } from "@/common/context/ContextStatitics";
import { StatiscalProvider } from "@/common/hooks/useStatistical";
import { ConvertVNDString } from "@/common/shared/round-number";
import TopSellingBooksChart from "@/components/(dashboard)/Charts/PieChart";
import TopUsersChart from "@/components/(dashboard)/Charts/topUserChart";
import { useContext } from "react";
import { GrMoney } from "react-icons/gr";
import { PiBooksFill } from "react-icons/pi";
import { RiBillLine } from "react-icons/ri";
import ColumnChart from "../../components/(dashboard)/Charts/ColumnChart";

type Total = {
	totalOrders: number;
	totalRevenue: number;
	totalSold: number;
};

export default function MainPage() {
	const { filter, setThisWeek, setLastWeek, dataTotal, setTimeWeek, time, setMonth } = useContext(StatiticsContext);

	return (
		<div className="p-0  h-auto dark:bg-gray-800">
			<div className="grid grid-cols-7 gap-5">
				<div className="col-span-7 flex justify-betwween items-start rounded-md w-full mb-3">
					<div className="w-full flex items-start h-full">
						<div className="bg-white flex items-center gap-2 p-3 rounded-md">
							<div className="bg-white border group relative overflow-hidden hover:overflow-visible border-zinc-300 cursor-pointer text-[13px] flex items-center text-center justify-center w-24 h-8 rounded-md">
								<span>{filter}</span>
								<div className="absolute w-full top-[105%] rounded-md border border-zinc-300 flex flex-col left-0 h-0 opacity-0 z-10 shadow-sm bg-white group-hover:h-auto group-hover:z-[9999] group-hover:opacity-100">
									<span
										onClick={() => setThisWeek()}
										className="hover:bg-zinc-100 px-2 py-1"
									>
										Tuần này
									</span>
									<span
										onClick={() => setLastWeek()}
										className="hover:bg-zinc-100 px-2 py-1"
									>
										Tuần trước
									</span>
									<div className="relative group overflow-hidden px-2 py-1 hover:overflow-visible w-full">
										<span className="px-2 py-2 relative peer cursor-pointer">
											Tháng
										</span>
										<div className="absolute -top-1/2 left-[102%] -z-50 group-hover:z-10 group-hover:w-[200px] group-hover:h-fit w-0 h-0 bg-white shadow-sm border border-zinc-300 rounded-md grid grid-cols-4 text-zinc-500 p-2">
											{Array.from({ length: 12 }, (_, i) => (
												<div
													onClick={() => setMonth(i + 1)}
													key={i + 1}
													className="hover:bg-zinc-100 p-2 min-w-4 flex items-center justify-center rounded cursor-pointer"
												>
													{i + 1}
												</div>
											))}
										</div>
									</div>
									<div className="relative group overflow-hidden px-2 py-1 hover:overflow-visible w-full">
										<span className="px-2 py-2 relative peer cursor-pointer">
											Thời gian
										</span>
										<div className="absolute -top-1/2 left-[102%] gap-2 -z-50 group-hover:z-10 group-hover:w-[240px] group-hover:h-fit w-0 h-0 bg-white shadow-sm border border-zinc-300 rounded-md flex flex-wrap p-2">
											<div className="flex items-center w-full justify-between gap-2">
												<span className="text-wrap leading-4 text-left">
													Tuần bắt đầu từ
												</span>
												<input
													onChange={(e) => setTimeWeek(e)}
													type="date"
													className="text-sm border-zinc-300 rounded-md"
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="flex flex-col gap-1">
								<span className="text-sm">
									{new Date(time.from).toLocaleDateString("vi-VN")} -{" "}
									{new Date(time.to).toLocaleDateString("vi-VN")}
								</span>
							</div>
						</div>
					</div>
					<ul className="w-fit gap-2 rounded-md flex items-center *:min-w-52">
						<div className="flex flex-col gap-1 rounded-md shadow-md bg-white p-3 text-right">
							<label className="text-sm text-wrap leading-4 text-left gap-3 flex items-center">
								<span className="p-2 rounded-md text-white bg-black w-fit">
									<GrMoney />
								</span>
								Tổng doanh thu
							</label>
							<span className="text-2xl font-[500]">
								{ConvertVNDString(dataTotal.totalRevenue)}đ
							</span>
						</div>
						<div className="flex flex-col gap-1 rounded-md shadow-md bg-white p-3 text-right">
							<label className="text-sm text-wrap leading-4 text-left gap-3 flex items-center">
								<span className="p-2 rounded-md text-white bg-black w-fit">
									<RiBillLine />
								</span>
								Tổng đơn hàng
							</label>
							<span className="text-2xl font-[500]">{dataTotal.totalOrders}</span>
						</div>
						<div className="flex flex-col gap-1 rounded-md shadow-md bg-white p-3 text-right">
							<label className="text-sm text-wrap leading-4 tracking-wide text-left gap-3 flex items-center">
								<span className="p-2 rounded-md text-white bg-black w-fit">
									<PiBooksFill />
								</span>
								Số lượng sách đã bán
							</label>
							<span className="text-2xl font-[500] tracking-wide">
								{dataTotal.totalSold}
							</span>
						</div>
					</ul>
				</div>
				<div className="col-span-4">
					<ColumnChart />
				</div>
				<div className="col-span-3 flex flex-col gap-2">
					<StatiscalProvider>
						<TopSellingBooksChart />
						<TopUsersChart />
					</StatiscalProvider>
				</div>
			</div>
		</div>
	);
}
