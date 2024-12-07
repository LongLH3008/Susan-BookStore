import { fetchProducts, fetchProductsAdmin } from "@/services/product.service";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";

type ProdContextProps = {
  children: React.ReactNode;
};
type featureProbs = {
  price: { gte: number; lte: number };
  availability: string[];
  productType: string[];
  author: string[];
};
type ProdContextType = {
  setFeature: React.Dispatch<React.SetStateAction<featureProbs | undefined>>;
  filters: FiltersType;
  updateFilter: (key: string, value: any) => void;
  productQuery: UseQueryResult<any, Error>;
  productQueryAdmin: UseQueryResult<any, Error>;
};

type FiltersType = {
  page: number;
  limit: number;
  search: string;
  category_ids: string | undefined;
  sort: string | undefined;
  minPrice: number | undefined;
  maxPrice: number | undefined;
  minRating: number | undefined;
};

export const ProductContext = createContext<ProdContextType>(
  {} as ProdContextType
);

export const ProductProvider = ({ children }: ProdContextProps) => {
  const [features, setFeature] = useState<featureProbs>();

  const [filters, setFilters] = useState<FiltersType>({
    page: 1,
    limit: 60,
    search: "",
    category_ids: undefined,
    sort: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    minRating: undefined,
  });

  const updateFilter = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const productQuery = useQuery({
    queryKey: ["Books", filters],
    queryFn: () => fetchProducts(filters as any),
    staleTime: Infinity,
  });
  const productQueryAdmin = useQuery({
    queryKey: ["BooksAdmin", filters],
    queryFn: () => fetchProductsAdmin(filters as any),
    staleTime: Infinity,
  });
  // console.log("productDataFilter", productDataFilter);
  useEffect(() => {
    if (features?.price) {
      updateFilter("minPrice", features.price.gte);
      updateFilter("maxPrice", features.price.lte);
    }
    if (features?.productType && features.productType.length > 0) {
      updateFilter("category_ids", features.productType.join(","));
    } else {
      updateFilter("category_ids", undefined);
    }
  }, [features, productQuery?.data?.metadata]);

  return (
    <ProductContext.Provider
      value={{
        setFeature,
        filters,
        updateFilter,
        productQuery,
        productQueryAdmin,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default function useProduct() {
  return useContext(ProductContext);
}
