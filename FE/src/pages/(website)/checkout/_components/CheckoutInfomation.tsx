import { CheckoutContext } from "@/common/context/ContextCheckout";
import { useLocalStorageCart } from "@/common/hooks/useLocalStorageCart";
import { usePayment } from "@/common/hooks/usePayment";
import { useToast } from "@/common/hooks/useToast";
import { ToastVariant } from "@/common/interfaces/toast";
import { useContext, useState } from "react";
import { BeatLoader } from "react-spinners";
import UserAddress from "./CheckoutUserAddress";
import Contact from "./Contact";
import Delivery from "./Delivery";
import Payment from "./Payment";
import Voucher from "./Voucher";

const CheckoutInfomation = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const { toast } = useToast();
	const { id, user_id, data, form, orderAddress_Payment_Discount, checkingOrder } = useContext(CheckoutContext);
	const { afterPayment } = useLocalStorageCart();

	const { onSubmit: PayCOD } = usePayment({
		action: "COD",
		onSuccess: () => {
			setLoading(false);
			if (!user_id) afterPayment();
		},
		onError: () => {
			setLoading(false),
				toast({
					variant: ToastVariant.ERROR,
					content: "Đã có lỗi xảy ra. Tạo đơn hàng không thành công",
				});
		},
	});

	const { onSubmit: PayBanking } = usePayment({
		action: "BANKING",
		onSuccess: () => {
			setLoading(false);
		},
		onError: () => {
			setLoading(false), toast({ variant: ToastVariant.ERROR, content: "Thanh toán không thành công" });
		},
	});

	const checkout = async () => {
		console.log(form.getValues());
		const isValid = await form.trigger();

		if (!isValid) {
			setLoading(false);
			return;
		}

		setLoading(true);
		form.setValue("districtId", Number(form.getValues("districtId")));
		const customerInfo = { ...form.getValues(), country: "viet nam" };

		const products = data.map((item: any) => {
			let prodItem = {
				bookId: item.product_id._id,
				quantity: item.product_quantity,
				code: null,
			};
			return prodItem;
		});

		const payload = {
			userId: id,
			paymentMethod: orderAddress_Payment_Discount.paymentMethod,
			customerInfo,
			products,
			code: orderAddress_Payment_Discount.discountCode,
		};

		if (orderAddress_Payment_Discount.paymentMethod == "VNPAY") {
			const bankingPayload = {
				bankCode: "NCB",
				amount: checkingOrder.total,
				orderInfo: {
					...payload,
				},
			};
			await PayBanking(bankingPayload);
		} else {
			await PayCOD(payload);
		}
	};

	return (
		<div className="w-[44.5%] max-[1000px]:w-full flex justify-end items-start">
			<form className="w-full h-full p-[33px] max-[1000px]:pr-0 pl-0 flex flex-col gap-5 lg:gap-[33px]">
				{id && <UserAddress user_id={id} />}
				<Contact />
				<Delivery />
				<Voucher />
				<Payment />
				<button
					type="button"
					onClick={() => checkout()}
					disabled={loading == true}
					className={`w-full rounded border border-zinc-300 h-[58px] font-medium
					${!loading && "hover:bg-zinc-800 hover:text-white"} duration-150 ease-in`}
				>
					{!loading ? "Thanh toán" : <BeatLoader />}
				</button>
				<div className="border-t  border-zinc-300 mt-10 text-zinc-500 text-[12px] pt-5">
					Bản quyền thuộc về Susan
				</div>
			</form>
		</div>
	);
};

export default CheckoutInfomation;
