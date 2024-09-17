import { useAuth } from "@/common/hooks/useAuth";
import { useToast } from "@/common/hooks/useToast";
import { requestOTP } from "@/schemas/auth";
import { joiResolver } from "@hookform/resolvers/joi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PulseLoader } from "react-spinners";

const RequestOTP = ({
	open,
	action,
}: {
	open: boolean;
	action: ({ user, step }: { user: string; step: number }) => void;
}) => {
	const [submit, setSubmit] = useState<boolean>(false);
	const { toast } = useToast();
	const {
		handleSubmit,
		formState: { errors },
		register,
	} = useForm<IForgotPassword>({ resolver: joiResolver(requestOTP) });

	const { onSubmit } = useAuth({
		action: "REQUEST_OTP",
		onSuccess: (data: any) => {
			console.log(data);
			action({ user: data.message.username, step: 2 });
			setSubmit(false);
		},
		onError: (err: any) => {
			toast(err.status, err.message);
			setTimeout(() => {
				setSubmit(false);
			}, 500);
		},
	});

	const Loading = (dt: any) => {
		onSubmit(dt);
		setSubmit(true);
	};

	return (
		<form
			onSubmit={handleSubmit(Loading)}
			className={`${
				!open ? "-top-full" : "top-0"
			} absolute border left-0 transition-all ease-in-out duration-300 w-full flex flex-col gap-3 h-full *:text-[14px] *:text-zinc-900 bg-white p-[30px]`}
		>
			<div
				className={`relative ${
					errors.user_email ? "mb-4" : "mb-1"
				} transition-all ease-in-out duration-150`}
			>
				<input
					type="text"
					className={`${
						!errors.user_email
							? "border-zinc-300 focus:ring-[0.8px] ring-black"
							: "border-red-500 ring-0"
					} 
text-zinc-900 block px-2.5 pb-2.5 pt-5 w-full text-sm outline-none  peer`}
					placeholder=" "
					{...register("user_email")}
				/>
				<label
					className={`${!errors.user_email ? "text-zinc-500" : "text-red-500"} 
absolute text-sm duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-[0.92] peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto`}
				>
					{errors.user_email && <span className="text-red-500 mr-2 tracking-widest">(*)</span>}
					Email của bạn
				</label>
				<p
					className={`${
						errors.user_email ? "block" : "hidden"
					} text-red-500 -bottom-[18px] absolute left-0 text-[13px]`}
				>
					{errors.user_email?.message}
				</p>
			</div>
			<div className="grid mt-2 gap-2 sm:flex sm:justify-between">
				{submit ? (
					<span className="flex justify-center items-center w-full bg-black py-[10px] px-[25px]">
						<PulseLoader color="#FFFFFF" size={12} />
					</span>
				) : (
					<button type="submit" className="w-full bg-black text-white py-[10px] px-[25px]">
						Gửi OTP
					</button>
				)}
			</div>
		</form>
	);
};

export default RequestOTP;
