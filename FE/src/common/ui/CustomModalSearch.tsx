import { FlowbiteModalTheme } from "flowbite-react";

export const customModalSearch: FlowbiteModalTheme = {
	root: {
		base: "fixed inset-x-0 top-0 z-50 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
		show: {
			on: "flex bg-gray-900 bg-opacity-50 dark:bg-opacity-80",
			off: "hidden",
		},
		sizes: {
			sm: "max-w-sm",
			md: "max-w-md",
			lg: "max-w-lg",
			xl: "max-w-xl",
			"2xl": "w-[1000px]",
			"3xl": "max-w-3xl",
			"4xl": "max-w-4xl",
			"5xl": "max-w-5xl",
			"6xl": "max-w-6xl",
			"7xl": "max-w-7xl",
		},
		positions: {
			"top-left": "items-start justify-start",
			"top-center": "items-start justify-center",
			"top-right": "items-start justify-end",
			"center-left": "items-center justify-start",
			center: "items-center justify-center",
			"center-right": "items-center justify-end",
			"bottom-right": "items-end justify-end",
			"bottom-center": "items-end justify-center",
			"bottom-left": "items-end justify-start",
		},
	},
	content: {
		base: "relative h-full w-full p-4 md:h-auto",
		inner: "relative max-h-[520px] overflow-hidden rounded-lg bg-white shadow",
	},
	body: {
		base: "overflow-auto px-6 pb-3",
		popup: "pt-0",
	},
	header: {
		// base: "flex items-start justify-between rounded-t p-5 dark:border-gray-600",
		base: "p-8",
		popup: "border-b-0 p-2",
		title: "flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600",
		close: {
			base: "absolute border-0 outline-0 ring-0  right-2 top-2 text-gray-400 bg-transparent hover:bg-zinc-500 hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center",
			icon: "h-5 w-5",
		},
	},
	footer: {
		base: "h-10",
		popup: "border-0",
	},
};
