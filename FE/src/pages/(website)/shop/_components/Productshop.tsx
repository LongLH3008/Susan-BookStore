import useProduct from "@/common/hooks/useProduct";
import { dataProductProb, IProduct } from "@/common/interfaces/product";
import SkeletonProduct from "@/components/(website)/Skeleton/skeletonProduct";
import { getBooksByKeyword } from "@/services/search.service";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Product from "../../../../components/(website)/product/product";
import Pagination from "./pagination";

type Props = {
  dataProduct: dataProductProb | undefined;
  totalItems: number;
  itemsToShow: number;
  currentPage: number;
  viewMode: string | null;
  onPageChange: (page: number) => void;
};

const Right = ({
  dataProduct,
  totalItems,
  itemsToShow,
  currentPage,
  onPageChange,
  viewMode,
}: Props) => {
  const { productQuery, updateFilter } = useProduct();
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
  const [books, setBooks] = useState([]);
  const getBooks = async () => {
    try {
      const data = await getBooksByKeyword({
        input: query,
        model: "nomic-ai/nomic-embed-text-v1.5",
        dimensions: 512,
      });
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);
  console.log(books);

  useEffect(() => {
    updateFilter("page", currentPage);
  }, [currentPage]);

  return (
    <>
      <div className="col-span-9 mb-10">
        <div className="flex flex-wrap -mx-4 ">
          {!(query && query.length > 0)
            ? productQuery?.isLoading
              ? Array.from({ length: 8 }).map((_, index) => (
                  <SkeletonProduct index={index} />
                ))
              : dataProduct?.books?.map((product: IProduct) => (
                  <div
                    key={product._id}
                    className={`${
                      viewMode ? viewMode : " md:w-1/3 sm:w-1/2 "
                    } px-4 mt-5`}
                  >
                    <Product dataProduct={product} />{" "}
                  </div>
                ))
            : books?.metadata?.books?.map((product: IProduct) => (
                <div
                  key={product._id}
                  className={`${
                    viewMode ? viewMode : " md:w-1/3 sm:w-1/2 "
                  } px-4 mt-5`}
                >
                  <Product dataProduct={product} />{" "}
                </div>
              ))}
        </div>
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsToShow}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
};

export default Right;
