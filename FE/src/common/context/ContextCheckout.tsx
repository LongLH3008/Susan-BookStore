import { getCartByUser } from "@/services/cart.service";
import { checkFeeShip } from "@/services/checkout.service";
import { joiResolver } from "@hookform/resolvers/joi";
import { ReactNode, createContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../hooks/useToast";
import { FeeShip, ICheckout } from "../interfaces/checkout";
import { ToastVariant } from "../interfaces/toast";
import { checkoutValidate } from "../schemas/checkout";

export const CheckoutContext = createContext<any>({});

export function CheckoutProvider({ children }: { children: ReactNode }) {
	const { id } = useParams();
	const [data, setData] = useState([]);
	const [feeShip, setFeeShip] = useState<string | number>(0);
	const [method, setMethod] = useState<"COD" | "VNPAY">("COD");
	const { toast } = useToast();
	const nav = useNavigate();

	useEffect(() => {
		console.log(id);
		(async () => {
			try {
				const result = await getCartByUser(id as string);
				const data = result?.metadata.cart_products.filter((item: ICart) => item.selected);
				if (data.length == 0) {
					console.log(data);
					setTimeout(() => {
						toast({ variant: ToastVariant.DEFAULT, content: "Chưa có sản phẩm nào được chọn" });
					}, 700);
					nav("/gio-hang");
					return;
				} else {
					setData(data);
				}
			} catch (error) {
				nav("/gio-hang");
			}
		})();
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
				value={{ data, id, toast, feeShip, setFeeShip, calcFeeShip, method, form, setMethod, nav }}
			>
				{children}
			</CheckoutContext.Provider>
		</>
	);
}
