import { Authentication } from "@/common/shared/authentication";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const DashboardGuard = ({ children }: { children: ReactNode }) => {
	const payload = Authentication();
	if (payload && payload.user_role == "admin") {
		return children;
	} else {
		return <Navigate to={"/"} />;
	}
};

export default DashboardGuard;
