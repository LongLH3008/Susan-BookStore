import * as img from "@/common/assets/img";
import { PulseLoader } from "react-spinners";

type Props = {};

const Loader = (props: Props) => {
	return (
		<div className="h-screen z-50 flex flex-col gap-2 justify-center items-center">
			<img className="w-16 rounded-full ease-in-out border-2 border-black" src={img.favicon} alt="" />
			<PulseLoader speedMultiplier={0.75} size={10} color="black" />
		</div>
	);
};

export default Loader;
