import { create } from "zustand";
import { ToastVariant } from "../interfaces/toast";

type useToast = {
	show: boolean;
	variant: ToastVariant;
	content: string;

	confirm: Function;
	confirmTextButton: string;

	cancel?: Function;
	cancelTextButton?: string;

	toast: (args: {
		variant: ToastVariant;
		content: string;
		duration?: number;
		confirm?: Function;
		confirmTextButton?: string;
		cancel?: Function;
		cancelTextButton?: string;
	}) => void;

	close: () => void;
};

export const useToast = create<useToast>((set) => ({
	// Normal notifications
	show: false,
	variant: ToastVariant[""],
	content: "",

	// For confirm notification
	confirmTextButton: "",
	confirm: () => {},
	cancelTextButton: "",
	cancel: () => {},

	// Xử lý popup / toast
	toast: ({ variant, content, duration = 2500, confirm, confirmTextButton, cancel, cancelTextButton }) => {
		// Nếu là confirm
		if (variant == ToastVariant.CONFIRM) {
			set({ show: true, variant, content, confirm, confirmTextButton, cancel, cancelTextButton });
			document.querySelector("body")?.classList.add("overflow-y-hidden");
			return;
		}

		// Nếu là thông báo thường
		set((prev) => {
			if (prev.show) {
				return prev;
			}
			setTimeout(() => {
				set({ show: false, variant: ToastVariant[""], content: "" });
			}, duration);

			return { show: true, variant, content };
		});
	},

	// Close toast
	close: () => {
		set((prev) => {
			if (prev.variant === ToastVariant.CONFIRM) {
				document.querySelector("body")?.classList.remove("overflow-y-hidden");
			}
			return { show: false, variant: ToastVariant[""] };
		});
	},
}));
