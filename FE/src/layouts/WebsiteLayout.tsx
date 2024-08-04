import { Outlet } from "react-router-dom";
import Navbar from "../components/(website)/navbar";
import Footer from "../components/(website)/footer/footer";
import { Toast } from "@/components/(website)/toast/Toast";

type Props = {};

const LayoutClient = (props: Props) => {
	return (
		<>
			{/* min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%] => Responsive */}
			<div className="relative h-fit scroll-smooth fade-in">
				<Navbar />
				<div className="pt-[68px] lg:pt-[95px]">
					<Toast />
					<Outlet />
				</div>
				<Footer />
			</div>
		</>
	);
};

export default LayoutClient;
