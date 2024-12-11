import { StatiticsContext } from "@/common/context/ContextStatitics";
import ApexCharts from "apexcharts";
import { useContext, useEffect, useRef, useState } from "react";
import { BsBarChartLine } from "react-icons/bs";

type column = {
	x: string;
	y: number;
};

type Total = {
	totalRevenue: column[];
	totalSold: column[];
	totalOrders: column[];
};

const getDatesInRange = (startDate: string, endDate: string): string[] => {
	const start = new Date(startDate);
	const end = new Date(endDate);
	const dates: string[] = [];

	// Lặp qua từng ngày trong khoảng thời gian
	while (start <= end) {
		const day = start.getDate().toString().padStart(2, "0"); // Định dạng ngày 2 chữ số
		const month = (start.getMonth() + 1).toString().padStart(2, "0"); // Định dạng tháng 2 chữ số
		dates.push(`${day}/${month}`);
		start.setDate(start.getDate() + 1); // Tăng thêm 1 ngày
	}

	return dates;
};

const getWeeklyRanges = (startOfMonth: string, endOfMonth: string): string[] => {
	const startDate = new Date(startOfMonth);
	const endDate = new Date(endOfMonth);
	const ranges: string[] = [];

	for (let week = 0; week < 4; week++) {
		const weekStart = new Date(startDate);
		weekStart.setDate(startDate.getDate() + week * 7);

		const weekEnd = new Date(weekStart);
		weekEnd.setDate(weekEnd.getDate() + 6);

		if (weekEnd > endDate) {
			weekEnd.setTime(endDate.getTime());
		}

		const startFormatted = weekStart.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit" });
		const endFormatted = weekEnd.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit" });
		ranges.push(`${startFormatted} - ${endFormatted}`);
	}

	return ranges;
};

const ColumnChart = () => {
	const { column, filter, time } = useContext(StatiticsContext);
	const weekDays = getDatesInRange(time.from, time.to);
	const weeks = getWeeklyRanges(time.from, time.to);

	const [chooseType, setChooseType] = useState<"order" | "revenue" | "sold">("revenue");
	const [total, setTotal] = useState<Total>({ totalRevenue: [], totalOrders: [], totalSold: [] });
	const [dataColumn, setDataColumn] = useState<{ name: string; color: string; data: any[] }>({
		name: "",
		color: "",
		data: [],
	});

	useEffect(() => {
		setDataColumn({
			color: "#FDBA8C",
			name: "Doanh thu",
			data:
				filter.includes("Tuần") || filter.includes("Thời gian")
					? column?.map((item: any) => ({
							x: `${weekDays[item?.Day - 1] ?? ""}`,
							y: item?.totalRevenue,
					  }))
					: column?.map((item: any) => ({
							x: `Tuần ${item?.Week ?? ""} [${weeks[item?.Week - 1]}]`,
							y: item?.totalRevenue,
					  })),
		});
		setTotal({
			totalOrders:
				filter.includes("Tuần") || filter.includes("Thời gian")
					? column?.map((item: any) => ({
							x: `${weekDays[item?.Day - 1] ?? ""}`,
							y: item?.totalOrders,
					  }))
					: column?.map((item: any) => ({
							x: `${item?.Week ? `Tuần ${item.Week} [${weeks[item?.Week - 1]}]` : ""}`,
							y: item?.totalOrders,
					  })),
			totalRevenue:
				filter.includes("Tuần") || filter.includes("Thời gian")
					? column?.map((item: any) => ({
							x: `${weekDays[item?.Day - 1] ?? ""}`,
							y: item?.totalRevenue,
					  }))
					: column?.map((item: any) => ({
							x: `${item?.Week ? `Tuần ${item.Week} [${weeks[item?.Week - 1]}]` : ""}`,
							y: item?.totalRevenue,
					  })),
			totalSold: filter.includes("Tuần")
				? column?.map((item: any) => ({
						x: `${weekDays[item?.Day - 1] ?? ""}`,
						y: item?.totalSold,
				  }))
				: column?.map((item: any) => ({
						x: `${item?.Week ? `Tuần ${item.Week} [${weeks[item?.Week - 1]}]` : ""}`,
						y: item?.totalSold,
				  })),
		});
	}, [column, filter]);

	const choose = (arg: "order" | "revenue" | "sold") => {
		if (arg == "order") setDataColumn({ name: "Số lượng đơn hàng", color: "#00bfc5", data: total.totalOrders });
		if (arg == "revenue") setDataColumn({ name: "Doanh thu", color: "#FDBA8C", data: total.totalRevenue });
		if (arg == "sold") setDataColumn({ name: "Số lượng sách đã bán", color: "#1A56DB", data: total.totalSold });
		setChooseType(arg);
	};

	const chartRef = useRef(null);

	useEffect(() => {
		const options = {
			colors: ["#1A56DB", "#FDBA8C"],
			series: [dataColumn],
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
						<h3 className="text-lg font-[500]">
							{chooseType == "order" && "Số lượng đơn hàng "}
							{chooseType == "revenue" && "Doanh thu "}
							{chooseType == "sold" && "Số lượng đã bán "}
							theo thời gian
						</h3>
						<div className="bg-white border group relative overflow-hidden hover:overflow-visible border-zinc-300 cursor-pointer text-[13px] flex items-center text-center justify-center w-24 h-8 rounded-md">
							<span>
								{chooseType == "order" && <span>Đơn hàng</span>}
								{chooseType == "revenue" && <span>Doanh thu</span>}
								{chooseType == "sold" && <span>Đã bán</span>}
							</span>
							<div className="absolute w-full top-[105%] rounded-md border border-zinc-300 flex flex-col left-0 h-0 opacity-0 z-10 shadow-sm bg-white group-hover:h-auto group-hover:z-[9999] group-hover:opacity-100">
								<span
									onClick={() => choose("revenue")}
									className="hover:bg-zinc-100 px-2 py-1"
								>
									Doanh thu
								</span>
								<span
									onClick={() => choose("order")}
									className="hover:bg-zinc-100 px-2 py-1"
								>
									Đơn hàng
								</span>
								<span
									onClick={() => choose("sold")}
									className="hover:bg-zinc-100 px-2 py-1"
								>
									Đã bán
								</span>
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
