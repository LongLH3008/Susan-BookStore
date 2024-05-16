import { ProdContextProvider } from "../../context/product/ContextProduct";
import Product from "../reuse/product/product";

type Props = {};

const HomeProducts = (props: Props) => {
	return (
		<div className="min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%] mb-[80px] min-[968px]:mb-[100px]">
			<h2 className="mb-[20px] text-center text-3xl text-zinc-800 font-medium tracking-wide">Our Products</h2>
			<p className="mb-[40px] text-[15px] text-zinc-500 text-center">A lot of books with each genre</p>
			<div
				id="btn_cate_home_products"
				className="mb-12 grid grid-cols-2 sm:flex sm:justify-center sm:items-center gap-4 *:cursor-pointer *:bg-zinc-200 *:text-sm *:text-zinc-600 *:px-[30px] *:py-[13px] *:rounded-[3px]"
			>
				<span className="hover:bg-zinc-800 hover:text-white relative">Adventure</span>
				<span className="hover:bg-zinc-800 hover:text-white relative">Biographic</span>
				<span className="hover:bg-zinc-800 hover:text-white relative">Children</span>
				<span className="hover:bg-zinc-800 hover:text-white relative">Cook</span>
			</div>
			{/* List Prods  */}
			<div
				id="home_list_products"
				className="homeproducts grid min-[500px]:grid-cols-2 md:grid-cols-3 min-[1100px]:grid-cols-4 gap-[30px]"
			>
				<ProdContextProvider>
					<Product />
				</ProdContextProvider>
			</div>
		</div>
	);
};

export default HomeProducts;
