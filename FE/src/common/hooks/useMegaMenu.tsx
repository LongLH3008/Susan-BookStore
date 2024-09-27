import { fetchProducts } from "@/services/product";
import { useQuery } from "@tanstack/react-query";
import React, { createContext, useContext } from "react";
import { IProduct } from "../interfaces/product";

interface ProdContextType {
	author: Array<string>;
	Publishers: string[];
	BestSeller: IProduct[];
}
interface ProdMegaMenuProbs {
	children: React.ReactNode;
}
export const MegaMenuContext = createContext<ProdContextType>({
	author: [],
	Publishers: [],
	BestSeller: [],
});

export const MegeMenuProvider = ({ children }: ProdMegaMenuProbs) => {
	const filter = {
		page: 1,
		limit: 0,
		search: "",
	};
	// Fetch products using useQuery
	const data = useQuery({
		queryKey: ["Books", filter],
		queryFn: () => fetchProducts(filter),
		staleTime: 5000,
	});
	const Books = data?.data?.metadata?.books || [];
	const author = Books?.map((book: IProduct) => book.author) // Lấy author từ từng sản phẩm
		?.filter((author: string, index: number, self: any) => author && self.indexOf(author) === index);

	const Publishers = Books?.map((publisher: IProduct) => publisher.publisher)?.filter(
		(publisher: string, index: number, self: any) => publisher && self.indexOf(publisher) === index
	);

	const BestSeller = [...Books]?.sort((a, b) => b.sold - a.sold);
	return <MegaMenuContext.Provider value={{ author, Publishers, BestSeller }}>{children}</MegaMenuContext.Provider>;
};
export default function useMegaMenu() {
	return useContext(MegaMenuContext);
}
