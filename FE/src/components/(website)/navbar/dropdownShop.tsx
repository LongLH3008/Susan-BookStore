import { Link } from "react-router-dom";
import * as icon from "@/common/assets/icon";
import * as img from "@/common/assets/img";
import { useState } from "react";
import useCategory from "@/common/hooks/useCategories";
import { ICategory } from "@/common/interfaces/category";
import useMegaMenu from "@/common/hooks/useMegaMenu";
import { IProduct } from "@/common/interfaces/product";

const DropdownShop = () => {
  const { CategoryQuery } = useCategory();
  const { author, Publishers, BestSeller } = useMegaMenu();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsModalOpen(true);
  };

  const handleMouseLeave = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Link
        className="hover:text-[#00BFC5] h-full grid place-items-center"
        to="/shop"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span className="flex justify-between items-center">
          SHOP <icon.arrowDownSvg />
        </span>
      </Link>
      {isModalOpen && (
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="absolute top-full -left-[50%] w-[1000px] z-20 p-[50px] pt-[45px] text-[14px] bg-white shadow-md dark:bg-gray-700"
        >
          <div className="grid grid-cols-4 mb-10 *:border-r *:border-r-zinc-200 *:ps-6 *:flex *:flex-col *:gap-y-6 first:ps-0 *:font-normal *:text-zinc-500">
            <div className="">
              <h3 className="text-zinc-800 uppercase font-semibold my-2">
                book type
              </h3>
              {CategoryQuery?.data?.metadata?.map((category: ICategory) => (
                <Link to={"/"} className="hover:text-[#00CFB5]">
                  {category?.category_name}
                </Link>
              ))}
            </div>
            <div className="">
              <h3 className="text-zinc-800 uppercase font-semibold my-2 ">
                author
              </h3>
              {author.slice(0, 4).map((aut: string) => (
                <Link to={"/"} className="hover:text-[#00CFB5]">
                  {aut}
                </Link>
              ))}
            </div>
            <div className="">
              <h3 className="text-zinc-800 uppercase font-semibold my-2 ">
                publisher
              </h3>

              {Publishers.slice(0, 4).map((Publ: string) => (
                <Link to={"/"} className="hover:text-[#00CFB5]">
                  {Publ}
                </Link>
              ))}
            </div>
            <div className="border-none">
              <h3 className="text-zinc-800 uppercase font-semibold my-2">
                bestseller
              </h3>
              {BestSeller.slice(0, 4).map((product: IProduct) => (
                <Link
                  to={"/book/" + product._id}
                  className="hover:text-[#00CFB5]"
                >
                  {product.title}
                </Link>
              ))}
            </div>
          </div>
          <Link to={"/shop"}>
            <img src={img.bannerDropdownShop} alt="" />
          </Link>
        </div>
      )}
    </>
  );
};

export default DropdownShop;
