import { Authentication } from "@/common/shared/authentication";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

const AuthGuard = ({ children }: { children: ReactNode }) => {
	const payload = Authentication();
	const location = useLocation();
	if (!payload && location.pathname.includes("thong-tin-tai-khoan")) {
		return <Navigate to={"/"} />;
	} else if (payload && !location.pathname.includes("thong-tin-tai-khoan")) {
		return <Navigate to={"/"} />;
	} else {
		return children;
	}
};

export default AuthGuard;
