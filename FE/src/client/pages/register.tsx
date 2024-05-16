import { Link } from "react-router-dom";
import Breadcrumb from "../components/reuse/breadcrumb/breadcrumb";

type Props = {};

const Register = (props: Props) => {
	return (
		<>
			<Breadcrumb current="Register" from="Home" />
			<div className="xl:px-[11.5%] 2xl:px-[17.5%] h-[696px] flex justify-center *:h-full py-[100px]">
				<div className="w-[540px] h-full bg-[#f3f3f3] flex flex-col justify-start gap-2 items-center px-[40px] py-[37px]">
					<p className="text-[30px] leading-[36px] font-medium text-[#333] poppins">Create Account</p>
					<p className="text-[#666] text-[15px] leading-[15px]">
						Please Register using account detail bellow.
					</p>
					<form
						action=""
						className="w-full flex flex-col justify-between mt-5 h-full *:text-[14px] *:text-zinc-900"
					>
						<div>
							<input
								type="text"
								placeholder="First Name"
								className="border-0 ring-0 w-full px-[10px] py-[8px] outline-none"
							/>
							<p className="text-red-500 text-[13px]">Error</p>
						</div>
						<div>
							<input
								type="text"
								placeholder="Last Name"
								className="border-0 ring-0 w-full px-[10px] py-[8px] outline-none"
							/>
							<p className="text-red-500 text-[13px]">Error</p>
						</div>
						<div>
							<input
								type="email"
								placeholder="Email"
								className="border-0 ring-0 w-full px-[10px] py-[8px] outline-none"
							/>
							<p className="text-red-500 text-[13px]">Error</p>
						</div>
						<div>
							<input
								type="password"
								placeholder="Password"
								className="border-0 ring-0 w-full px-[10px] py-[8px] outline-none"
							/>
							<p className="text-red-500 text-[13px]">Error</p>
						</div>
						<div className="my-3">
							<button type="submit" className="max-[500px]:w-full bg-black text-white py-[8px] px-[25px]">
								Register
							</button>
						</div>
						<Link to="/login" className="max-[500px]:text-center">
							Login
						</Link>
					</form>
				</div>
			</div>
		</>
	);
};

export default Register;
