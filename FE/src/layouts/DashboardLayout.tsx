import Nav from "@/components/(dashboard)/Nav";
import { Flowbite } from "flowbite-react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Aside from "../components/(dashboard)/Aside";
const DashboardLayout = () => {
	const [showState, setShowState] = useState(true);
	return (
		<>
			<Flowbite>
				<div className="container max-w-full bg-gray-50 dark:bg-gray-800 h-[100%]">
					<Nav showState={showState} setShowState={setShowState} />
					<Aside showState={showState} />
				</div>
			</Flowbite>
			<Outlet />
		</>
	);
};

export default DashboardLayout;
