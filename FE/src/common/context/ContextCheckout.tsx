import { getUsers } from "@/services/auth.service";
import { getCartByUser } from "@/services/cart.service";
import { checkFeeShip } from "@/services/checkout.service";
import { joiResolver } from "@hookform/resolvers/joi";
import { ReactNode, createContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { userState } from "../hooks/useAuth";
import { useLocalStorageCart } from "../hooks/useLocalStorageCart";
import { useToast } from "../hooks/useToast";
import { FeeShip, ICheckout } from "../interfaces/checkout";
import { ToastVariant } from "../interfaces/toast";
import { checkoutValidate } from "../schemas/checkout";

export const CheckoutContext = createContext<any>({});

export function CheckoutProvider({ children }: { children: ReactNode }) {
	const { id } = useParams();
	const [data, setData] = useState<ICart[]>([]);
	const { cart_products } = useLocalStorageCart();
	const { id: user_id } = userState();
	const [feeShip, setFeeShip] = useState<string | number>(0);
	const [method, setMethod] = useState<"COD" | "VNPAY">("COD");
	const [chooseAddress, setChooseAddress] = useState<string>("");

	const { toast } = useToast();
	const nav = useNavigate();
	useEffect(() => {
		if (user_id) {
			(async () => {
				let res;
				try {
					const result = await getCartByUser(id as string);
					const user = await getUsers(id);
					console.log(user);
					form.setValue("name", user.metadata.user_name);
					res = result?.metadata.cart_products.filter((item: ICart) => item.selected);
				} catch (error) {
					nav("/gio-hang");
				}

				if (res?.length == 0) {
					setTimeout(() => {
						toast({
							variant: ToastVariant.DEFAULT,
							content: "Chưa có sản phẩm nào được chọn",
						});
					}, 700);
					nav("/gio-hang");
					return;
				} else {
					setData(res);
				}
			})();
		} else {
			if (cart_products.length == 0) {
				setTimeout(() => {
					toast({
						variant: ToastVariant.DEFAULT,
						content: "Chưa có sản phẩm nào được chọn",
					});
				}, 700);
				nav("/gio-hang");
			}
			setData(cart_products.filter((item) => item.selected));
		}
	}, []);

	const form = useForm<ICheckout>({
		resolver: joiResolver(checkoutValidate),
	});

	const calcFeeShip = async (arg: FeeShip) => {
		const result = await checkFeeShip(arg);
		if (!result) return;
		console.log(result);
		const { total } = result.metadata.output.data;
		setFeeShip(total);
	};

	return (
		<>
			<CheckoutContext.Provider
				value={{
					data,
					id,
					user_id,
					chooseAddress,
					setChooseAddress,
					toast,
					feeShip,
					setFeeShip,
					calcFeeShip,
					method,
					form,
					setMethod,
					nav,
				}}
			>
				{children}
			</CheckoutContext.Provider>
		</>
	);
}
