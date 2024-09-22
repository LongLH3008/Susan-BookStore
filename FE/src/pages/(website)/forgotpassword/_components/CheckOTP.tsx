import { useAuth } from "@/common/hooks/useAuth";
import { useToast } from "@/common/hooks/useToast";
import { useState } from "react";
import { PulseLoader } from "react-spinners";

const CheckOTP = ({
	open,
	action,
	user,
}: {
	open: boolean;
	action: ({ step, user }: { step: number; user: string }) => void;
	user: string;
}) => {
	const [submit, setSubmit] = useState<boolean>(false);
	const [OTP, setOTP] = useState<string>("");

	const { toast } = useToast();

	const { onSubmit } = useAuth({
		action: "CHECK_OTP",
		onSuccess: () => {
			action({ user, step: 3 });
			setSubmit(false);
		},
		onError: (err: any) => {
			toast({ variant: err.status, content: err.message });
			setTimeout(() => {
				setSubmit(false);
			}, 500);
		},
	});

	const Loading = () => {
		onSubmit({ user_otp: OTP, user_name: user });
		setSubmit(true);
	};

	return (
		<div
			className={`${
				!open ? "top-full" : "top-0"
			} absolute border left-0 transition-all ease-in-out duration-300 w-full flex flex-col gap-3 h-full *:text-[14px] *:text-zinc-900 bg-white p-[30px]`}
		>
			<div className="relative">
				<input
					onChange={(e) => {
						setOTP(e.target.value);
					}}
					maxLength={6}
					type="text"
					className="border z-20 absolute top-0 left-0 w-full h-full opacity-0"
				/>
				<div className="flex justify-between items-center *:size-12 *:rounded-md *:cursor-text *:grid *:border *:text-zinc-500 *:place-items-center">
					{Array.from({ length: 6 }).map((_, index) => (
						<span
							className={`${
								OTP.length === index
									? "border-zinc-500 transition-all ease-in-out duration-200 scale-105"
									: ""
							}`}
							key={index}
						>
							{OTP[index] || "-"}
						</span>
					))}
				</div>
			</div>
			<div className="grid mt-2 gap-2 sm:flex sm:justify-between">
				{submit ? (
					<span className="flex justify-center items-center w-full bg-black py-[10px] px-[25px]">
						<PulseLoader color="#FFFFFF" size={12} />
					</span>
				) : (
					<button
						onClick={() => Loading()}
						className="w-full bg-black text-white py-[10px] px-[25px]"
						disabled={OTP.length !== 6}
					>
						Xác thực OTP
					</button>
				)}
			</div>
		</div>
	);
};

export default CheckOTP;
