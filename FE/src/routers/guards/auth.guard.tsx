import { Authentication } from "@/common/shared/authentication";
import { Navigate, Outlet } from "react-router-dom";

const AuthGuard = () => {
	const payload = Authentication();
	if (payload) {
		return <Navigate to={"/"} />;
	} else {
		return (
			<>
				<Outlet />
			</>
		);
	}
};

export default AuthGuard;
