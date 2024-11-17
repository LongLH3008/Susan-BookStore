import { Outlet } from "react-router-dom";
import Footer from "../components/(website)/footer/footer";
import Navbar from "../components/(website)/navbar";

type Props = {};

const LayoutClient = (props: Props) => {
	return (
		<>
			{/* min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%] => Responsive */}
			<div className="relative h-fit scroll-smooth fade-in ">
				<Navbar />
				<div className="pt-[68px] lg:pt-[95px] ">
					<Outlet />
				</div>
				<Footer />
			</div>
		</>
	);
};

export default LayoutClient;
