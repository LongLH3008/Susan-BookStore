import { fetchProducts } from "@/services/product.service";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";

type ProdContextType = {
	setFeature: React.Dispatch<React.SetStateAction<featureProbs | undefined>>;
	page: number;
	setPage: React.Dispatch<React.SetStateAction<number>>;
	limit: number;
	setLimit: React.Dispatch<React.SetStateAction<number>>;
	search: string;
	setSearch: React.Dispatch<React.SetStateAction<string>>;
	category_ids: string | undefined;
	setCategoryIds: React.Dispatch<React.SetStateAction<string | undefined>>;
	sort: string | undefined;
	setSort: React.Dispatch<React.SetStateAction<string | undefined>>;
	minPrice: number | undefined;
	setMinPrice: React.Dispatch<React.SetStateAction<number | undefined>>;
	maxPrice: number | undefined;
	setMaxPrice: React.Dispatch<React.SetStateAction<number | undefined>>;
	minRating: number | undefined;
	setMinRating: React.Dispatch<React.SetStateAction<number | undefined>>;
	productQuery: UseQueryResult<any, Error>;
};

type ProdContextProps = {
	children: React.ReactNode;
};
type featureProbs = {
	price: { gte: number; lte: number };
	availability: string[];
	productType: string[];
	author: string[];
};
export const ProductContext = createContext<ProdContextType>({} as ProdContextType);

export const ProductProvider = ({ children }: ProdContextProps) => {
	// const [productQuery, setProductQuery] = useState<any[]>([]);
	const [features, setFeature] = useState<featureProbs | undefined>();
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(0);
	const [search, setSearch] = useState("");
	const [category_ids, setCategoryIds] = useState<string | undefined>();
	const [sort, setSort] = useState<string | undefined>();
	const [minPrice, setMinPrice] = useState<number | undefined>();
	const [maxPrice, setMaxPrice] = useState<number | undefined>();
	const [minRating, setMinRating] = useState<number | undefined>();

	const filter = {
		page,
		limit,
		search,
		category_ids: category_ids ?? undefined,
		sort: sort ?? undefined,
		minPrice: minPrice ?? undefined,
		maxPrice: maxPrice ?? undefined,
		minRating: minRating ?? undefined,
	};
	// Fetch products using useQuery
	const productQuery = useQuery({
		queryKey: ["Books", filter],
		queryFn: () => fetchProducts(filter),
		staleTime: 5000,
	});
	// console.log(productQuery.data);

	// useEffect(() => {
	//   setProductQuery(productdata);
	// }, [JSON.stringify(productdata)]);
	useEffect(() => {
		if (features?.price) {
			setMinPrice(features?.price?.gte);
			setMaxPrice(features?.price?.lte);
		}
		if (features?.productType && features.productType.length > 0) {
			const selectedCategoryIds = features.productType.join(",");
			setCategoryIds(selectedCategoryIds);
		} else {
			setCategoryIds(undefined);
		}
		if (features.author.length > 0) {
			productQuery = productQuery?.data?.metadata?.books?.filter(
				(product) => features.author.includes(product.author) // Điều chỉnh theo cấu trúc dữ liệu sản phẩm
			);
		}
	}, [JSON.stringify(features)]);
	return (
		<ProductContext.Provider
			value={{
				setFeature,
				page,
				setPage,
				limit,
				setLimit,
				search,
				setSearch,
				category_ids,
				setCategoryIds,
				sort,
				setSort,
				minPrice,
				setMinPrice,
				maxPrice,
				setMaxPrice,
				minRating,
				setMinRating,
				productQuery,
			}}
		>
			{children}
		</ProductContext.Provider>
	);
};

export default function useProduct() {
	return useContext(ProductContext);
}
