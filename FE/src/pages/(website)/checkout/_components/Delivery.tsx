import CustomFloatingField from "../../../../components/(website)/floatingfield/CustomFloatingField";

type Props = {};

const Delivery = (props: Props) => {
	return (
		<div className="relative flex flex-col gap-4">
			<p className="text-[21px] font-semibold">Delivery</p>
			<div className="relative">
				<select
					id="country"
					className="block rounded-md border-zinc-300 px-2.5 pb-2.5 pt-5 w-full text-sm focus:outline-none focus:ring-0 focus:border-zinc-600 peer"
				>
					<option defaultValue="">Choose a country</option>
					<option value="US">United States</option>
					<option value="CA">Canada</option>
					<option value="FR">France</option>
					<option value="DE">Germany</option>
				</select>
				<label
					htmlFor="country"
					className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-zinc-600 peer-focus:dark:text-zinc-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
				>
					Country / Region
				</label>
			</div>
			<div className="flex *:w-full gap-4">
				<CustomFloatingField
					id="firstname_checkout"
					label="First name (optional)"
					isValidated
					required
					message="Invalid Name"
				/>
				<CustomFloatingField
					id="lastname_checkout"
					label="Last name"
					isValidated
					required
					message="Invalid character"
				/>
			</div>
			<CustomFloatingField
				id="address_checkout"
				label="Address"
				required
				isValidated
				message="Invalid character"
			/>
			<CustomFloatingField
				id="apartment_checkout"
				label="Apartment, suite, etc, (optional)"
				isValidated
				message="Invalid character"
			/>
			<div className="flex items-center">
				<input
					id="default-checkbox"
					type="checkbox"
					defaultValue=""
					className="w-4 h-4 ring-0 outline-none ring-offset-0 text-zinc-900 border-zinc-900 rounded"
				/>
				<label htmlFor="default-checkbox" className="ms-2 text-sm text-gray-900">
					Save this information for next time
				</label>
			</div>
		</div>
	);
};

export default Delivery;
