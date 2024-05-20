import { FlowbiteDrawerTheme } from "flowbite-react";

export const CustomDrawerSidebar: FlowbiteDrawerTheme = {
	root: {
		base: "fixed z-40 overflow-y-auto transition-transform",
		backdrop: "fixed inset-0 z-30 bg-gray-900/60",
		edge: "bottom-16",
		position: {
			top: {
				on: "left-0 right-0 top-0 w-full transform-none",
				off: "left-0 right-0 top-0 w-full -translate-y-full",
			},
			right: {
				on: "right-0 top-0 h-screen w-[95%] sm:w-[52%] transform-none duration-[0.4s] ease-in",
				off: "right-0 top-0 h-screen w-[95%] sm:w-[52%] translate-x-full duration-[0.4s] ease-in",
			},
			bottom: {
				on: "bottom-0 left-0 right-0 w-full transform-none",
				off: "bottom-0 left-0 right-0 w-full translate-y-full",
			},
			left: {
				on: "left-0 top-0 h-screen w-[95%] sm:w-[52%] transform-none",
				off: "left-0 top-0 h-screen w-[95%] sm:w-[52%] -translate-x-full",
			},
		},
	},
	header: {
		inner: {
			closeButton: "hidden",
			closeIcon: "hidden",
			titleIcon: "hidden",
			titleText: "",
		},
		collapsed: {
			on: "hidden",
			off: "block",
		},
	},
	items: {
		base: "",
	},
};
