import { OrderProvider } from "@/common/hooks/useOrder";
import { Outlet } from "react-router-dom";
import Aside from "../components/(dashboard)/Aside";
const DashboardLayout = () => {
	return (
		<div className="flex items-start overflow-hidden">
			<Aside />
			<div className="w-full overflow-hidden overflow-y-scroll h-screen p-10 bg-[#D6DaED]">
				<OrderProvider>
					<Outlet />
				</OrderProvider>
			</div>
		</div>
	);
};

export default DashboardLayout;
