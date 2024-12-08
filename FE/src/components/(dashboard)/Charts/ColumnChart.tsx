import { getMondayAndSunday, getTimeMonth } from "@/common/shared/getWeekTime";
import { filterByDay, filterByDayAndMonth } from "@/services/statistical.service";
import ApexCharts from "apexcharts";
import { useEffect, useRef, useState } from "react";
import { BsBarChartLine } from "react-icons/bs";

type Total = {
	totalOrders: number;
	totalRevenue: number;
	totalSold: number;
};

interface Weeks extends Total {
	Week: string;
}

interface Days extends Total {
	Day: string;
}

const ColumnChart = () => {
	const { monday, sunday } = getMondayAndSunday();
	const [dataChart, setDataChart] = useState<(Weeks | Days)[]>([]);
	const [time, setTime] = useState<{ from: string; to: string }>({ from: monday, to: sunday });
	const [filter, setFilter] = useState<string>("Tuần này");
	const [dataTotal, setDataTotal] = useState<Total>({ totalOrders: 0, totalRevenue: 0, totalSold: 0 });

	const weekDays = ["Thứ hai", "Thứ ba", "Thứ bốn", "Thứ năm", "Thứ sáu", "Thứ bảy", "Chủ nhật"];

	useEffect(() => {
		(async () => {
			if (filter.includes("Tuần")) {
				const res = await filterByDay({ startDate: monday, endDate: sunday });
				const { totalOrders, totalRevenue, totalSold } = res?.metadata;
				setDataChart(res.metadata.dataDays);
				setDataTotal({ totalOrders, totalRevenue, totalSold });
			} else {
				const res = await filterByDayAndMonth({ startDate: monday, endDate: sunday });
				const { totalOrders, totalRevenue, totalSold } = res?.metadata;
				setDataChart(res.metadata.dataWeeks);
				setDataTotal({ totalOrders, totalRevenue, totalSold });
			}
		})();
	}, [time, filter]);

	const totalOrders = filter.includes("Tuần")
		? dataChart?.map((item: any) => ({
				x: `${weekDays[item.Day]}`,
				y: item.totalOrders,
		  }))
		: dataChart?.map((item: any) => ({
				x: `Tuần ${item.Week}`,
				y: item.totalOrders,
		  }));

	const totalRevenue = filter.includes("Tuần")
		? dataChart?.map((item: any) => ({
				x: `${weekDays[item.Day]}`,
				y: item.totalRevenue,
		  }))
		: dataChart?.map((item: any) => ({
				x: `Tuần ${item.Week}`,
				y: item.totalRevenue,
		  }));

	const totalSold = filter.includes("Tuần")
		? dataChart?.map((item: any) => ({
				x: `${weekDays[item.Day]}`,
				y: item.totalSold,
		  }))
		: dataChart?.map((item: any) => ({
				x: `Tuần ${item.Week}`,
				y: item.totalSold,
		  }));

	console.log(totalSold, totalRevenue, totalOrders, dataChart);

	const setLastWeek = () => {
		const { monday, sunday } = getMondayAndSunday({ lastweek: true });
		setTime({ from: monday, to: sunday });
		setFilter("Tuần trước");
	};

	const setMonth = (value: number) => {
		const { from, to } = getTimeMonth(value);
		setTime({ from, to });
		setFilter("Tháng " + value);
	};

	const setThisWeek = () => {
		setTime({ from: monday, to: sunday });
		setFilter("Tuần này");
	};
	const setTimeWeek = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputDate = new Date(e.target.value);
		const newEndDate = new Date(inputDate);
		newEndDate.setDate(inputDate.getDate() + 7);
		const toDateString = newEndDate.toISOString().split("T")[0];
		setFilter("Thời gian tuần");
		setTime({ from: e.target.value, to: toDateString });
	};

	const chartRef = useRef(null);

	useEffect(() => {
		const options = {
			colors: ["#1A56DB", "#FDBA8C"],
			series: [
				{
					name: "Số lượng đơn hàng",
					color: "#1A56DB",
					data: totalOrders,
				},
				{
					name: "Số lượng sản phẩm đã bán",
					color: "#FDBA8C",
					data: totalSold,
				},
				{
					name: "Doanh thu",
					color: "#00bfc5",
					data: totalRevenue,
				},
			],
			chart: {
				type: "bar",
				fontFamily: "Inter, sans-serif",
				toolbar: {
					show: false,
				},
			},
			plotOptions: {
				bar: {
					horizontal: false,
					columnWidth: "70%",
					borderRadiusApplication: "end",
					borderRadius: 8,
				},
			},
			tooltip: {
				shared: true,
				intersect: false,
				style: {
					fontFamily: "Inter, sans-serif",
				},
			},
			states: {
				hover: {
					filter: {
						type: "darken",
						value: 1,
					},
				},
			},
			stroke: {
				show: true,
				width: 0,
				colors: ["transparent"],
			},
			grid: {
				show: true,
				strokeDashArray: 4,
				padding: {
					left: 2,
					right: 2,
					top: -14,
				},
			},
			dataLabels: {
				enabled: false,
			},
			legend: {
				show: false,
			},
			xaxis: {
				floating: false,
				labels: {
					show: true,
					style: {
						fontFamily: "Inter, sans-serif",
						cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
					},
				},
				axisBorder: {
					show: false,
				},
				axisTicks: {
					show: false,
				},
			},
			yaxis: {
				show: false,
			},
			fill: {
				opacity: 1,
			},
		};

		if (chartRef.current && typeof ApexCharts !== "undefined") {
			const chart = new ApexCharts(chartRef.current, options);
			chart.render();

			return () => {
				chart.destroy();
			};
		}
	});

	return (
		<div className="w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
			<div className="flex justify-between pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
				<div className="flex items-center w-full">
					<div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center me-3">
						<BsBarChartLine />
					</div>
					<div className="flex justify-between w-full items-start">
						<div className="flex flex-col gap-1">
							<h5 className="leading-none text-xl font-bold text-gray-900 dark:text-white pb-1">
								Thống kê doanh số {filter.toLowerCase()}
							</h5>
							<span className="text-sm">
								{new Date(time.from).toLocaleDateString("vi-VN")} -{" "}
								{new Date(time.to).toLocaleDateString("vi-VN")}
							</span>
						</div>
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
									<div className="absolute -top-1/2 right-[102%] -z-50 group-hover:z-10 group-hover:w-[200px] group-hover:h-fit w-0 h-0 bg-white shadow-sm border border-zinc-300 rounded-md grid grid-cols-4 text-zinc-500 p-2">
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
									<div className="absolute -top-1/2 right-[102%] gap-2 -z-50 group-hover:z-10 group-hover:w-[300px] group-hover:h-fit w-0 h-0 bg-white shadow-sm border border-zinc-300 rounded-md flex flex-wrap p-2">
										<div className="flex items-center w-full justify-between">
											<span>Tuần bắt đầu từ</span>
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
					</div>
				</div>
			</div>

			<div ref={chartRef} id="column-chart"></div>
			<div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
				<div className="flex justify-between items-center pt-5"></div>
			</div>
		</div>
	);
};

export default ColumnChart;
