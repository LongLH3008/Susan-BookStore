"use client";
import { useToast } from "@/common/hooks/useToast";
import { ToastVariant } from "@/common/interfaces/toast";
import { BsFillCartCheckFill, BsFillQuestionOctagonFill } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { PiWarningOctagonFill } from "react-icons/pi";
import { RiMessage2Fill } from "react-icons/ri";
import { TbPlugConnectedX } from "react-icons/tb";

type TStatus = { color: string; icon: JSX.Element | null };

const status = (variant: ToastVariant): TStatus => {
	switch (variant) {
		case ToastVariant.LOST_CONNECT:
			return {
				color: "text-white bg-red-600",
				icon: <TbPlugConnectedX />,
			};
		case ToastVariant.ADD_TO_CART:
			return {
				color: "text-white bg-[#33cc33]",
				icon: <BsFillCartCheckFill />,
			};
		case ToastVariant.DEFAULT:
			return {
				color: "text-white bg-black",
				icon: <RiMessage2Fill />,
			};
		case ToastVariant.SUCCESS:
			return {
				color: "text-white bg-[#33cc33]",
				icon: <FaCheck />,
			};
		case ToastVariant.ERROR:
			return {
				color: "text-white bg-red-600",
				icon: <PiWarningOctagonFill />,
			};
		case ToastVariant.CONFIRM:
			return {
				color: "text-white bg-red-600",
				icon: <BsFillQuestionOctagonFill />,
			};
		default:
			return {
				color: "",
				icon: null,
			};
	}
};

export function Toast() {
	const { show, variant, content, close, confirmTextButton, confirm, cancel, cancelTextButton } = useToast();
	const { color, icon } = status(variant);

	return (
		<>
			{variant == ToastVariant.CONFIRM && (
				<div
					className={`w-full fixed bottom-0 left-0 h-screen flex items-center justify-center bg-[rgba(0,0,0,0.3)] text-zinc-500
					${show ? "z-30 " : "-z-50"}
					`}
				></div>
			)}
			<div
				className={`${
					show ? "top-5 z-50" : "-top-full -z-50"
				} w-2/3 duration-500 bg-white ease-in-out transition-all sm:w-1/2 lg:w-1/4 border shadow-xl fixed right-1/2 translate-x-1/2 rounded-sm p-4 flex justify-between gap-2 items-start flex-col`}
			>
				<div className="flex justify-between items-center">
					<div
						className={`inline-flex h-8 w-8 *:h-5 *:w-5 shrink-0 items-center justify-center ${color} rounded-sm`}
					>
						{icon}
					</div>
					<div className="ml-3 text-sm text-zinc-600 font-normal">{content}</div>
				</div>
				{variant == ToastVariant.CONFIRM ? (
					<div className="flex w-full justify-end items-center gap-1 text-[13px]">
						<span
							className="p-3 py-2 rounded-sm cursor-pointer border border-zinc-200 hover:border-zinc-800 hover:text-zinc-800 duration-200"
							onClick={close}
						>
							{cancelTextButton ?? "Hủy"}
						</span>
						<span
							className="p-3 py-2 rounded-sm cursor-pointer border border-zinc-200 hover:border-zinc-800 hover:text-zinc-800 duration-200"
							onClick={() => confirm()}
						>
							{confirmTextButton}
						</span>
					</div>
				) : (
					<span
						className="grid place-items-center self-end absolute top-0 right-0 p-2 cursor-pointer rounded-lg hover:bg-zinc-100"
						onClick={close}
					>
						<IoClose />
					</span>
				)}
			</div>
		</>
	);
}
