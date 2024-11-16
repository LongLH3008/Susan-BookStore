import { fetchProducts } from "@/services/product.service";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import { dataProductProb } from "../interfaces/product";

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
  productDataFilter: dataProductProb | undefined;
  setFeature: React.Dispatch<React.SetStateAction<featureProbs | undefined>>;
  filters: FiltersType;
  updateFilter: (key: string, value: any) => void;
  productQuery: UseQueryResult<any, Error>;
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
  const [productDataFilter, setProductDataFilter] = useState<dataProductProb>();
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
    staleTime: 5000,
  });

  useEffect(() => {
    setProductDataFilter(productQuery?.data?.metadata);
  }, [productQuery?.data]);

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

    // if (features?.author && features.author.length > 0) {
    //   const filtered =
    //     features.author.length > 0
    //       ? productQuery?.data?.metadata?.books?.filter((product: IProduct) =>
    //           features.author.includes(product.author)
    //         )
    //       : productQuery?.data?.metadata?.books;
    //   setProductDataFilter(filtered);
    // }
    // if (features?.author && features.author.length > 0) {
    //   // Kiểm tra nếu có dữ liệu products và tiến hành lọc
    //   const filteredProducts = productDataFilter?.books?.filter(
    //     (product: IProduct) => features.author.includes(product.author)
    //   );
    //   console.log(filteredProducts);

    //   setProductDataFilter(filteredProducts);
    // } else {
    //   // Nếu không có tác giả, hiển thị toàn bộ dữ liệu sản phẩm
    //   setProductDataFilter(productQuery?.data?.metadata?.books);
    // }
  }, [features, productQuery?.data?.metadata]);

  return (
    <ProductContext.Provider
      value={{
        setFeature,
        filters,
        updateFilter,
        productQuery,
        productDataFilter,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default function useProduct() {
  return useContext(ProductContext);
}
