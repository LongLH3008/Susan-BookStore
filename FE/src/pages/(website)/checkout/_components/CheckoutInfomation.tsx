import { CheckoutContext } from "@/common/context/ContextCheckout";
import { useLocalStorageCart } from "@/common/hooks/useLocalStorageCart";
import { usePayment } from "@/common/hooks/usePayment";
import { useContext, useState } from "react";
import { BeatLoader } from "react-spinners";
import Contact from "./Contact";
import Delivery from "./Delivery";
import Payment from "./Payment";
import Voucher from "./Voucher";

const CheckoutInfomation = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const { id, user_id, data, form, method } = useContext(CheckoutContext);
	const { afterPayment } = useLocalStorageCart();

	const { onSubmit: PayCOD } = usePayment({
		action: "COD",
		onSuccess: () => {
			setLoading(false);
			if (user_id) afterPayment();
		},
		onError: () => setLoading(false),
	});

	const { onSubmit: PayBanking } = usePayment({
		action: "BANKING",
		onSuccess: () => {
			setLoading(false);
			if (user_id) afterPayment();
		},
		onError: () => setLoading(false),
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
			paymentMethod: method,
			customerInfo,
			products,
		};

		if (method == "VNPAY") {
			const bankingPayload = {
				amount: 200000,
				bankCode: "NCB",
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
			<form className="w-full h-full p-[33px] max-[1000px]:pr-0 pl-0 flex flex-col gap-[33px]">
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
