import { Link } from "react-router-dom";
import Breadcrumb from "../components/reuse/breadcrumb/breadcrumb";
import CustomFloatingField from "../components/reuse/floatingfield/CustomFloatingField";
import * as icon from '@/assets/icon'

type Props = {};

const Login = (props: Props) => {
	return (
		<>
			<Breadcrumb title="Login" />
			<div className="xl:px-[11.5%] 2xl:px-[17.5%] h-fit flex justify-center *:h-full py-[100px]">
				<div className="w-[540px] h-full bg-[#f3f3f3] flex flex-col justify-between items-center px-[40px] py-[37px]">
					<p className="text-[30px] leading-[36px]  text-[#333] poppins">Login</p>
					<p className="text-[#666] text-[15px] leading-[15px]">Please login using account detail bellow.</p>
					<form
						action=""
						className="mt-6 bg-white shadow-lg p-[30px] w-full gap-2 flex flex-col justify-between *:text-[14px]"
					>
						<CustomFloatingField id="email_login" label="Email" isValidated message="Invalid Email" />
						<CustomFloatingField
							id="password_login"
							type="password"
							label="Password"
							isValidated
							message="Invalid Email"
						/>
						<button type="submit" className="max-[500px]:w-full text-white bg-black py-[10px] px-[25px]">
							Sign In
						</button>
						<button type="submit" className="max-[500px]:w-full text-black border border-zinc-400 duration-200 hover:bg-black hover:text-white bg-white py-[10px] px-[25px] flex justify-center gap-2">
							<img src={icon.ggIcon} width={20} alt="" /> Sign In with Google
						</button>
						<div className="flex flex-wrap justify-center min-[500px]:justify-between min-[500px]:items-start">
							<Link to="/" className=" pt-1">
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
