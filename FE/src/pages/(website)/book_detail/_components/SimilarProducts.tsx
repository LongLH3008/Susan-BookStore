import useProduct from "@/common/hooks/useProduct";
import { IProduct } from "@/common/interfaces/product";
import Product from "@/components/(website)/product/product";
import SkeletonProduct from "@/components/(website)/Skeleton/skeletonProduct";
import { useEffect } from "react";

const SimilarProducts = ({ category }: { category: string[] }) => {
  const { productQuery, updateFilter } = useProduct();
  useEffect(() => {
    if (category.length > 0) {
      updateFilter("category_ids", category.join(","));
    } else {
      updateFilter("category_ids", undefined);
    }
  }, [category]);
  //   console.log(category.join(","));

  return (
    <div>
      <hr className="w-full h-[1px] mx-auto my-10 bg-gray-400 border-0 rounded md:my-10 dark:bg-gray-700"></hr>
      <h2 className="text-2xl text-center my-10 font-bold">
        Sản phẩm cùng loại
      </h2>
      <div className="grid min-[500px]:grid-cols-2 md:grid-cols-3 min-[1100px]:grid-cols-4 gap-[30px] mb-10">
        {productQuery?.isLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <SkeletonProduct index={index} />
          ))
        ) : productQuery?.data?.metadata?.books.length !== 0 ? (
          productQuery?.data?.metadata?.books
            ?.sort(() => 0.5 - Math.random())
            ?.slice(0, 4)
            ?.map((product: IProduct, index: number) => (
              <Product key={index} dataProduct={product} />
            ))
        ) : (
          <div>
            <p className="m-auto">Không tìm thấy sản phẩm tương ứng</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimilarProducts;
