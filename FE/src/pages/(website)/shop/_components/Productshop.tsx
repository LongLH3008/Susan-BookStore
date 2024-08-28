import React, { useState } from "react";
import Pagination from "./pagination";
import Product from "../../../../components/(website)/product/product";
import { ProdContextProvider } from "@/common/context/ContextProduct";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/services/product";
import { IProduct } from "@/common/interfaces/product";

type Props = {
  totalItems: number;
  itemsToShow: number;
  currentPage: number;
  viewMode: string | null;
  onPageChange: (page: number) => void;
};

const Right = ({
  totalItems,
  itemsToShow,
  currentPage,
  onPageChange,
  viewMode,
}: Props) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState("");
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["Products", limit, page, search],
    queryFn: () => fetchProducts(limit, page, search),
    staleTime: 1000,
  });
  console.log(data?.metadata);

  return (
    <>
      <ProdContextProvider>
        <div className="col-span-9 mb-10">
          <div className="flex flex-wrap -mx-4 ">
            {data?.metadata?.map((product: IProduct) => (
              <div
                key={product._id}
                className={`${
                  viewMode ? viewMode : " md:w-1/3 sm:w-1/2 "
                } px-4 mt-5`}
              >
                <Product
                  name={product.product_name}
                  status={""}
                  price={product.product_price}
                  discount={0}
                  thumb={product.product_thumb}
                />{" "}
              </div>
            ))}

            {/* <div
              className={`${
                viewMode ? viewMode : " md:w-1/3 sm:w-1/2 "
              } px-4 mt-5`}
            >
              <Product />
            </div>
            <div
              className={`${
                viewMode ? viewMode : " md:w-1/3 sm:w-1/2 "
              } px-4 mt-5`}
            >
              <Product />
            </div> */}
          </div>
          <Pagination
            totalItems={totalItems}
            itemsPerPage={itemsToShow}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        </div>
      </ProdContextProvider>
    </>
  );
};

export default Right;
