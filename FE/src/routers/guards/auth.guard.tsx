import { Authentication } from "@/common/shared/authentication";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }: { children: ReactNode }) => {
	const payload = Authentication();
	if (payload) {
		return <Navigate to={"/"} />;
	} else {
		return children;
	}
};

export default AuthGuard;
