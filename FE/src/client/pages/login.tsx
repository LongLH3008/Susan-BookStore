import { Link } from "react-router-dom";
import Breadcrumb from "../components/reuse/breadcrumb/breadcrumb";

type Props = {};

const Login = (props: Props) => {
	return (
		<>
			<Breadcrumb current="Login" from="Home" />
			<div className="xl:px-[11.5%] 2xl:px-[17.5%] h-[635px] flex justify-center *:h-full py-[100px]">
				<div className="w-[540px] h-full bg-[#f3f3f3] flex flex-col justify-between items-center px-[40px] py-[37px]">
					<p className="text-[30px] leading-[36px]  text-[#333] poppins">Login</p>
					<p className="text-[#666] text-[15px] leading-[15px]">Please login using account detail bellow.</p>
					<form action="" className="mt-6 bg-white shadow-lg p-[30px] w-full h-[270px] flex flex-col justify-between *:text-[14px] *:text-zinc-900">
						<div>
              <input type="email" placeholder="Email" className=" border ring-0 border-zinc-300 w-full  p-[10px] outline-none"  />
              <p className="text-red-500 text-[13px]">Error</p>
            </div>
            <div>
              <input type="password" placeholder="Password" className=" border ring-0 border-zinc-300 w-full p-[10px] outline-none"  />
              <p className="text-red-500 text-[13px]">Error</p>
						</div>
            <div className="flex flex-wrap justify-center min-[500px]:justify-between min-[500px]:items-start">
              <button type="submit" className="max-[500px]:w-full bg-black text-white py-[8px] px-[25px]">Sign In</button>
              <Link to="/" className=" pt-1">Forgot your password</Link>
            </div>
            <Link to='/register' className="max-[500px]:text-center">Create account</Link>
					</form>
				</div>
			</div>
		</>
	);
};

export default Login;
