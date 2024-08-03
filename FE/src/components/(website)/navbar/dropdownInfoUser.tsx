import { Link, useLocation } from "react-router-dom";
import * as icon from "@/common/assets/icon";
import { CustomDropDownInfoUser } from "@/common/ui/CustomDropDownNavbar";
import { Dropdown, DropdownHeader } from "flowbite-react";

type Props = {};

const DropdownInfoUser = (props: Props) => {
	const location = useLocation();

	return (
		<Dropdown
			theme={CustomDropDownInfoUser}
			inline
			placement="bottom-end"
			label={
				<span
					className="max-[1000px]:hidden border-2 border-zinc-300 p-1"
					id="infoUserButton"
					data-dropdown-togsgle="dropdown_infoUser"
				>
					<img width={45} src={icon.infoUser} alt="" />
				</span>
			}
		>
			<DropdownHeader className="font-semibold uppercase text-[12px] pb-3 border-b border-zinc-400 text-zinc-800">
				My account
			</DropdownHeader>
			<Dropdown.Item as={Link} to="/login" state={{ from: location.pathname }} className="text-[12px]">
				Login
			</Dropdown.Item>
			<Dropdown.Item as={Link} to="/register" state={{ from: location.pathname }} className="text-[12px]">
				Create account
			</Dropdown.Item>
		</Dropdown>
	);
};

export default DropdownInfoUser;
