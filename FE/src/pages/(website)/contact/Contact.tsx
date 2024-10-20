import React from "react";
import FormContact from "./_components/FormContact";
import Info from "./_components/info";
import Map from "./_components/map";

type Props = {};

const Contact = (props: Props) => {
	return (
		<div className="min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%] mt-5">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="col-span-1">
					<FormContact />
				</div>
				<div className="col-span-1">
					<Info />
				</div>
			</div>
			<div>
				<Map />
			</div>
		</div>
	);
};

export default Contact;
