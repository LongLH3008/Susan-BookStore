import * as icon from "@/common/assets/icon";
import * as img from "@/common/assets/img";
import useCategory from "@/common/hooks/useCategories";
import useMegaMenu from "@/common/hooks/useMegaMenu";
import { ICategory } from "@/common/interfaces/category";
import { IProduct } from "@/common/interfaces/product";
import { Skeleton } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

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
        to="/cua-hang"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span className="flex justify-between items-center">
          CỬA HÀNG <icon.arrowDownSvg />
        </span>
      </Link>
      {isModalOpen && (
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="absolute top-full border border-t-0 w-[1000px] z-20 p-[50px] pt-[45px] text-[14px] bg-white shadow-md dark:bg-gray-700"
        >
          <div className="grid grid-cols-4 mb-10 *:border-r *:border-r-zinc-200 *:ps-6 *:flex *:flex-col *:gap-y-6 first:ps-0 *:font-normal *:text-zinc-500">
            <div className="">
              <h3 className="text-zinc-800 uppercase font-semibold my-2">
                thể loại
              </h3>
              {Array.isArray(CategoryQuery?.data?.metadata) &&
              CategoryQuery?.data?.metadata.length === 0 ? (
                <>
                  <Skeleton variant="text" width="100%" />
                  <Skeleton variant="text" width="100%" />
                  <Skeleton variant="text" width="100%" />
                  <Skeleton variant="text" width="100%" />
                </>
              ) : (
                CategoryQuery?.data?.metadata
                  ?.slice(0, 4)
                  ?.map((category: ICategory) => (
                    <Link
                      to={"/cua-hang?q=" + category?.category_name}
                      className="hover:text-[#00CFB5] truncate"
                    >
                      {category?.category_name}
                    </Link>
                  ))
              )}
            </div>
            <div className="">
              <h3 className="text-zinc-800 uppercase font-semibold my-2 ">
                tác giả
              </h3>
              {Array.isArray(author) && author.length === 0 ? (
                <>
                  <Skeleton variant="text" width="90%" />
                  <Skeleton variant="text" width="90%" />
                  <Skeleton variant="text" width="90%" />
                  <Skeleton variant="text" width="90%" />
                </>
              ) : (
                author.slice(0, 4).map((aut: string) => (
                  <Link
                    to={"/cua-hang?q=" + aut}
                    className="hover:text-[#00CFB5] truncate"
                  >
                    {aut}
                  </Link>
                ))
              )}
            </div>
            <div className="">
              <h3 className="text-zinc-800 uppercase font-semibold my-2 ">
                nhà xuất bản
              </h3>

              {Array.isArray(Publishers) && Publishers.length === 0 ? (
                <>
                  <Skeleton variant="text" width="90%" />
                  <Skeleton variant="text" width="90%" />
                  <Skeleton variant="text" width="90%" />
                  <Skeleton variant="text" width="90%" />
                </>
              ) : (
                Publishers.slice(0, 4).map((Publ: string) => (
                  <Link
                    to={"/cua-hang?q=" + Publ}
                    className="hover:text-[#00CFB5] truncate"
                  >
                    {Publ}
                  </Link>
                ))
              )}
            </div>
            <div className="border-none">
              <h3 className="text-zinc-800 uppercase font-semibold my-2">
                bán chạy
              </h3>
              {Array.isArray(BestSeller) && BestSeller.length === 0 ? (
                <>
                  <Skeleton variant="text" width="90%" />
                  <Skeleton variant="text" width="90%" />
                  <Skeleton variant="text" width="90%" />
                  <Skeleton variant="text" width="90%" />
                </>
              ) : (
                BestSeller.slice(0, 4).map((product: IProduct) => (
                  <Link
                    to={"/san-pham/" + product.slug}
                    className="hover:text-[#00CFB5] truncate"
                  >
                    {product.title}
                  </Link>
                ))
              )}
            </div>
          </div>
          <Link to={"/cua-hang"}>
            <img src={img.bannerDropdownShop} alt="" />
          </Link>
        </div>
      )}
    </>
  );
};

export default DropdownShop;
