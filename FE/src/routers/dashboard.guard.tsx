import { Authentication } from "@/common/shared/authentication";
import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const DashboardGuard = ({ children }: { children: ReactNode }) => {
	const [isAdmin, setIsAdmin] = useState<boolean>(false);
	useEffect(() => {
		const payload = Authentication();
		if (payload && payload.user_role == "admin") {
			setIsAdmin(true);
		}
	}, []);

	return <>{!isAdmin ? <Navigate to={"/"} /> : children}</>;
};

export default DashboardGuard;
