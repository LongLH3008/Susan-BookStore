import CustomRadioField from "../../../../components/(website)/radiofield/CustomRadioField";

type Props = {};

const Payment = (props: Props) => {
	return (
		<div className="relative flex flex-col gap-4">
			<div className="flex flex-col">
				<p className="text-[21px] font-semibold">Payment</p>
				<p className="text-[14px] text-zinc-500">All transactions are secure and encrypted.</p>
			</div>
			<CustomRadioField id="cash_payment" name="payment" content1="Cash" content2="$0.17" />
			<CustomRadioField
				id="credit_payment"
				name="payment"
				content1={
					<>
						<i className="fa-regular fa-credit-card mr-2 text-[16px]"></i>
						<span>Credit card</span>
					</>
				}
				content2="$0.17"
			/>
			<CustomRadioField
				id="visa_payment"
				name="payment"
				content1={
					<>
						<i className="fa-brands fa-cc-visa mr-2 text-[16px]"></i>
						<span>Visa</span>
					</>
				}
				content2="$0.17"
			/>
		</div>
	);
};

export default Payment;
