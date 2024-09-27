import useCategory from "@/common/hooks/useCategories";
import useProduct from "@/common/hooks/useProduct";
import { ICategory } from "@/common/interfaces/category";
import { IProduct } from "@/common/interfaces/product";
import { useEffect, useState } from "react";
import Product from "../../../../components/(website)/product/product";
import SkeletonProduct from "@/components/(website)/Skeleton/skeletonProduct";

const HomeProducts = () => {
  const { productQuery, updateFilter } = useProduct();
  const { CategoryQuery, setLimit } = useCategory();
  const [color, setColor] = useState("66ebf60f505ce54b4e29b42f");

  useEffect(() => {
    setLimit(4);
    updateFilter("category_ids", "66ebf60f505ce54b4e29b42f");
  }, [setLimit]);
  return (
    <div className="min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%] mb-[80px] min-[968px]:mb-[100px]">
      <h2 className="mb-[20px] text-center text-3xl text-zinc-800 font-medium tracking-wide">
        Sản phẩm đa dạng
      </h2>
      <p className="mb-[40px] text-[15px] text-zinc-500 text-center">
        Sản phẩm sách phong phú với từng thể loại
      </p>
      <div
        id="btn_cate_home_products"
        className="mb-12 grid grid-cols-2 sm:flex sm:justify-center sm:items-center gap-4 *:cursor-pointer  *:text-sm  *:px-[30px] *:py-[13px] *:rounded-[3px]"
      >
        {CategoryQuery?.data?.metadata?.map((category: ICategory) => (
          <span
            key={category.id}
            className={`${
              color == category.id ? "bg-zinc-800 text-white " : "bg-zinc-200"
            } hover:bg-zinc-800 hover:text-white relative 
            `}
            onClick={() => {
              updateFilter("category_ids", category.id);
              setColor(category.id);
            }}
          >
            {category?.category_name}
          </span>
        ))}
      </div>
      {/* List Prods  */}
      <div
        id="home_list_products"
        className="homeproducts grid min-[500px]:grid-cols-2 md:grid-cols-3 min-[1100px]:grid-cols-4 gap-[30px]"
      >
        {productQuery?.isLoading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <SkeletonProduct index={index} />
          ))
        ) : productQuery?.data?.metadata?.books.length !== 0 ? (
          productQuery?.data?.metadata?.books
            ?.sort(() => 0.5 - Math.random())
            ?.slice(0, 8)
            ?.map((product: IProduct) => (
              <div key={product?._id}>
                <Product dataProduct={product} />
              </div>
            ))
        ) : (
          <div>
            <p>Không tìm thấy sản phẩm tương ứng</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeProducts;
