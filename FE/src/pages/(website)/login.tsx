import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/(website)/breadcrumb/breadcrumb";
import * as icon from "@/common/assets/icon";
import { useAuth } from "@/common/hooks/useAuth";
import { useToast } from "@/common/hooks/useToast";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { loginValidate } from "@/schemas/auth";

type Props = {};

const Login = (props: Props) => {
	const { toast } = useToast();
	const nav = useNavigate();

	const {
		handleSubmit,
		formState: { errors },
		register,
	} = useForm<ILogin>({ resolver: joiResolver(loginValidate) });

	const { onSubmit } = useAuth({
		action: "LOGIN",
		onSuccess: (data: any) => {
			const name = data.message.user.user_email.split("@")[0];
			toast(data.status, `Welcome ${name} !`);
			nav("/");
		},
		onError: (err: any) => {
			toast(err.status, err.message);
		},
	});
	return (
		<>
			<Breadcrumb title="Login" />
			<div className="xl:px-[11.5%] 2xl:px-[17.5%] h-fit flex justify-center *:h-full py-[100px]">
				<div className="w-[540px] h-full bg-[#f3f3f3] flex flex-col justify-between items-center px-[40px] py-[37px]">
					<p className="text-[30px] leading-[36px]  text-[#333] poppins">Login</p>
					<p className="text-[#666] text-[15px] leading-[15px]">
						Please login using account detail bellow.
					</p>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="mt-6 bg-white shadow-lg p-[30px] w-full gap-2 flex flex-col justify-between *:text-[14px]"
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
								{errors.user_email && (
									<span className="text-red-500 mr-2 tracking-widest">(*)</span>
								)}
								Email
							</label>
							<p
								className={`${
									errors.user_email ? "block" : "hidden"
								} text-red-500 -bottom-[18px] absolute left-0 text-[13px]`}
							>
								{errors.user_email?.message}
							</p>
						</div>
						<div
							className={`relative ${
								errors.user_password ? "mb-4" : "mb-1"
							} transition-all ease-in-out duration-150`}
						>
							<input
								type="password"
								className={`${
									!errors.user_password
										? "border-zinc-300 focus:ring-[0.8px] ring-black"
										: "border-red-500 ring-0"
								} 
                text-zinc-900 block px-2.5 pb-2.5 pt-5 w-full text-sm outline-none  peer`}
								placeholder=" "
								{...register("user_password")}
							/>
							<label
								className={`${!errors.user_password ? "text-zinc-500" : "text-red-500"} 
                absolute text-sm duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-[0.92] peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto`}
							>
								{errors.user_password && (
									<span className="text-red-500 mr-2 tracking-widest">(*)</span>
								)}
								Password
							</label>
							<p
								className={`${
									errors.user_password ? "block" : "hidden"
								} text-red-500 -bottom-[18px] absolute left-0 text-[13px]`}
							>
								{errors.user_password?.message}
							</p>
						</div>
						<button
							type="submit"
							className="max-[500px]:w-full text-white bg-black py-[10px] px-[25px]"
						>
							Sign In
						</button>
						<button
							type="submit"
							className="max-[500px]:w-full text-black border border-zinc-400 duration-200 hover:bg-black hover:text-white bg-white py-[10px] px-[25px] flex justify-center gap-2"
						>
							<img src={icon.ggIcon} width={20} alt="" /> Sign In with Google
						</button>
						<div className="flex flex-wrap justify-center min-[500px]:justify-between min-[500px]:items-start">
							<Link to="/forgotpassword" className=" pt-1">
								Forgot your password
							</Link>
							<Link
								to="/register"
								state={{ from: location.pathname }}
								className="max-[500px]:text-center"
							>
								Create account
							</Link>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default Login;
