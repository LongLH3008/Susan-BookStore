import React from "react";

import Pagination from "./pagination";
import Product from "../../reuse/product/product";
import { ProdContextProvider } from "@/client/context/ContextProduct";

type Props = {};

const Right = (props: Props) => {
  return (
    <>
      <ProdContextProvider>
        <div className="col-span-9 mb-10">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full lg:w-1/3 md:w-1/3 sm:w-1/2 px-4 ">
              <Product />
            </div>
          </div>
          <Pagination />
        </div>
      </ProdContextProvider>
    </>
  );
};

export default Right;
