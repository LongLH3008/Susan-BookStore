import { getCategories } from "@/services/categories";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { createContext, useContext, useState } from "react";

type ProdContextType = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  CategoryQuery: UseQueryResult<any, Error>;
};

type ProdContextProps = {
  children: React.ReactNode;
};

export const CategoryContext = createContext<ProdContextType>(
  {} as ProdContextType
);

export const CategoryProvider = ({ children }: ProdContextProps) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const filter = { page, limit };

  // Fetch Categorys using useQuery
  const CategoryQuery = useQuery({
    queryKey: ["Categories", limit],
    queryFn: () => getCategories(filter),
    staleTime: 5000,
  });
  // console.log(CategoryQuery.data);

  return (
    <CategoryContext.Provider
      value={{
        CategoryQuery,
        setPage,
        setLimit,
        limit,
        page,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export default function useCategory() {
  return useContext(CategoryContext);
}
