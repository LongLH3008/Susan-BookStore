"use client";
import { BsFillCartCheckFill } from "react-icons/bs";
import { RiMessage2Fill } from "react-icons/ri";
import { PiWarningOctagonFill } from "react-icons/pi";
import { TbPlugConnectedX } from "react-icons/tb";
import { FaCheck } from "react-icons/fa";
import { Toast as CustomToast } from "flowbite-react";
import { useToast } from "@/common/hooks/useToast";

type TStatus = { color: string; icon: JSX.Element | null };

const status = (variant: string): TStatus => {
	switch (variant) {
		case "LOST_CONNECT":
			return {
				color: "text-white bg-red-600",
				icon: <TbPlugConnectedX />,
			};
		case "ADD_TO_CART":
			return {
				color: "text-white bg-[#33cc33]",
				icon: <BsFillCartCheckFill />,
			};
		case "DEFAULT":
			return {
				color: "text-white bg-black",
				icon: <RiMessage2Fill />,
			};
		case "SUCCESS":
			return {
				color: "text-white bg-[#33cc33]",
				icon: <FaCheck />,
			};
		case "ERROR":
			return {
				color: "text-white bg-red-600",
				icon: <PiWarningOctagonFill />,
			};
		default:
			return {
				color: "",
				icon: null,
			};
	}
};

export function Toast() {
	const { show, variant, content, close } = useToast();
	const { color, icon } = status(variant);

	return (
		<CustomToast
			className={`${
				!show ? "-top-16 -z-50" : "top-16 opacity-1 z-50"
			} w-2/3 sm:w-1/2 lg:w-1/4 border shadow-xl fixed right-1/2 translate-x-1/2 rounded-sm p-4 flex justify-between gap-2 items-center`}
		>
			<div className="flex justify-between items-center">
				<div
					className={`inline-flex h-8 w-8 *:h-5 *:w-5 shrink-0 items-center justify-center ${color} rounded-sm`}
				>
					{icon}
				</div>
				<div className="ml-3 text-sm font-normal">{content}</div>
			</div>
			<CustomToast.Toggle className="grid place-items-center self-end" onDismiss={close} />
		</CustomToast>
	);
}
