import { Link } from "react-router-dom";
import Breadcrumb from "../components/reuse/breadcrumb/breadcrumb";
import CustomFloatingField from "../components/reuse/floatingfield/CustomFloatingField";

type Props = {};

const Register = (props: Props) => {
	return (
		<>
			<Breadcrumb current="Register" from="Home" />
			<div className="xl:px-[11.5%] 2xl:px-[17.5%] h-fit flex justify-center *:h-full py-[100px]">
				<div className="w-[540px] h-fit bg-[#f3f3f3] flex flex-col justify-start gap-2 items-center px-[40px] py-[37px]">
					<p className="text-[30px] leading-[36px] font-medium text-[#333] poppins">Create Account</p>
					<p className="text-[#666] text-[15px] leading-[15px]">
						Please Register using account detail bellow.
					</p>
					<form
						action=""
						className="w-full flex flex-col gap-3 justify-between mt-5 h-full *:text-[14px] *:text-zinc-900"
					>
							<CustomFloatingField id="firstname_register" label="First Name" isValidated message="Invalid Character" />
							<CustomFloatingField id="lastname_register" label="Last Name" isValidated message="Invalid Character" />
							<CustomFloatingField id="email_register" label="Email Name" isValidated message="Invalid Email" />
							<CustomFloatingField id="password_register" type="password" label="Password" isValidated message="Password must have ..." />
							<CustomFloatingField id="confirmpassword_register" type="password" label="Confirm Password" isValidated message="Password not match" />
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
