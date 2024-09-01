import * as img from "@/common/assets/img";
import ProductFeatures from "./features";
import useProductContext, {
  ProdContextProvider,
} from "../../../common/context/ContextProduct";
import { Link, useLocation } from "react-router-dom";
import useProduct from "@/common/hooks/useProduct";
import { IProduct } from "@/common/interfaces/product";
import useProductStore from "@/common/Zustand/detailProduct";
import { useEffect } from "react";

type Props = {
  dataProduct: IProduct;
};

const Product = ({ dataProduct }: Props) => {
  // console.log(dataProduct);

  return (
    <ProdContextProvider>
      <ProdContent dataProduct={dataProduct} />
    </ProdContextProvider>
  );
};

const ProdContent = ({ dataProduct }: Props) => {
  const { featuresProduct } = useProductContext();
  const location = useLocation(); // Lấy location từ useLocation
  console.log(dataProduct);
  const { setSelectedProduct, clearSelectedProduct } = useProductStore();

  // useEffect(() => {
  //   setSelectedProduct(dataProduct);
  // }, [dataProduct]);
  return (
    <>
      <section
        onMouseEnter={() => {
          featuresProduct.open();
          setSelectedProduct(dataProduct);
        }}
        onMouseLeave={() => featuresProduct.close()}
        className="relative border cursor-pointer"
      >
        <div
          key={dataProduct._id}
          className="relative flex items-center justify-center h-[337px] overflow-hidden cursor-pointer *:text-white *:text-[14px] *:grid *:place-items-center"
        >
          <Link to="/book_detail" state={{ from: location.pathname }}>
            <img
              className="w-full h-full"
              src={dataProduct?.product_thumb}
              alt={dataProduct?.product_name}
            />
          </Link>
          {/* Status */}
          {/* {status && (
            <span className="absolute top-[5%] rounded-full left-[5%] bg-[#00BFC5] w-[50px] h-[30px]">
              {status}
            </span>
          )} */}
          {/* Discount */}
          {dataProduct?.products_discount > 0 && (
            <span className="absolute top-[5%] rounded-full right-[5%] bg-zinc-800 w-[50px] h-[30px]">
              - {dataProduct?.products_discount}%
            </span>
          )}
        </div>

        <div
          className="flex flex-col gap-2 border-t py-4 px-3"
          data-dropdown-toggle="product1"
          data-dropdown-placement="top"
          data-dropdown-trigger="hover"
        >
          <Link
            to="/book_detail"
            state={{ from: location.pathname }}
            className="text-zinc-700 text-[15px] font-semibold"
          >
            {dataProduct?.product_name}
          </Link>
          <p className="text-zinc-500">Author</p>
          <div>
            <span className="text-[16px] text-[#00BFC5] font-semibold">
              $
              {dataProduct?.product_price -
                (dataProduct?.product_price * dataProduct?.products_discount) /
                  100}
            </span>
            {dataProduct?.products_discount > 0 && (
              <span className="line-through ms-3 text-zinc-500">
                ${dataProduct?.product_price}
              </span>
            )}
          </div>
        </div>
        <ProductFeatures />
      </section>
    </>
  );
};

export default Product;
