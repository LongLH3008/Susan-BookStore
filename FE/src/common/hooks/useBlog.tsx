import { getBlogs } from "@/services/blog";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { createContext, useContext } from "react";

interface PropContextBlog {
  children: React.ReactNode;
}
interface BlogContextType {
  DataBlogs: UseQueryResult<any, Error>;
}

export const BlogContext = createContext<BlogContextType>(
  {} as BlogContextType
);

export const BlogProvider = ({ children }: PropContextBlog) => {
  const DataBlogs = useQuery({
    queryKey: ["Blog"],
    queryFn: () => getBlogs(),
  });

  return (
    <BlogContext.Provider value={{ DataBlogs }}>
      {children}
    </BlogContext.Provider>
  );
};

export default function useBlog() {
  return useContext(BlogContext);
}
