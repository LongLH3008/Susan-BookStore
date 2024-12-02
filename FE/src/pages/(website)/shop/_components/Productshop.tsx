import useProduct from "@/common/hooks/useProduct";
import { dataProductProb, IProduct } from "@/common/interfaces/product";
import SkeletonProduct from "@/components/(website)/Skeleton/skeletonProduct";
import { getBooksByKeyword } from "@/services/search.service";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Product from "../../../../components/(website)/product/product";
import Pagination from "./pagination";

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
  const { productQuery, updateFilter } = useProduct();

  useEffect(() => {
    updateFilter("page", currentPage);
  }, [currentPage]);

  return (
    <>
      <div className="col-span-9 mb-10">
        <div className="flex flex-wrap -mx-4 ">
          {productQuery?.isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className={`${
                    viewMode ? viewMode : " md:w-1/3 sm:w-1/2 "
                  } px-4 mt-5`}
                >
                  <SkeletonProduct />
                </div>
              ))
            : productQuery?.data?.metadata?.books?.map((product: IProduct) => (
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
