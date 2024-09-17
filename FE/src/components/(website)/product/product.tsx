import useProductStore from "@/common/Zustand/detailProduct";
import { IProduct } from "@/common/interfaces/product";
import { ConvertVNDString } from "@/common/shared/round-number";
import { Link, useLocation } from "react-router-dom";
import useProductContext, { ProdContextProvider } from "../../../common/context/ContextProduct";
import ProductFeatures from "./features";

type Props = {
	dataProduct: IProduct;
};

const StarRating = ({ rating }: { rating: number }) => {
	const fullStars = Math.floor(rating); // Số ngôi sao vàng đầy đủ
	const hasHalfStar = rating % 1 >= 0.3 && rating % 1 <= 0.7; // Kiểm tra xem có sao rưỡi không

	// Tạo mảng để hiển thị các ngôi sao
	const stars = [];

	// Thêm ngôi sao đầy đủ
	for (let i = 0; i < fullStars; i++) {
		stars.push(<i key={i} className="fa-solid fa-star text-amber-400 ps-1 text-xs"></i>);
	}

	// Thêm ngôi sao rưỡi nếu có
	if (hasHalfStar) {
		stars.push(<i className="fa-solid fa-star-half-stroke text-amber-400 text-xs"></i>);
	}

	return <div>{stars}</div>;
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
				onMouseEnter={() => {
					featuresProduct.open();
					setSelectedProduct(dataProduct);
				}}
				onMouseLeave={() => featuresProduct.close()}
				className="relative border cursor-pointer"
			>
				<div
					key={dataProduct._id}
					className="relative flex items-center justify-center h-[35dvh] overflow-hidden cursor-pointer *:text-white *:text-[14px] *:grid *:place-items-center"
				>
					<Link to={"/book/" + dataProduct?._id} state={{ from: location.pathname }}>
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
					<div
						className={`flex justify-between items-center ${
							dataProduct?.rating == 0 ? "hidden" : ""
						}`}
					>
						<p className="text-zinc-500 text-sm">Đã bán : {dataProduct?.sold}</p>
						<StarRating rating={dataProduct?.rating} />
					</div>
					<Link
						to="/book_detail"
						state={{ from: location.pathname }}
						className="text-zinc-700 text-[15px] font-semibold"
					>
						{dataProduct?.title}
					</Link>
					<p className="text-zinc-500">{dataProduct?.author}</p>
					<div>
						<span className="text-[16px] text-[#00BFC5] font-semibold">
							{ConvertVNDString(
								dataProduct?.price - (dataProduct?.price * dataProduct?.discount) / 100
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
