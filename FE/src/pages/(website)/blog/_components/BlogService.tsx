import useBlog from "@/common/hooks/useBlog";
import { IBlog } from "@/common/interfaces/blog";
import { FormatDate } from "@/components/formatDate";
import { Skeleton } from "@mui/material";
import { Link } from "react-router-dom";

const BlogService = () => {
  const { DataBlogs } = useBlog();

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const blogMontn = DataBlogs?.data?.metadata?.data?.filter((data: IBlog) => {
    const createdAt = new Date(data.createdAt!);
    return (
      createdAt.getMonth() + 1 === currentMonth &&
      createdAt.getFullYear() === currentYear
    );
  });

  return (
    <>
      <div className="lg:grid-cols-1 divide-y divide-gray-200">
        {/* Search */}
        {/* <div className="search pb-10 ">
          <h3 className="font-semibold text-xl text-[#292929] max-lg:mt-16">
            Tìm kiếm
          </h3>
          <form className="max-w-md mx-auto mt-5">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <MdOutlineSearch className="text-2xl" />
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                placeholder="Tìm kiếm tin tức ..."
                onChange={handleSearch}
                required
              />
            </div>
          </form>
        </div> */}
        {/* End Search */}

        {/* Recent Post */}
        <div className="recentPost py-10  ">
          <h3 className="text-xl font-semibold text-[#292929]">
            Bài đăng gần đây
          </h3>
          <div className="*:py-5">
            {DataBlogs?.isLoading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="flex *:me-2">
                    <Skeleton
                      variant="rectangular"
                      width="91px"
                      height="45px"
                    />
                    <Skeleton variant="text" width="80%" height={24} />
                  </div>
                ))
              : DataBlogs?.data?.metadata?.data
                  .slice()
                  ?.reverse()
                  .slice(0, 3)
                  ?.map((blog: IBlog, index: number) => (
                    <div className="flex" key={index}>
                      <div className="">
                        <Link to={"/tin-tuc/" + blog?.blog_slug}>
                          <img
                            className="w-[91px] h-[45px] mr-2 object-cover border-[1px] hover:border-[#00BFC5]"
                            src={blog?.blog_image}
                            alt={blog?.blog_title}
                          />
                        </Link>
                      </div>
                      <Link to={"/tin-tuc/" + blog?.blog_slug} className="">
                        <h4 className="font-semibold 2xl:max-w-[170px] lg:max-w-[100px]   sm:overflow-hidden sm:truncate text-[13px] text-[#292929] hover:text-[#00BFC5]">
                          {blog?.blog_title}
                        </h4>
                        <p className="text-[#707070] text-xs ">
                          {FormatDate(blog?.createdAt)}
                        </p>
                      </Link>
                    </div>
                  ))}
          </div>
        </div>
        {/* End Recent Post */}
        {/* Archive */}
        <div className="Archive py-10  ">
          <h3 className="text-xl font-semibold text-[#292929] mb-5">Lưu trữ</h3>
          <ul className="*:text-[#707070] *:my-2">
            <li className="font-bold">
              Tháng {currentMonth} {currentYear}
            </li>
            {!Array.isArray(blogMontn) || blogMontn.length == 0 ? (
              <Skeleton variant="text" width="100%" height={24} />
            ) : (
              <ul>
                {blogMontn?.map((blog: IBlog) => (
                  <li key={blog._id}>
                    {" "}
                    <Link
                      to={`/tin-tuc/${blog?.blog_slug}`}
                      className="hover:text-[#00BFC5] "
                    >
                      <p className="truncate">{blog?.blog_title}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </ul>
        </div>
        {/* End Archive */}
      </div>
    </>
  );
};

export default BlogService;
