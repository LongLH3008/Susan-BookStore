import useProductStore from "@/common/Zustand/detailProduct";
import { IProduct } from "@/common/interfaces/product";
import { ConvertVNDString } from "@/common/shared/round-number";
import { Link, useLocation } from "react-router-dom";
import useProductContext, {
  ProdContextProvider,
} from "../../../common/context/ContextProduct";
import ProductFeatures from "./features";
import { StarRating } from "../StarRating/StarRating";
import { Tooltip } from "@mui/material";

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
  // console.log(dataProduct);
  const { setSelectedProduct } = useProductStore();

  // useEffect(() => {
  //   setSelectedProduct(dataProduct);
  // }, [dataProduct]);
  return (
    <>
      <section
        key={dataProduct._id}
        onMouseEnter={() => {
          featuresProduct.open();
          setSelectedProduct(dataProduct);
        }}
        onMouseLeave={() => featuresProduct.close()}
        className="relative border cursor-pointer"
      >
        <div className="relative flex items-center justify-center h-[35dvh] overflow-hidden cursor-pointer *:text-white *:text-[14px] *:grid *:place-items-center">
          <Link
            to={"/san-pham/" + dataProduct?.slug}
            state={{ from: location.pathname }}
          >
            <img
              className="w-full h-full object-cover"
              src={dataProduct?.coverImage}
              alt={dataProduct?.title}
            />
          </Link>
          {/* Status */}
          {/* {status && (
            <span className="absolute top-[5%] rounded-full left-[5%] bg-[#00BFC5] w-[50px] h-[30px]">
              {status}
            </span>
          )} */}
          {/* Discount */}
          {dataProduct?.discount > 0 && (
            <span className="absolute top-[5%] rounded-full right-[5%] bg-zinc-800 w-[50px] h-[30px]">
              - {dataProduct?.discount}%
            </span>
          )}
        </div>

        <div
          className="flex flex-col gap-1 border-t py-4 px-3"
          data-dropdown-toggle="product1"
          data-dropdown-placement="top"
          data-dropdown-trigger="hover"
        >
          <div className={`flex justify-between items-center `}>
            <p className="text-zinc-500 text-sm">
              Đã bán : {dataProduct?.sold}
            </p>
            {dataProduct?.rating ? (
              <StarRating rating={dataProduct?.rating} />
            ) : (
              <StarRating rating={5} />
            )}
          </div>
          <Tooltip title={dataProduct?.title}>
            <Link
              to="/book_detail"
              state={{ from: location.pathname }}
              className="text-zinc-700 text-[15px] font-semibold truncate"
            >
              {dataProduct?.title}
            </Link>
          </Tooltip>
          <p className="text-zinc-500 truncate">{dataProduct?.author}</p>
          <div>
            <span className="text-[16px] text-[#00BFC5] font-semibold">
              {ConvertVNDString(
                dataProduct?.price -
                  (dataProduct?.price * dataProduct?.discount) / 100
              )}
              đ
            </span>
            {dataProduct?.discount > 0 && (
              <span className="line-through ms-3 text-zinc-500">
                {ConvertVNDString(dataProduct?.price)}đ
              </span>
            )}
          </div>
        </div>
        <ProductFeatures product_id={dataProduct?._id} />
      </section>
    </>
  );
};

export default Product;
