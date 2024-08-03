import { create } from "zustand";

type useToast = {
	show: boolean;
	variant: string;
	content: string;
	toast: (variant: string, content: string, duartion?: number) => void;
	close: () => void;
};

export const useToast = create<useToast>((set) => ({
	timer: 0,
	show: false,
	variant: "",
	content: "",
	toast: (variant, content, duration = 2500) => {
		const timer = setTimeout(() => {
			set({ show: false, variant: "", content: "" });
		}, duration);
		set({ show: true, variant, content });
	},
	close: () => set({ show: false, variant: "", content: "" }),
}));
