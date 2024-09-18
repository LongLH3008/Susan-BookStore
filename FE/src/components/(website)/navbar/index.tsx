import { userState } from "@/common/hooks/useAuth";
import { CategoryProvider } from "@/common/hooks/useCategories";
import { MegeMenuProvider } from "@/common/hooks/useMegaMenu";
import { ProductProvider } from "@/common/hooks/useProduct";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ScrollToTop from "../scrolltotop/scrolltoptop";
import DropdownInfoUser from "./dropdownInfoUser";
import DropdownMiniCart from "./dropdownMiniCart";
import DropdownSearch from "./dropdownSearch";
import DropdownShop from "./dropdownShop";
import ResponsiveSidebar from "./responsiveSidebar";

type Props = {};

const Navbar = (props: Props) => {
	const [scroll, setScroll] = useState(0);
	const { AuthorUser } = userState();

	useEffect(() => {
		AuthorUser();
		const handleScroll = () => {
			if (window.scrollY < 100) {
				setScroll(window.scrollY);
			}
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<>
			<div
				className={`
			${scroll < 5 && "h-[68px] lg:h-[95px] duration-0"}

			${scroll > 5 && scroll < 50 && "h-0 -top-20"}
			${scroll > 50 && "h-[68px] shadow-sm border-0 top-0 bg-[rgba(255,255,255,0.85)] opacity-100"}

			fixed hover:bg-white ease-in duration-500 z-30 w-full`}
			>
				<nav className="min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%] max-[1000px]:h-[68px] h-full text-[14px] grid grid-cols-2 lg:grid-cols-9 border-b">
					<Link id="logo_header" className="col-span-1 flex items-center h-full" to={"/"}>
						<img
							width={100}
							className="cursor-pointer"
							src="https://susan-demo.myshopify.com/cdn/shop/files/Logo_057b3bc4-c82c-4a1d-8aec-fc99c1e4b647_100x.png?v=1613600725"
							alt=""
						/>
					</Link>
					<div className="col-span-7 uppercase h-full relative max-[1000px]:hidden max-[1300px]:gap-[17%] max-[1300px]:mr-[17%] flex justify-center items-center gap-[8%] *:font-semibold transition-all">
						<Link className="hover:text-[#00BFC5] h-full flex items-center" to="/">
							trang chủ
						</Link>
						<CategoryProvider>
							<MegeMenuProvider>
								<DropdownShop />
							</MegeMenuProvider>
						</CategoryProvider>
						<Link
							className="hover:text-[#00BFC5] h-full flex items-center"
							to="/tin-tuc"
							state={{ from: location.pathname }}
						>
							tin tức
						</Link>
						<Link
							className="hover:text-[#00BFC5] h-full flex items-center"
							to="/gioi-thieu"
							state={{ from: location.pathname }}
						>
							giới thiệu
						</Link>
						<Link
							className="hover:text-[#00BFC5] h-full flex items-center"
							to="/lien-he"
							state={{ from: location.pathname }}
						>
							liên hệ
						</Link>
					</div>
					<div className="col-span-1 h-full flex justify-end items-center lg:gap-[25%] *:cursor-pointer relative">
						<ProductProvider>
							<DropdownSearch />
						</ProductProvider>
						<DropdownMiniCart />
						<DropdownInfoUser />
						<ResponsiveSidebar />
					</div>
				</nav>
			</div>
			<ScrollToTop />
		</>
	);
};

export default Navbar;
