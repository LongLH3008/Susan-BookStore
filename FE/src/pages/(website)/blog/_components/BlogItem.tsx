import useBlog from "@/common/hooks/useBlog";
import { IBlog } from "@/common/interfaces/blog";
import LoadingBlog from "@/components/(website)/Skeleton/SkeletonBlog";
import Blog from "../../../../components/(website)/blog/blog";
import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";

const BlogItem = () => {

  const { DataBlogs, setFilters } = useBlog();
  const [limit, setLimit] = useState<number>(6);
  const [page, setPage] = useState<number>(1);
  useEffect(() => {
    setFilters({
      page: page,
      limit: limit,
      search: "",
    });
  }, [page]);
  const handlePageChange = (event: any, value: number) => {
    setPage(value);
  };
  return (
    <>
      <div className="grid sm:grid-cols-2 sm:col-span-3 gap-8 ">
        {DataBlogs?.isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <LoadingBlog index={index} />
            ))
          : DataBlogs?.data?.metadata?.data?.map((blog: IBlog) => (
              <Blog dataBlog={blog} />
            ))}
        {DataBlogs?.data?.metadata?.total > limit && (
          <div className="flex justify-center items-center">
            <Pagination
              count={Math.ceil((DataBlogs?.data?.metadata?.total || 0) / limit)}
              page={page}
              onChange={handlePageChange}
              shape="rounded"
            />
          </div>
        )}
      </div>
    </>
  );

};

export default BlogItem;
