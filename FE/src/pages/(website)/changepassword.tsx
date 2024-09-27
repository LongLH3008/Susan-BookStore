import { useAuth, userState } from "@/common/hooks/useAuth";
import { useToast } from "@/common/hooks/useToast";
import { changePassword } from "@/common/schemas/auth";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/(website)/breadcrumb/breadcrumb";

type Props = {};

const ChangePassword = (props: Props) => {
	const { toast } = useToast();
	const { id } = userState();
	const nav = useNavigate();

	const {
		handleSubmit,
		formState: { errors },
		register,
	} = useForm<IChangePassword>({ resolver: joiResolver(changePassword) });

	const { onSubmit } = useAuth({
		action: "CHANGE_PASSWORD",
		onSuccess: (data: any) => {
			setTimeout(() => {
				toast({
					variant: data.status,
					content: "Thay đổi mật khẩu thành công",
				});
				nav("/");
			}, 300);
		},
		onError: (err: any) => {
			let message = err.message;
			if (err.message.includes("password")) {
				message = "Mật khẩu cũ không đúng";
			}
			toast({
				variant: err.status,
				content: message,
			});
		},
	});

	const changePw = (data: IChangePassword) => {
		onSubmit({ ...data, user_id: id });
	};

	return (
		<>
			<Breadcrumb title="Đổi mật khẩu" />
			<div className="xl:px-[11.5%] 2xl:px-[17.5%] h-fit flex justify-center *:h-full py-[100px]">
				<div className="w-[540px] h-full bg-[#f3f3f3] flex flex-col justify-between items-center px-[40px] py-[37px]">
					<p className="text-[30px] leading-[36px] font-medium text-[#333]">Đổi mật khẩu</p>
					<p className="text-[#666] text-[15px] leading-[15px]">Thay đổi mật khẩu mới</p>
					<form
						onSubmit={handleSubmit(changePw)}
						className="mt-6 bg-white shadow-lg p-[30px] w-full gap-2 flex flex-col justify-between *:text-[14px]"
					>
						<div
							className={`relative ${
								errors.oldPassword ? "mb-4" : "mb-1"
							} transition-all ease-in-out duration-150`}
						>
							<input
								type="password"
								className={`${
									!errors.oldPassword
										? "border-zinc-300 focus:ring-[0.8px] ring-black"
										: "border-red-500 ring-0"
								}
                text-zinc-900 block px-2.5 pb-2.5 pt-5 w-full text-sm outline-none  peer`}
								placeholder=" "
								{...register("oldPassword")}
							/>
							<label
								className={`${!errors.oldPassword ? "text-zinc-500" : "text-red-500"} 
                absolute text-sm duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-[0.92] peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto`}
							>
								{errors.oldPassword && (
									<span className="text-red-500 mr-2 tracking-widest">(*)</span>
								)}
								Mật khẩu cũ
							</label>
							<p
								className={`${
									errors.oldPassword ? "block" : "hidden"
								} text-red-500 -bottom-[18px] absolute left-0 text-[13px]`}
							>
								{errors.oldPassword?.message}
							</p>
						</div>
						<div
							className={`relative ${
								errors.newPassword ? "mb-4" : "mb-1"
							} transition-all ease-in-out duration-150`}
						>
							<input
								type="password"
								className={`${
									!errors.newPassword
										? "border-zinc-300 focus:ring-[0.8px] ring-black"
										: "border-red-500 ring-0"
								}
                text-zinc-900 block px-2.5 pb-2.5 pt-5 w-full text-sm outline-none  peer`}
								placeholder=""
								{...register("newPassword")}
							/>
							<label
								className={`${!errors.newPassword ? "text-zinc-500" : "text-red-500"} 
                absolute text-sm duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-[0.92] peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto`}
							>
								{errors.newPassword && (
									<span className="text-red-500 mr-2 tracking-widest">(*)</span>
								)}
								Mật khẩu mới
							</label>
							<p
								className={`${
									errors.newPassword ? "block" : "hidden"
								} text-red-500 -bottom-[18px] absolute left-0 text-[13px]`}
							>
								{errors.newPassword?.message}
							</p>
						</div>
						<div
							className={`relative ${
								errors.confirmPassword ? "mb-4" : "mb-1"
							} transition-all ease-in-out duration-150`}
						>
							<input
								type="password"
								className={`${
									!errors.confirmPassword
										? "border-zinc-300 focus:ring-[0.8px] ring-black"
										: "border-red-500 ring-0"
								}
                text-zinc-900 block px-2.5 pb-2.5 pt-5 w-full text-sm outline-none  peer`}
								placeholder=""
								{...register("confirmPassword")}
							/>
							<label
								className={`${
									!errors.confirmPassword ? "text-zinc-500" : "text-red-500"
								}
                absolute text-sm duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-[0.92] peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto`}
							>
								{errors.confirmPassword && (
									<span className="text-red-500 mr-2 tracking-widest">(*)</span>
								)}
								Nhập lại mật khấu mới
							</label>
							<p
								className={`${
									errors.confirmPassword ? "block" : "hidden"
								} text-red-500 -bottom-[18px] absolute left-0 text-[13px]`}
							>
								{errors.confirmPassword?.message}
							</p>
						</div>
						<button
							type="submit"
							className="max-[500px]:w-full text-white bg-black py-[10px] px-[25px]"
						>
							Thay đổi mật khẩu
						</button>
					</form>
				</div>
			</div>
		</>
	);
};

export default ChangePassword;
