import { StatiscalProvider } from "@/common/hooks/useStatistical";
import { getMondayAndSunday } from "@/common/shared/getWeekTime";
import { ConvertVNDString } from "@/common/shared/round-number";
import TopSellingBooksChart from "@/components/(dashboard)/Charts/PieChart";
import TopUsersChart from "@/components/(dashboard)/Charts/topUserChart";
import { filterByDayAndMonth } from "@/services/statistical.service";
import { useEffect, useState } from "react";
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
	const [dataTotal, setDataTotal] = useState<Total>({ totalOrders: 0, totalRevenue: 0, totalSold: 0 });

	useEffect(() => {
		(async () => {
			const { monday, sunday } = getMondayAndSunday();
			const res = await filterByDayAndMonth({ startDate: monday, endDate: sunday });
			const { totalOrders, totalRevenue, totalSold } = res?.metadata;
			setDataTotal({ totalOrders, totalRevenue, totalSold });
		})();
	}, []);

	return (
		<div className="p-0  h-auto dark:bg-gray-800">
			<div className="grid grid-cols-7 gap-10">
				<div className="col-span-7 flex justify-end items-center rounded-md w-full mb-3">
					<ul className="w-fit gap-2 rounded-md flex items-center *:min-w-52">
						<div className="flex flex-col gap-1 rounded-md shadow-md bg-white p-3 text-right">
							<label className="text-sm text-wrap leading-4 text-left gap-3 flex items-center">
								<span className="p-2 rounded-md text-white bg-black w-fit">
									<GrMoney />
								</span>
								Tổng doanh thu <br /> tuần này
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
								Tổng đơn hàng <br /> tuần này
							</label>
							<span className="text-2xl font-[500]">{dataTotal.totalOrders}</span>
						</div>
						<div className="flex flex-col gap-1 rounded-md shadow-md bg-white p-3 text-right">
							<label className="text-sm text-wrap leading-4 tracking-wide text-left gap-3 flex items-center">
								<span className="p-2 rounded-md text-white bg-black w-fit">
									<PiBooksFill />
								</span>
								Số lượng sách đã bán <br /> tuần này
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
