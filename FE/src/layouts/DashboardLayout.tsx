import { Outlet } from "react-router-dom";
import Aside from "../components/(dashboard)/Aside";
const DashboardLayout = () => {
	return (
		<div className="flex items-start">
			<Aside />
			<div className="w-full overflow-y-scroll h-screen p-10 bg-zinc-100">
				<Outlet />
			</div>
		</div>
	);
};

export default DashboardLayout;
