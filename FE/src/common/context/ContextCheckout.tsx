import { getUsers } from "@/services/auth.service";
import { getCartByUser } from "@/services/cart.service";
import { calcCheckout, checkFeeShip } from "@/services/checkout.service";
import { joiResolver } from "@hookform/resolvers/joi";
import { ReactNode, createContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { userState } from "../hooks/useAuth";
import { useLocalStorageCart } from "../hooks/useLocalStorageCart";
import { useToast } from "../hooks/useToast";
import { FeeShip, ICheckout, IOrderChecking } from "../interfaces/checkout";
import { ToastVariant } from "../interfaces/toast";
import { checkoutValidate } from "../schemas/checkout";

export type checkingOrder = {
	total: number;
	subtotal: number;
	discountAmount: number;
	discountAmountVoucher: number;
	feeShip: number;
};

export type orderAddress_Payment_Discount = {
	paymentMethod: "VNPAY" | "COD";
	chooseAddress: "";
	discountCode: "";
};

export const CheckoutContext = createContext<any>({});

// vccc
export function CheckoutProvider({ children }: { children: ReactNode }) {
	const { id } = useParams();
	const [data, setData] = useState<ICart[]>([]);
	const { cart_products } = useLocalStorageCart();
	const { id: user_id } = userState();
	const [checkingOrder, setcheckingOrder] = useState<checkingOrder>({
		feeShip: 0,
		subtotal: 0,
		total: 0,
		discountAmountVoucher: 0,
		discountAmount: 0,
	});
	const [orderAddress_Payment_Discount, setOrder_A_P_D] = useState<orderAddress_Payment_Discount>({
		chooseAddress: "",
		paymentMethod: "COD",
		discountCode: "",
	});

	const { toast } = useToast();
	const nav = useNavigate();

	const form = useForm<ICheckout>({
		resolver: joiResolver(checkoutValidate),
	});

	useEffect(() => {
		const loadData = async () => {
			if (user_id) {
				const res = await fetchCartAndUserData(id as string);
				if (!res) return;
				await processOrder(res);
			} else {
				if (cart_products.length === 0) {
					handleEmptyCart();
					return;
				}
				setData(cart_products.filter((item) => item.selected));
				await processOrder(cart_products.filter((item) => item.selected));
			}
		};

		loadData();
	}, []);

	const fetchCartAndUserData = async (id: string) => {
		try {
			const result = await getCartByUser(id);
			const res = result?.metadata.cart_products.filter((item: ICart) => item.selected);

			if (!res || res.length === 0) {
				handleEmptyCart();
				return null;
			}

			const user = await getUsers(id);
			form.setValue("name", user.metadata.user_name);
			form.setValue("email", user.metadata.user_email);
			setData(res);

			return res;
		} catch (error) {
			nav("/gio-hang");
			return null;
		}
	};

	const handleEmptyCart = () => {
		setTimeout(() => {
			toast({
				variant: ToastVariant.DEFAULT,
				content: "Chưa có sản phẩm nào được chọn",
			});
		}, 700);
		nav("/gio-hang");
	};

	const processOrder = async (cartProducts: ICart[]) => {
		const payloadChecking: IOrderChecking = {
			products: cartProducts.map((item: ICart) => ({
				bookId: item.product_id._id,
				quantity: item.product_quantity,
			})),
		};

		const checking = await calcCheckout(payloadChecking);
		const { subtotal, total, discountAmount } = checking?.metadata;
		setcheckingOrder({
			...checkingOrder,
			subtotal,
			total,
			discountAmount,
		});
	};

	const calcFeeShip = async (arg: FeeShip) => {
		const result = await checkFeeShip(arg);
		if (!result) return;
		const { total } = result.metadata.output.data;
		const feeShip = typeof total !== "number" ? 0 : total;
		setcheckingOrder((prev) => {
			return {
				...prev,
				feeShip: feeShip,
				total: prev.subtotal - prev.discountAmount - prev.discountAmountVoucher + feeShip,
			};
		});
	};

	return (
		<>
			<CheckoutContext.Provider
				value={{
					data,
					id,
					user_id,
					setOrder_A_P_D,
					orderAddress_Payment_Discount,
					toast,
					calcFeeShip,
					checkingOrder,
					setcheckingOrder,
					form,
					nav,
				}}
			>
				{children}
			</CheckoutContext.Provider>
		</>
	);
}
