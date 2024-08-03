
type Props = {
	id: string;
	type?: string;
	label: string;
	isValidated?: boolean;
	message: string;
	required?: boolean;
	rounded?: boolean;
};

const CustomFloatingField = ({ id , type, label, isValidated, message, rounded , required }: Props) => {
	return (
		<div className="relative mb-1">
			<input
				type={type ?? 'text'}
				id={id}
				name={id}
				className={`
				${rounded && 'rounded-md'}
                ${isValidated ? "border-zinc-300 focus:ring-[0.8px] ring-black" : "border-red-500 ring-0"} 
                text-zinc-900 block px-2.5 pb-2.5 pt-5 w-full text-sm outline-none  peer`}
				placeholder=" "
			/>
			<label
				htmlFor={id}
				className={`
                ${isValidated ? "text-zinc-500" : "text-red-500"} 
                absolute text-sm duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-[0.92] peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto`}
			>
				{required && (
					<span className="text-red-500 mr-2 tracking-widest">(*)</span>
				)}
				{label}
			</label>
			<p className={`${!isValidated ? "block" : "hidden"} text-red-500 -bottom-[18px] absolute left-0 text-[13px]`}>
				{message}
			</p>
		</div>
	);
};

export default CustomFloatingField;
