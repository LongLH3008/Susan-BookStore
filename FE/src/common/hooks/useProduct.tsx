import { fetchProducts } from "@/services/product";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { createContext, useContext, useState } from "react";

type ProdContextType = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  productQuery: UseQueryResult<any, Error>;
};

type ProdContextProps = {
  children: React.ReactNode;
};

export const ProductContext = createContext<ProdContextType>(
  {} as ProdContextType
);

export const ProductProvider = ({ children }: ProdContextProps) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("content");
  const filter = { page, limit };

  // Fetch products using useQuery
  const productQuery = useQuery({
    queryKey: ["Books", filter],
    queryFn: () => fetchProducts(filter),
    staleTime: 5000,
  });
  // console.log(productQuery.data);

  return (
    <ProductContext.Provider
      value={{
        page,
        setPage,
        limit,
        setLimit,
        search,
        setSearch,
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
