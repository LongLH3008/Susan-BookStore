import * as Website from "@/pages/(website)";
import { useRoutes } from "react-router-dom";
import AuthRoutes from "./router.auth";
import ClientRoutes from "./router.client";
import DashboardRoutes from "./router.dashboard";

const RouterWebsite = () => {
	const routers = useRoutes([
		...ClientRoutes,
		...AuthRoutes,
		...DashboardRoutes,
		{ path: "*", element: <Website.NotFound404 /> },
	]);
	return routers;
};

export default RouterWebsite;
