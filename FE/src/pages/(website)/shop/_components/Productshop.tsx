import useProduct from "@/common/hooks/useProduct";
import { IProduct } from "@/common/interfaces/product";
import Product from "../../../../components/(website)/product/product";
import Pagination from "./pagination";
import { useEffect } from "react";

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
  const { productQuery, setPage } = useProduct();
  // console.log(data?.metadata);
  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);
  return (
    <>
      <div className="col-span-9 mb-10">
        <div className="flex flex-wrap -mx-4 ">
          {productQuery?.data?.metadata?.books?.map((product: IProduct) => (
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
