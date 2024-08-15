import * as img from "@/common/assets/img";
import ProductFeatures from "./features";
import useProductContext, {
  ProdContextProvider,
} from "../../../common/context/ContextProduct";
import { Link, useLocation } from "react-router-dom";

type Props = {
  name: string;
  thumb: string;
  status: string;
  price: number;
  discount: number;
};

const Product = ({ name, thumb, status = "", price, discount = 0 }: Props) => {
  return (
    <ProdContextProvider>
      <ProdContent
        name={name}
        status={status}
        price={price}
        discount={discount}
        thumb={thumb}
      />
    </ProdContextProvider>
  );
};

const ProdContent = ({
  name,
  thumb,
  status = "",
  price,
  discount = 0,
}: Props) => {
  const { featuresProduct } = useProductContext();
  const location = useLocation(); // Lấy location từ useLocation

  return (
    <>
      <section
        onMouseEnter={() => featuresProduct.open()}
        onMouseLeave={() => featuresProduct.close()}
        className="relative border cursor-pointer"
      >
        <div className="relative flex items-center justify-center h-[337px] overflow-hidden cursor-pointer *:text-white *:text-[14px] *:grid *:place-items-center">
          <Link to="/book_detail" state={{ from: location.pathname }}>
            <img className="w-full h-full" src={thumb} alt={name} />
          </Link>
          {/* Status */}
          {status && (
            <span className="absolute top-[5%] rounded-full left-[5%] bg-[#00BFC5] w-[50px] h-[30px]">
              {status}
            </span>
          )}
          {/* Discount */}
          {discount > 0 && (
            <span className="absolute top-[5%] rounded-full right-[5%] bg-zinc-800 w-[50px] h-[30px]">
              - {discount}%
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
            {name}
          </Link>
          <p className="text-zinc-500">Author</p>
          <div>
            <span className="text-[16px] text-[#00BFC5] font-semibold">
              ${price - (price * discount) / 100}
            </span>
            {discount > 0 && (
              <span className="line-through ms-3 text-zinc-500">${price}</span>
            )}
          </div>
        </div>
        <ProductFeatures />
      </section>
    </>
  );
};

export default Product;
