import { getCartByUser } from "@/services/cart.service";
import { joiResolver } from "@hookform/resolvers/joi";
import { useQuery } from "@tanstack/react-query";
import { ReactNode, createContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { userState } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import { ToastVariant } from "../interfaces/toast";
import { checkoutValidate } from "../schemas/checkout";

export const CheckoutContext = createContext<any>({});

export function CheckoutProvider({ children }: { children: ReactNode }) {
	const { id, AuthorUser } = userState();
	const [method, setMethod] = useState<"COD" | "VNPAY">("COD");
	const { toast } = useToast();
	const nav = useNavigate();

	useEffect(() => {
		AuthorUser();
	}, []);

	const form = useForm<ICheckout>({
		resolver: joiResolver(checkoutValidate),
	});

	const { data } = useQuery({
		queryKey: ["cart_checkout"],
		queryFn: async () => {
			try {
				const result = await getCartByUser(id);
				const data = result?.metadata.cart_products.filter((item: ICart) => item.selected);
				if (data.lenth == 0) {
					setTimeout(() => {
						toast({ variant: ToastVariant.DEFAULT, content: "Chưa có sản phẩm nào được chọn" });
					}, 700);
				}
				return data;
			} catch (error) {
				setTimeout(() => {
					toast({ variant: ToastVariant.ERROR, content: "Đã có lỗi xảy ra" });
				}, 700);
				nav("/gio-hang");
			}
		},
	});

	return (
		<>
			<CheckoutContext.Provider value={{ data, id, toast, method, form, setMethod, nav }}>
				{children}
			</CheckoutContext.Provider>
			{data && data?.length == 0 && <Navigate to={"/gio-hang"} />}
		</>
	);
}
