import Product from "../reuse/product/product";

type Props = {};

const LatestProducts = (props: Props) => {
	return (
		<div className="min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%] mb-[80px] min-[968px]:mb-[100px]">
			<h2 className="mb-[20px] text-center text-3xl text-zinc-800 font-medium tracking-wide">Latest Products</h2>
			<p className="mb-[50px] text-[15px] text-zinc-500 text-center">The latest genres and books</p>

			{/* List Prods  */}
			<div className="grid min-[500px]:grid-cols-2 md:grid-cols-3 min-[1100px]:grid-cols-4 gap-[30px]">
				<Product />
				<Product />
				<Product />
				<Product />
			</div>
		</div>
	);
};

export default LatestProducts;
