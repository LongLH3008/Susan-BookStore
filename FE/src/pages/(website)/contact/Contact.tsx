import React from "react";
import FormContact from "./_components/FormContact";
import Info from "./_components/info";

type Props = {};

const Contact = (props: Props) => {
	return (
		<div className="min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%] mt-5">
			<div className="grid grid-cols-12 gap-4">
				{" "}
				<FormContact />
				<Info />
			</div>
		</div>
	);
};

export default Contact;
