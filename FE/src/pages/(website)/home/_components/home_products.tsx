import useProduct from "@/common/hooks/useProduct";
import Product from "../../../../components/(website)/product/product";
import { IProduct } from "@/common/interfaces/product";
import { useEffect, useState } from "react";
import useCategory from "@/common/hooks/useCategories";
import { ICategory } from "@/common/interfaces/category";

const HomeProducts = () => {
  const { productQuery, setCategoryIds } = useProduct();
  const { CategoryQuery, setLimit } = useCategory();
  const [color, setColor] = useState("66d41fa11a33469d8361f95a");

  useEffect(() => {
    setLimit(4);
    setCategoryIds("66d41fa11a33469d8361f95a");
  }, [setCategoryIds, setLimit]);
  return (
    <div className="min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%] mb-[80px] min-[968px]:mb-[100px]">
      <h2 className="mb-[20px] text-center text-3xl text-zinc-800 font-medium tracking-wide">
        Our Products
      </h2>
      <p className="mb-[40px] text-[15px] text-zinc-500 text-center">
        A lot of books with each genre
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
              setCategoryIds(category.id);
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
        {productQuery?.data?.metadata?.books.length !== 0 ? (
          productQuery?.data?.metadata?.books
            ?.slice(0, 8)
            ?.map((product: IProduct, index: number) => (
              <Product key={index} dataProduct={product} />
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
