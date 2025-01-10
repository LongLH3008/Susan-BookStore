import * as img from "@/common/assets/img";
import { ReactNode, Suspense } from "react";
import { PulseLoader } from "react-spinners";

export const LoadPage = () => {
	return (
		<div className="h-screen z-50 flex flex-col gap-2 justify-center items-center">
			<img className="w-16 rounded-full ease-in-out border-2 border-black" src={img.favicon} alt="" />
			<PulseLoader speedMultiplier={1} size={8} color="black" />
		</div>
	);
};

const Loader = ({ children, load }: { children: ReactNode; load: ReactNode }) => {
	return <Suspense fallback={load}>{children}</Suspense>;
};

export default Loader;
