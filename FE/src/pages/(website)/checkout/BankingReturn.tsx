import { userState } from "@/common/hooks/useAuth";
import { usePayment } from "@/common/hooks/usePayment";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";

type Props = {};

const BankingReturn = () => {
	const nav = useNavigate();
	const { id } = userState();

	const { onSubmit: VerifyBankingReturn } = usePayment({
		action: "COD",
		onSuccess: () => {},
		onError: () => nav("/thanh-toan"),
	});

	useEffect(() => {
		(async () => {
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
