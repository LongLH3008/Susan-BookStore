import { userState } from "@/common/hooks/useAuth";
import { useLocalStorageCart } from "@/common/hooks/useLocalStorageCart";
import { usePayment } from "@/common/hooks/usePayment";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";

const BankingReturn = () => {
	const nav = useNavigate();
	const { id } = userState();
	const { afterPayment } = useLocalStorageCart();

	const { onSubmit: VerifyBankingReturn } = usePayment({
		action: "COD",
		onSuccess: () => {},
		onError: () => nav("/thanh-toan"),
	});

	useEffect(() => {
		(async () => {
			if (!id) afterPayment();
			const payload = {
				userId: id,
				paymentMethod: "VNPAY",
				url: window.location.href,
			};
			await VerifyBankingReturn(payload);
		})();
	}, []);

	return (
		<div className="h-screen flex flex-col gap-2 items-center justify-center">
			<h3 className="text-2xl font-semibold">Đang xử lý</h3>
			<BeatLoader />
		</div>
	);
};

export default BankingReturn;
