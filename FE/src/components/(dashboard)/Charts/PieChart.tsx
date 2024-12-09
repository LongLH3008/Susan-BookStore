import { StatiticsContext } from "@/common/context/ContextStatitics";
import { ITopBook } from "@/common/interfaces/statiscal";
import ApexCharts from "apexcharts";
import { useContext, useEffect, useRef } from "react";

const TopSellingBooksChart = () => {
	const chartRef = useRef(null);

	const { time, topBooks } = useContext(StatiticsContext);

	const seriesData = topBooks?.map((item: ITopBook) => item.totalSold) || [];
	const categoriesData = topBooks?.map((item: ITopBook) => item.bookName) || [];

	useEffect(() => {
		if (!topBooks) return;
		const options = {
			chart: {
				type: "bar",
				height: 300,
			},
			series: [
				{
					name: "Số lượng bán",
					data: seriesData,
				},
			],
			plotOptions: {
				bar: {
					horizontal: true,
					barHeight: "50%",
					borderRadius: 4,
				},
			},
			dataLabels: {
				enabled: true,
				style: {
					fontSize: "10px",
					colors: ["#000"],
				},
			},
			xaxis: {
				categories: categoriesData,
				title: {
					text: "Số lượng bán",
					style: {
						fontSize: "12px",
						fontWeight: "bold",
					},
				},
			},
			yaxis: {
				title: {
					text: "Tên sách",
					style: {
						fontSize: "12px",
						fontWeight: "bold",
					},
				},
			},
			colors: ["#00bfc5"],
			grid: {
				strokeDashArray: 4,
			},
			tooltip: {
				x: {
					formatter: function (val: any, opts: any) {
						const label = opts.w.globals.labels[opts.dataPointIndex];
						return label ? `Sách: ${label}` : "Không xác định";
					},
				},
				y: {
					formatter: function (val: any) {
						return `${val} cuốn`;
					},
				},
			},
		};

		if (chartRef.current) {
			const chart = new ApexCharts(chartRef.current, options);
			chart.render();
			return () => chart.destroy();
		}
	}, [topBooks]);

	return (
		<div className="bg-white rounded-lg">
			<div className="px-4 py-2 flex items-start justify-between">
				<div className="flex flex-col gap-1">
					<h2 className="font-bold text-gray-700">Top 5 loại sách bán chạy</h2>
				</div>
				{/* <div className="bg-white border group relative overflow-hidden hover:overflow-visible border-zinc-300 cursor-pointer text-[13px] flex items-center text-center justify-center w-24 h-8 rounded-md">
					<span>{filter}</span>
					<div className="absolute w-full top-[105%] rounded-md border border-zinc-300 flex flex-col left-0 h-0 opacity-0 z-10 shadow-sm bg-white group-hover:h-auto group-hover:z-[9999] group-hover:opacity-100">
						<span onClick={() => setThisWeek()} className="hover:bg-zinc-100 px-2 py-1">
							Tuần này
						</span>
						<span onClick={() => setLastWeek()} className="hover:bg-zinc-100 px-2 py-1">
							Tuần trước
						</span>
						<div className="relative group overflow-hidden px-2 py-1 hover:overflow-visible w-full">
							<span className="px-2 py-2 relative peer cursor-pointer">Tháng</span>
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
							<span className="px-2 py-2 relative peer cursor-pointer">Thời gian</span>
							<div className="absolute -top-1/2 right-[102%] gap-2 -z-50 group-hover:z-10 group-hover:w-[200px] group-hover:h-fit w-0 h-0 bg-white shadow-sm border border-zinc-300 rounded-md flex flex-wrap p-2">
								<div className="flex items-center w-full justify-between">
									<span>Từ</span>
									<input
										onChange={(e) => setTimeFrom(e)}
										type="date"
										className="text-sm border-zinc-300 rounded-md"
									/>
								</div>
								<div className="flex items-center w-full justify-between">
									<span>Đến</span>
									<input
										onChange={(e) => setTimeTo(e)}
										type="date"
										className="text-sm border-zinc-300 rounded-md"
									/>
								</div>
							</div>
						</div>
					</div>
				</div> */}
			</div>
			<div ref={chartRef} className="py-0 px-3"></div>
		</div>
	);
};

export default TopSellingBooksChart;
