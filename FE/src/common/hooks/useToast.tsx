import { create } from "zustand";

type useToast = {
	show: boolean;
	variant: string;
	content: string;
	toast: (
		variant: "LOST_CONNECT" | "ADD_TO_CART" | "DEFAULT" | "SUCCESS" | "ERROR" | "",
		content: string,
		duartion?: number
	) => void;
	close: () => void;
};

export const useToast = create<useToast>((set) => ({
	show: false,
	variant: "",
	content: "",
	toast: (variant, content, duration = 2500) => {
		set((prev) => {
			if (prev.show) {
				return prev;
			}
			setTimeout(() => {
				set({ show: false, variant: "", content: "" });
			}, duration);

			return { show: true, variant, content };
		});
	},
	close: () => set({ show: false, variant: "", content: "" }),
}));
