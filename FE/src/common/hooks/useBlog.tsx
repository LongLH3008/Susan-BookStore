import { createContext, useContext } from "react";

interface PropContextBlog {
  children: React.ReactNode;
}
interface BlogContextType {}

export const BlogContext = createContext<BlogContextType>(
  {} as BlogContextType
);

export const BlogProvider = ({ children }: PropContextBlog) => {
  //   const;
  return <BlogContext.Provider value={{}}>{children}</BlogContext.Provider>;
};

export default function useBlog() {
  return useContext(BlogContext);
}
