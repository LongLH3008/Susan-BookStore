import { getBlogs } from "@/services/blog.service";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { createContext, useContext, useState } from "react";

interface PropContextBlog {
  children: React.ReactNode;
}
interface BlogContextType {
  DataBlogs: UseQueryResult<any, Error>;
  filters: FiltersType;
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>;
}
type FiltersType = {
  page: number;
  limit: number;
  search: string;
};

export const BlogContext = createContext<BlogContextType>(
  {} as BlogContextType
);

export const BlogProvider = ({ children }: PropContextBlog) => {
  const [filters, setFilters] = useState<FiltersType>({
    page: 1,
    limit: 10,
    search: "",
  });

  const DataBlogs = useQuery({
    queryKey: ["Blog", filters],
    queryFn: () => getBlogs(filters),
  });

  return (
    <BlogContext.Provider value={{ DataBlogs, filters, setFilters }}>
      {children}
    </BlogContext.Provider>
  );
};

export default function useBlog() {
  return useContext(BlogContext);
}
