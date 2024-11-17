import { FieldError, UseFormRegister } from "react-hook-form";
import { twMerge } from "tailwind-merge";

type Props = {
	field: string;
	label: string;
	type?: React.HTMLInputTypeAttribute | "select";
	floating?: boolean;
	className?: string;
	error?: FieldError | boolean;
	placeholder?: string;
	message?: string;
	required?: boolean;
	rounded?: boolean;
	disabled?: boolean;
	onchange?: (arg: any) => boolean;
	register: UseFormRegister<any>;
};

const CustomFloatingField = (args: Props) => {
	return (
		<div className="relative w-full mb-1 flex flex-col gap-1">
			{!args.floating && (
				<label className="flex items-center gap-1" htmlFor={args.field}>
					{args.label}
					<span className="text-sm text-red-500">*</span>
				</label>
			)}
			<input
				type={args.type ?? "text"}
				id={args.field}
				className={twMerge(`text-zinc-900 w-full text-sm outline-none peer disabled:bg-zinc-200 disabled:border-zinc-200
				${args.rounded && "rounded-md"}
                ${!args.error ? "border-zinc-300 focus:ring-[0.8px] ring-black" : "border-red-500 ring-0"}
				${args.floating && "block px-2.5 pb-2.5 pt-5"}
				${args.className}`)}
				placeholder={args.placeholder ?? " "}
				disabled={args.disabled}
				{...args.register(args.field)}
			/>
			{args.floating && (
				<label
					htmlFor={args.field}
					className={`
                ${!args.error ? "text-zinc-500" : "text-red-500"}
                absolute text-sm duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-[0.92] peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto`}
				>
					{args.required && <span className="text-red-500 mr-2 tracking-wfieldest">(*)</span>}
					{args.label}
				</label>
			)}
			<p
				className={`${
					!args.disabled && args.error && args.message ? "block" : "hidden"
				} text-red-500 -bottom-5 absolute left-0 text-[12px]`}
			>
				{args.message}
			</p>
		</div>
	);
};

export default CustomFloatingField;
