import * as img from "@/assets/img";
import ProductFeatures from "./features";
import useProductContext, {
  ProdContextProvider,
} from "../../../context/ContextProduct";
import { Link } from "react-router-dom";

type Props = {};

const Product = () => {
  return (
    <ProdContextProvider>
      <ProdContent />
    </ProdContextProvider>
  );
};

const ProdContent = (props: Props) => {
  const { featuresProduct } = useProductContext();
  return (
    <>
      <section
        onMouseEnter={() => featuresProduct.open()}
        onMouseLeave={() => featuresProduct.close()}
        className="relative border cursor-pointer"
      >
        <div className="relative flex items-center justify-center h-[337px] overflow-hidden cursor-pointer *:text-white *:text-[14px] *:grid *:place-items-center">
          <Link to="/book_detail">
            <img className="w-full h-full" src={img.demo} alt="" />
          </Link>
          {/* Status */}
          <span className="absolute top-[5%] rounded-full left-[5%] bg-[#00BFC5] w-[50px] h-[30px]">
            New
          </span>
          {/* Discount */}
          <span className="absolute top-[5%] rounded-full right-[5%] bg-zinc-800 w-[50px] h-[30px]">
            - 11%
          </span>
        </div>

        <div
          className="flex flex-col gap-2 border-t py-4 px-3"
          data-dropdown-toggle="product1"
          data-dropdown-placement="top"
          data-dropdown-trigger="hover"
        >
          <Link
            to="/book_detail"
            className="text-zinc-700 text-[15px] font-semibold"
          >
            Name
          </Link>
          <p className="text-zinc-500">Author</p>
          <div>
            <span className="text-[16px] text-[#00BFC5] font-semibold">
              $ New Price
            </span>
            <span className="line-through ms-3 text-zinc-500">$ Old Price</span>
          </div>
        </div>
        {/* <ProductFeatures show={open} /> */}
        <ProductFeatures />
      </section>
    </>
  );
};

export default Product;
