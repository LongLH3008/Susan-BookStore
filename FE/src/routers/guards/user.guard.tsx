import { Authentication } from "@/common/shared/authentication";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const UserGuard = ({ children }: { children: ReactNode }) => {
	const payload = Authentication();
	if (!payload || payload.user_role == "user") {
		return children;
	} else {
		return <Navigate to={"/quan-tri"} />;
	}
};

export default UserGuard;
