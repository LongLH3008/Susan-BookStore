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
		case "lostconnect":
			return {
				color: "text-white bg-red-600",
				icon: <TbPlugConnectedX />,
			};
		case "addtocart":
			return {
				color: "text-white bg-[#33cc33]",
				icon: <BsFillCartCheckFill />,
			};
		case "default":
			return {
				color: "text-white bg-black",
				icon: <RiMessage2Fill />,
			};
		case "success":
			return {
				color: "text-white bg-[#33cc33]",
				icon: <FaCheck />,
			};
		case "error":
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
				!show ? "toast-out -z-50" : "toast-in z-50"
			} border shadow-xl fixed right-[40%] rounded-sm w-[20%] p-4 flex justify-between gap-2 items-center`}
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
