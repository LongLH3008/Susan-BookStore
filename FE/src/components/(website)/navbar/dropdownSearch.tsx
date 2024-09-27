import * as icon from "@/common/assets/icon";
import useProduct from "@/common/hooks/useProduct";
import { IProduct } from "@/common/interfaces/product";
import { customModalSearch } from "@/common/ui/CustomModalSearch";
import { Skeleton } from "@mui/material";
import { Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";

interface DataProductProps {
  dataProduct: IProduct[];
}
interface SearchForm {
  search: string;
}
const ResultBook = ({ dataProduct }: DataProductProps) => {
  if (!dataProduct || dataProduct.length === 0) {
    return <div>No products found.</div>;
  }

  return (
    <div>
      {dataProduct?.map((product: IProduct) => (
        <Link
          to={"/san-pham/" + product.slug}
          className="grid grid-cols-7 h-[100px]"
          key={product._id}
        >
          <span className="col-span-2 flex justify-center items-center overflow-hidden border">
            <img
              className="object-cover"
              src={product.coverImage}
              alt={product.title}
            />
          </span>
          <div className="ps-[25px] col-span-5 flex flex-col justify-center overflow-hidden relative">
            <p className="text-wrap text-[15px] font-semibold">
              {product.title}
            </p>
            <ul>
              <li>
                Discount - {product.discount}% ~{" "}
                <span className="line-through">${product.price}</span>
              </li>
              <li>${product.price}</li>
            </ul>
          </div>
        </Link>
      ))}
    </div>
  );
};

const DropdownSearch = () => {
  const [openModal, setOpenModal] = useState(false);
  const location = useLocation();
  const { updateFilter, productQuery } = useProduct();
  useEffect(() => {
    setOpenModal(false);
  }, [location]);

  const { register, handleSubmit } = useForm<SearchForm>();
  const onSubmit = (data: SearchForm) => {
    console.log(data.search);
  };
  return (
    <>
      <button
        className="max-[1000px]:hidden"
        onClick={() => setOpenModal(true)}
      >
        <img width={32} src={icon.search} alt="" />
      </button>
      <Modal
        theme={customModalSearch}
        show={openModal}
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full mx-auto">
            <label
              htmlFor="header_search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="header_search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-zinc-500 focus:border-zinc-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-zinc-500 dark:focus:border-zinc-500"
                placeholder="Search Books, Author..."
                {...register("search")}
                onChange={(e) => updateFilter("search", e.target.value)}
                required
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-zinc-700 hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-zinc-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-zinc-600 dark:hover:bg-zinc-700 dark:focus:ring-zinc-800"
              >
                Search
              </button>
            </div>
          </form>
        </Modal.Header>
        <Modal.Body>
          <div
            id="result_header_search"
            className="p-4 pt-0 md:p-5 grid grid-cols-2"
          >
            <div className="text-zinc-600 max-h-[300px] pb-5 grid gap-y-6 border-r overscrollHidden overflow-y-scroll scroll-smooth">
              {productQuery ? (
                <ResultBook
                  dataProduct={productQuery?.data?.metadata?.books || []}
                />
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-10 my-20">
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height="20dvh"
                    />
                    <div className="flex flex-col gap-1 border-t py-4 px-3">
                      <Skeleton variant="text" width="100%" />

                      <Skeleton variant="text" width="100%" height={24} />

                      <Skeleton variant="text" width="100%" />

                      <Skeleton variant="text" width="100%" height={28} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-10 my-20">
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height="20dvh"
                    />
                    <div className="flex flex-col gap-1 border-t py-4 px-3">
                      <Skeleton variant="text" width="100%" />

                      <Skeleton variant="text" width="100%" height={24} />

                      <Skeleton variant="text" width="100%" />

                      <Skeleton variant="text" width="100%" height={28} />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default DropdownSearch;
