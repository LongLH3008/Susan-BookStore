import CustomRadioField from "../../reuse/radiofield/CustomRadioField";

type Props = {};

const ShippingMethod = (props: Props) => {
	return (
		<div className="relative flex flex-col gap-4">
			<p className="text-[16px] font-semibold">Shipping method</p>
			<CustomRadioField id="standard_shipping" name="standard_shipping" content1="Standard" content2="$0.17" />
		</div>
	);
};

export default ShippingMethod;
