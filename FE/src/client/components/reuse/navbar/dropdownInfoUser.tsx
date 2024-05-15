import { Link } from "react-router-dom";
import * as icon from "@/assets/icon";
import { CustomDropDownInfoUser } from "@/client/themes/CustomDropDownNavbar";
import { Dropdown, DropdownHeader } from "flowbite-react";

type Props = {};

const DropdownInfoUser = (props: Props) => {
	return (
		<Dropdown
			theme={CustomDropDownInfoUser}
			inline
			placement="bottom-end"
			label={
				<span className="max-[1000px]:hidden" id="infoUserButton" data-dropdown-togsgle="dropdown_infoUser">
					<img width={60} src={icon.infoUser} alt="" />
				</span>
			}
		>
			<DropdownHeader className="font-semibold uppercase text-[12px] pb-3 border-b border-zinc-400 text-zinc-800">
				My account
			</DropdownHeader>
			<Dropdown.Item as={Link} to="/login" className="text-[12px]">
				Login
			</Dropdown.Item>
			<Dropdown.Item as={Link} to="/register" className="text-[12px]">
				Create account
			</Dropdown.Item>
		</Dropdown>
	);
};

export default DropdownInfoUser;
