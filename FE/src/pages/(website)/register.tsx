import { useAuth } from "@/common/hooks/useAuth";
import { useToast } from "@/common/hooks/useToast";
import { registerValidate } from "@/schemas/auth";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/(website)/breadcrumb/breadcrumb";

type Props = {};

const Register = (props: Props) => {
	const { toast } = useToast();
	const nav = useNavigate();
	const {
		handleSubmit,
		formState: { errors },
		register,
	} = useForm<IRegister>({ resolver: joiResolver(registerValidate) });

	const { onSubmit } = useAuth({
		action: "REGISTER",
		onSuccess: (data: any) => {
			toast(data.status, `Đăng kí thành công`);
			nav("/dang-nhap");
		},
		onError: (err: any) => {
			let message = err.message;
			if (err.message.includes("Account")) {
				message = "Tài khoản đã tồn tại";
			}
			toast(err.status, message);
		},
	});

	return (
		<>
			<Breadcrumb title="Đăng kí" />
			<div className="xl:px-[11.5%] 2xl:px-[17.5%] h-fit flex justify-center *:h-full py-[100px]">
				<div className="w-[540px] h-fit bg-[#f3f3f3] flex flex-col justify-start gap-2 items-center px-[40px] py-[37px]">
					<p className="text-[30px] leading-[36px] font-medium text-[#333]">Tạo tài khoản</p>
					<p className="text-[#666] text-[15px] leading-[15px]">
						Điền thông tin của bạn phía dưới.
					</p>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="w-full flex flex-col gap-3 justify-between mt-5 h-full *:text-[14px] *:text-zinc-900 bg-white p-[30px]"
					>
						<div
							className={`relative ${
								errors.user_name ? "mb-4" : "mb-1"
							} transition-all ease-in-out duration-150`}
						>
							<input
								type="text"
								className={`${
									!errors.user_name
										? "border-zinc-300 focus:ring-[0.8px] ring-black"
										: "border-red-500 ring-0"
								} 
                text-zinc-900 block px-2.5 pb-2.5 pt-5 w-full text-sm outline-none  peer`}
								placeholder=" "
								{...register("user_name")}
							/>
							<label
								className={`${!errors.user_name ? "text-zinc-500" : "text-red-500"} 
                absolute text-sm duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-[0.92] peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto`}
							>
								{errors.user_name && (
									<span className="text-red-500 mr-2 tracking-widest">(*)</span>
								)}
								Tên
							</label>
							<p
								className={`${
									errors.user_name ? "block" : "hidden"
								} text-red-500 -bottom-[18px] absolute left-0 text-[13px]`}
							>
								{errors.user_name?.message}
							</p>
						</div>
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
								Mật khẩu
							</label>
							<p
								className={`${
									errors.user_password ? "block" : "hidden"
								} text-red-500 -bottom-[18px] absolute left-0 text-[13px]`}
							>
								{errors.user_password?.message}
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
									!errors.user_confirmpassword
										? "border-zinc-300 focus:ring-[0.8px] ring-black"
										: "border-red-500 ring-0"
								} 
                text-zinc-900 block px-2.5 pb-2.5 pt-5 w-full text-sm outline-none  peer`}
								placeholder=" "
								{...register("user_confirmpassword")}
							/>
							<label
								className={`${
									!errors.user_confirmpassword ? "text-zinc-500" : "text-red-500"
								} 
                absolute text-sm duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-[0.92] peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto`}
							>
								{errors.user_confirmpassword && (
									<span className="text-red-500 mr-2 tracking-widest">(*)</span>
								)}
								Nhập lại mật khẩu
							</label>
							<p
								className={`${
									errors.user_confirmpassword ? "block" : "hidden"
								} text-red-500 -bottom-[18px] absolute left-0 text-[13px]`}
							>
								{errors.user_confirmpassword?.message}
							</p>
						</div>
						<div>
							<button
								type="submit"
								className="w-full mt-2 bg-black text-white py-[10px] px-[25px]"
							>
								Đăng kí
							</button>
						</div>
						<Link
							to="/dang-nhap"
							state={{ from: location.pathname }}
							className="w-full hover:bg-black text-center hover:text-white bg-white border border-zinc-500 py-[10px] px-[25px]"
						>
							Quay lại đăng nhập
						</Link>
					</form>
				</div>
			</div>
		</>
	);
};

export default Register;
