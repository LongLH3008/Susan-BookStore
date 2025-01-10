import { IProduct } from "@/common/interfaces/product";
import Breadcrumb from "@/components/(website)/breadcrumb/breadcrumb";
import ProductSearch from "@/components/(website)/product/productSearch";
import BlogDetailLoading from "@/components/(website)/Skeleton/SketetonBlogDetail";
import { getBooksByKeyword } from "@/services/search.service";
import { Backdrop, CircularProgress, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Search = () => {
  const location = useLocation();
  const getQueryParams = () => {
    const queryParams = new URLSearchParams(location.search);
    return {
      q: queryParams.get("q") || "",
      c: queryParams.get("c") || "",
    };
  };
  const [query, setQuery] = useState(getQueryParams().q);
  const [cate, setCate] = useState(getQueryParams().c);
  const [books, setBooks] = useState<IProduct[]>([]);
  const [dataSearch, setDataSearch] = useState();
  const [limit, setLimit] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);

  const getBooks = async () => {
    setIsLoading(true);
    try {
      const data = await getBooksByKeyword(
        {
          input: query,
          model: "nomic-ai/nomic-embed-text-v1.5",
          dimensions: 512,
        },
        { limit, page }
      );
      console.log("data", data);

      setBooks(data.metadata.books || []);
      setDataSearch(data.metadata);
    } catch (error) {
      console.error("Error fetching books:", error);
      setBooks([]);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const params = getQueryParams();
    setQuery(params.q);
    setCate(params.c);
  }, [location.search]);

  useEffect(() => {
    getBooks();
  }, [query, cate, limit, page]);
  console.log("dataSearch", dataSearch);

  const handlePageChange = (event: any, value: number) => {
    setPage(value);
    console.log("Trang hiện tại:", value);
  };
  return (
    <>
      <Breadcrumb
        title={`${query && cate ? `${query} - ${cate}` : query || cate}`}
      />
      <div className="min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%]">
        <h2 className="text-center my-10 text-xl">
          Tìm kiếm{" "}
          <span className="text-[#00bfc5]">
            "{`${query && cate ? `${query} - ${cate}` : query || cate}`}"
          </span>{" "}
          của bạn cho{" "}
          <span className="text-[#00bfc5]">{dataSearch?.total}</span> kết quả
          như sau:
        </h2>
        {/* <form className="max-w-3xl mx-auto my-10">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Tìm kiếm sản phẩm..."
              required
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Tìm kiếm
            </button>
          </div>
        </form> */}
        {isLoading ? (
          <div className={`px-4 mt-5`}>
            <BlogDetailLoading />
          </div>
        ) : books.length > 0 ? (
          books?.map((product: IProduct) => (
            <ProductSearch data={product} key={product._id} />
          ))
        ) : (
          <p className="text-center text-red-600 mb-10 :(((">
            Không có kết quả nào thỏa mãn
          </p>
        )}
      </div>
      <div className="flex items-center justify-center my-6">
        <Pagination
          count={Math.ceil((dataSearch?.total || 0) / limit)}
          page={page}
          onChange={handlePageChange}
          shape="rounded"
        />
      </div>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default Search;
