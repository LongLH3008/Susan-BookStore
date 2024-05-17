import { Link } from "react-router-dom";
import CustomFloatingField from "../../reuse/floatingfield/CustomFloatingField";

type Props = {};

const Contact = (props: Props) => {
	return (
		<div className="relative flex flex-col gap-4">
			<div className="flex justify-between items-center">
				<p className="text-[21px] font-semibold">Contact</p>
				<Link to="/login" className="text-[14px] underline">
					Log in
				</Link>
			</div>
			<CustomFloatingField id="contact_checkout" label="Email or mobile phone number" isValidated message="Wrong Email" required/>
			<div className="flex items-center">
				<input
					id="default-checkbox"
					type="checkbox"
					defaultValue=""
					className="w-4 h-4 ring-0 outline-none ring-offset-0 text-zinc-900 border-zinc-900 rounded"
				/>
				<label htmlFor="default-checkbox" className="ms-2 text-sm text-gray-900">
					Email me with news and offers
				</label>
            </div>
		</div>
	);
};

export default Contact;
