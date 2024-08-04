import Breadcrumb from "@/components/(website)/breadcrumb/breadcrumb";
import RequestOTP from "./_components/RequestOTP";
import { useState } from "react";
import CheckOTP from "./_components/CheckOTP";
import ChangePassword from "./_components/ChangePassword";

const ForgotPassword = () => {
	const [checkForgot, setCheckForgot] = useState<any>({ user: "", step: 1 });
	console.log(checkForgot);
	return (
		<>
			<Breadcrumb title="Forgot Password" />
			<div className="xl:px-[11.5%] 2xl:px-[17.5%] h-fit flex justify-center *:h-full py-[100px]">
				<div className="w-[540px] h-fit bg-[#f3f3f3] relative flex flex-col justify-start gap-2 items-center px-[40px] py-[37px]">
					<p className="text-[30px] leading-[36px] font-medium text-[#333] poppins">
						Forgot Password
					</p>
					<p className="text-[#666] text-[15px] leading-[15px]">
						Change password via confirm email and OTP
					</p>
					<div
						className={`mt-5 ${
							checkForgot.step == 3 ? "h-[30dvh]" : "h-[22dvh]"
						} relative w-full overflow-hidden`}
					>
						<RequestOTP open={checkForgot.step == 1} action={setCheckForgot} />
						<CheckOTP
							open={checkForgot.step == 2}
							action={setCheckForgot}
							user={checkForgot.user}
						/>
						<ChangePassword open={checkForgot.step == 3} user={checkForgot.user} />
					</div>
				</div>
			</div>
		</>
	);
};

export default ForgotPassword;
