import { Link } from "react-router-dom";
import DropdownShop from "./dropdownShop";
import DropdownInfoUser from "./dropdownInfoUser";
import DropdownMiniCart from "./dropdownMiniCart";
import DropdownSearch from "./dropdownSearch";
import ResponsiveSidebar from "./responsiveSidebar";
import { useEffect, useState } from "react";
import ScrollToTop from "../scrolltotop/scrolltoptop";

type Props = {};

const Navbar = (props: Props) => {
	const [scroll, setScroll] = useState(0);

	useEffect(() => {
		const handleScroll = () => setScroll(window.scrollY);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<>
			<div
				className={`
			${scroll < 5 && "h-[68px] lg:h-[95px] duration-0"}
			${scroll > 50 && scroll < 100 && "h-0 -top-20"}
			${scroll > 100 && "h-[68px] shadow-sm border-0 top-0 bg-[rgba(255,255,255,0.5)] opacity-100"}
			sticky hover:bg-white ease-in duration-500 z-30 w-full`}
			>
				<nav className="min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%] max-[1000px]:h-[68px] h-full text-[14px] flex justify-between items-center border-b">
					<Link id="logo_header" to={"/"}>
						<img
							width={100}
							className="cursor-pointer"
							src="https://susan-demo.myshopify.com/cdn/shop/files/Logo_057b3bc4-c82c-4a1d-8aec-fc99c1e4b647_100x.png?v=1613600725"
							alt=""
						/>
					</Link>
					<div className="w-[40%] h-full relative max-[1000px]:hidden max-[1300px]:gap-[17%] max-[1300px]:mr-[17%] flex justify-start items-center gap-[14%] *:font-semibold mr-[15%] transition-all">
						<Link className="hover:text-[#00BFC5] h-full grid place-items-center" to="/">
							HOME
						</Link>
						<DropdownShop />
						<Link className="hover:text-[#00BFC5] h-full grid place-items-center" to="/blog" state={{ from: location.pathname }}>
							BLOG
						</Link>
						<Link className="hover:text-[#00BFC5] h-full grid place-items-center" to="/about" state={{ from: location.pathname }}>
							ABOUT
						</Link>
						<Link className="hover:text-[#00BFC5] h-full grid place-items-center" to="/contact" state={{ from: location.pathname }}>
							CONTACT
						</Link>
					</div>
					<div className="h-full flex justify-end items-center max-[1000px]:gap-[10%] max-[1000px]:w-[20%] gap-[25%] *:cursor-pointer">
						<DropdownSearch />
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
