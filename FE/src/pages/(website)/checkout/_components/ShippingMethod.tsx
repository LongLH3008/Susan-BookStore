import CustomRadioField from "../../../../components/(website)/radiofield/CustomRadioField";

type Props = {};

const ShippingMethod = (props: Props) => {
	return (
		<div className="relative flex flex-col gap-4">
			<p className="text-[16px] font-semibold">Phương thức vận chuyển</p>
			<CustomRadioField
				id="standard_shipping1"
				name="standard_shipping"
				content1="Tiêu chuẩn"
				content2="17.000 đ"
			/>
			<CustomRadioField
				id="standard_shipping2"
				name="standard_shipping"
				content1="Hỏa tốc (GHN)"
				content2="17.000 đ"
			/>
		</div>
	);
};

export default ShippingMethod;
