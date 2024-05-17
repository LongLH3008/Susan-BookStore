import { Outlet } from "react-router-dom";
import Navbar from "./components/reuse/navbar";
import Footer from "./components/reuse/footer/footer";

type Props = {};

const LayoutClient = (props: Props) => {
	return (
		<>
			{/* min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%] => Responsive */}
			<div className="relative h-fit scroll-smooth">
				<Navbar />
				<Outlet />
				<Footer />
			</div>
		</>
	);
};

export default LayoutClient;
