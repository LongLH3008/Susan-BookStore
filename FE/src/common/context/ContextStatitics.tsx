import { filterByDay, filterByDayAndMonth, getTopBook } from "@/services/statistical.service";
import { ReactNode, createContext, useEffect, useState } from "react";
import { ITopBook } from "../interfaces/statiscal";
import { getMondayAndSunday, getTimeMonth } from "../shared/getWeekTime";

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

type contextType = {
	dataTotal: Total;
	column: (Weeks | Days)[];
	topBooks: ITopBook[];
	time: { from: string; to: string };
	filter: string;
	setLastWeek: () => void;
	setMonth: (month: number) => void;
	setThisWeek: () => void;
	setTimeWeek: () => void;
	setTimeFrom: (e: React.ChangeEvent<HTMLInputElement>) => void;
	setTimeTo: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const StatiticsContext = createContext<contextType>({} as contextType);

export const StatiticsProvider = ({ children }: { children: ReactNode }) => {
	const { monday, sunday } = getMondayAndSunday();
	const [time, setTime] = useState<{ from: string; to: string }>({ from: monday, to: sunday });
	const [filter, setFilter] = useState<string>("Tuần này");
	const [dataTotal, setDataTotal] = useState<Total>({ totalOrders: 0, totalRevenue: 0, totalSold: 0 });
	const [column, setColumn] = useState<(Weeks | Days)[]>([]);
	const [topBooks, setTopBooks] = useState<ITopBook[]>([]);

	useEffect(() => {
		(async () => {
			if (filter.includes("Tuần")) {
				const res = await filterByDay({ startDate: time.from, endDate: time.to });
				const { totalOrders, totalRevenue, totalSold } = res?.metadata;
				setColumn(res.metadata.dataDays);
				setDataTotal({ totalOrders, totalRevenue, totalSold });
			} else {
				const res = await filterByDayAndMonth({ startDate: time.from, endDate: time.to });
				const { totalOrders, totalRevenue, totalSold } = res?.metadata;
				setColumn(res.metadata.dataWeeks);
				setDataTotal({ totalOrders, totalRevenue, totalSold });
			}

			const res = await getTopBook(time);
			setTopBooks(res?.metadata.topSellingBooks);
		})();
	}, [time, filter]);

	const checkTimePart = () => {
		const start = Number(time.from.split("-")[2]);
		const end = Number(time.to.split("-")[2]);
		return end - start;
	};

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

	const setTimeWeek = () => {
		const inputDate = new Date(time.from);
		const newEndDate = new Date(inputDate);
		newEndDate.setDate(inputDate.getDate() + 7);
		const toDateString = newEndDate.toISOString().split("T")[0];
		setFilter("Thời gian");
		setTime({ from: time.from, to: toDateString });
	};

	const setTimeFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFilter("Thời gian");
		setTime({ ...time, from: e.target.value });
	};

	const setTimeTo = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFilter("Thời gian");
		setTime({ ...time, to: e.target.value });
	};

	return (
		<StatiticsContext.Provider
			value={{
				column,
				dataTotal,
				filter,
				topBooks,
				setLastWeek,
				setMonth,
				setThisWeek,
				setTimeWeek,
				time,
				setTimeFrom,
				setTimeTo,
			}}
		>
			{children}
		</StatiticsContext.Provider>
	);
};
