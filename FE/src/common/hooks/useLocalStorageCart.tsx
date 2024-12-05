import { create } from "zustand";
import { ItemCartConstant } from "../constants/ItemCart";
import { IProduct } from "../interfaces/product";

type LocalStorageCart = {
	cart_products: ICart[];
	getCart: () => void;
	add: (arg: IProduct, quantity?: number) => void;
	increase: (id: string) => void;
	decrease: (id: string) => void;
	remove: (id: string) => void;
	select: (arg: { _id: string; selected: boolean }) => void;
	selectAllLocal: () => void;
	removeSelectAllLocal: () => void;
	afterPayment: () => void;
	changeQuantity: (id: string, quantity: number) => void;
};
export const useLocalStorageCart = create<LocalStorageCart>((set) => ({
	cart_products: [],

	getCart: () => {
		const cart = JSON.parse(localStorage.getItem("cart_products") as string);
		console.log(cart);
		if (!Array.isArray(cart) || !cart) {
			localStorage.setItem("cart_products", JSON.stringify([]));
			set({ cart_products: [] });
		} else {
			set({ cart_products: cart });
		}
	},

	afterPayment: () => {
		set((state) => {
			const cart_products = state.cart_products.filter((item) => !item.selected);
			localStorage.setItem("cart_products", JSON.stringify(cart_products));
			return { cart_products };
		});
	},

	select: (arg) => {
		set((state) => {
			const cart_products = state.cart_products.map((item: ICart) =>
				item._id == arg._id ? { ...item, selected: !item.selected } : item
			);
			console.log(cart_products);
			localStorage.setItem("cart_products", JSON.stringify(cart_products));
			return { cart_products };
		});
	},

	selectAllLocal: () => {
		set((state) => {
			const cart_products = state.cart_products.map((item) => ({ ...item, selected: true }));
			localStorage.setItem("cart_products", JSON.stringify(cart_products));
			return { cart_products };
		});
	},

	removeSelectAllLocal: () => {
		set((state) => {
			const cart_products = state.cart_products.map((item) => ({ ...item, selected: false }));
			localStorage.setItem("cart_products", JSON.stringify(cart_products));
			return { cart_products };
		});
	},

	changeQuantity: (id, quantity) => {
		set((state) => {
			const cart_products = state.cart_products.map((item) =>
				item.product_id._id == id ? { ...item, product_quantity: quantity } : item
			);
			localStorage.setItem("cart_products", JSON.stringify(cart_products));
			return { cart_products };
		});
	},

	add: (arg, quantity) => {
		set((state) => {
			const check = state.cart_products.find((item) => item.product_id._id == arg._id);
			if (check) {
				const cart_products = state.cart_products.map((item: ICart) =>
					item.product_id._id == arg._id
						? {
								...item,
								product_quantity: !quantity
									? item.product_quantity + 1
									: item.product_quantity + quantity,
						  }
						: item
				);
				return { cart_products };
			}
			const newItem: ICart = {
				...ItemCartConstant,
				product_id: {
					_id: arg._id,
					author: arg.author,
					coverImage: arg.coverImage,
					price: arg.price,
					discount: arg.discount,
					format: arg.format,
					slug: arg.slug,
					stock: arg.stock,
					title: arg.title,
				},
				product_quantity: quantity ?? 1,
				_id: arg._id,
			};
			const cart_products = [...state.cart_products, newItem];
			localStorage.setItem("cart_products", JSON.stringify(cart_products));
			return { cart_products };
		});
	},

	increase: (id) => {
		set((state) => {
			const updatedCart = state.cart_products.map((item) =>
				item.product_id._id === id ? { ...item, product_quantity: item.product_quantity + 1 } : item
			);
			localStorage.setItem("cart_products", JSON.stringify(updatedCart));
			return { cart_products: updatedCart };
		});
	},

	decrease: (id) => {
		set((state) => {
			const updatedCart = state.cart_products
				.map((item) =>
					item.product_id._id === id
						? { ...item, product_quantity: Math.max(item.product_quantity - 1, 0) }
						: item
				)
				.filter((item) => item.product_quantity > 0); // Loại bỏ sản phẩm có số lượng = 0
			localStorage.setItem("cart_products", JSON.stringify(updatedCart));
			return { cart_products: updatedCart };
		});
	},

	remove: (id) => {
		set((state) => {
			const updatedCart = state.cart_products.filter((item) => item.product_id._id !== id);
			localStorage.setItem("cart_products", JSON.stringify(updatedCart));
			return { cart_products: updatedCart };
		});
	},
}));
