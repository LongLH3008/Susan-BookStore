import { ReactNode } from "react";


type Props = {
	id: string;
	name: string;
	content1: string | ReactNode ;
	content2?: string | ReactNode;
};

const CustomRadioField = ({ id, name, content1, content2 }: Props) => {
	return (
		<div className="flex items-center ps-4 border border-zinc-300 rounded">
			<input
				id={id}
				type="radio"
				defaultValue=""
				name={name}
				className="w-4 h-4 mr-3 text-zinc-800 focus:ring-zinc-500 focus:ring-1 "
			/>
			<label
				htmlFor={id}
				className="w-full cursor-pointer flex justify-between items-center p-4 pl-0 ms-2 text-sm font-medium text-gray-900"
			>
				<p>{content1}</p>
				<span>{content2}</span>
			</label>
		</div>
	);
};

export default CustomRadioField;
