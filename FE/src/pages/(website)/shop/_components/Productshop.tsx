import useProduct from "@/common/hooks/useProduct";
import { dataProductProb, IProduct } from "@/common/interfaces/product";
import { useEffect } from "react";
import Product from "../../../../components/(website)/product/product";
import Pagination from "./pagination";
import SkeletonProduct from "@/components/(website)/Skeleton/skeletonProduct";

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
  // console.log(data?.metadata);
  useEffect(() => {
    updateFilter("page", currentPage);
  }, [currentPage]);

  return (
    <>
      <div className="col-span-9 mb-10">
        <div className="flex flex-wrap -mx-4 ">
          {productQuery?.isLoading
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
