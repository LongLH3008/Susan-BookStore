import useProduct from "@/common/hooks/useProduct";
import { IProduct } from "@/common/interfaces/product";
import Product from "../../../../components/(website)/product/product";

const LatestProducts = () => {
	const { productQuery } = useProduct();

	return (
		<div className="min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%] mb-[80px] min-[968px]:mb-[100px]">
			<h2 className="mb-[20px] text-center text-3xl text-zinc-800 font-medium tracking-wide">
				Các sản phẩm mới
			</h2>
			<p className="mb-[50px] text-[15px] text-zinc-500 text-center">Sách với các thể loại mới nhất</p>

			{/* List Prods  */}
			<div className="grid min-[500px]:grid-cols-2 md:grid-cols-3 min-[1100px]:grid-cols-4 gap-[30px]">
				{productQuery?.data?.metadata?.books
					.slice()
					?.reverse()
					.slice(0, 4)
					?.map((product: IProduct, index: number) => (
						<Product key={index} dataProduct={product} />
					))}
			</div>
		</div>
	);
};

export default LatestProducts;
