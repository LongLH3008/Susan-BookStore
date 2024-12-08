import { getAllOrder } from "@/services/order.service";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { createContext, useContext, useState } from "react";

interface PropContextOrder {
	children: React.ReactNode;
}
interface OrderContextType {
	DataOrders: UseQueryResult<any, Error>;
	filters: FiltersType;
	setFilters: React.Dispatch<React.SetStateAction<FiltersType>>;
}
type FiltersType = {
	page: number;
	limit: number;
	search: string;
};

export const OrderContext = createContext<OrderContextType>({} as OrderContextType);

export const OrderProvider = ({ children }: PropContextOrder) => {
	const [filters, setFilters] = useState<FiltersType>({
		page: 1,
		limit: 9999,
		search: "",
	});

	const DataOrders = useQuery({
		queryKey: ["Order", filters],
		queryFn: () => getAllOrder(filters),
	});

	return <OrderContext.Provider value={{ DataOrders, filters, setFilters }}>{children}</OrderContext.Provider>;
};

export default function useOrder() {
	return useContext(OrderContext);
}
