import { Outlet } from "react-router-dom";
import Navbar from "./components/reuse/navbar";
import Footer from "./components/reuse/footer/footer";

type Props = {};

const LayoutClient = (props: Props) => {
	return (
		<>
			{/* min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%] => Responsive */}
			<Navbar />
			<Outlet />
			<Footer />
		</>
	);
};

export default LayoutClient;
