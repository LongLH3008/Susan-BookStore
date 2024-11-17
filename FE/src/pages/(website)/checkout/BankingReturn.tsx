import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";

type Props = {};

const BankingReturn = (props: Props) => {
	const nav = useNavigate();

	// useEffect(() => {
	// 	(async () => {
	// 		try {
	// 			const result = await checkBankingSuccess(window.location.href);
	// 			setTimeout(() => {
	// 				nav("/thanh-toan-thanh-cong");
	// 			}, 1000);
	// 		} catch (error) {}
	// 	})();
	// }, []);

	return (
		<div className="h-screen flex flex-col gap-2 items-center justify-center">
			<h3 className="text-2xl font-semibold">Đang xử lý</h3>
			<BeatLoader />
		</div>
	);
};

export default BankingReturn;
