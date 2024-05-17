import React from "react";
import Pagination from "./pagination";
import Product from "../../reuse/product/product";
import { ProdContextProvider } from "@/client/context/ContextProduct";

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
  return (
    <>
      <ProdContextProvider>
        <div className="col-span-9 mb-10">
          <div className="flex flex-wrap -mx-4 ">
            <div
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
            </div>
            <div
              className={`${
                viewMode ? viewMode : " md:w-1/3 sm:w-1/2 "
              } px-4 mt-5`}
            >
              <Product />
            </div>
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
