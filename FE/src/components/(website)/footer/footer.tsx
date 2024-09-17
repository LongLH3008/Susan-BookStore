import * as img from "@/common/assets/img";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<div className="min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%] bg-[#F4F4F4] text-[#707070] text-[14px]">
			<div className="grid lg:grid-cols-2 gap-4 py-[80px] md:py-[100px]">
				<div className="*:text-secondary">
					<img src={img.Logo} alt="" />
					<h3 className="text-[15px] text-[#222] mt-5 font-semibold italic">
						"Cửa Hàng Sách Susan – Mở ra thế giới qua từng trang sách."
					</h3>
					<div className=" footer-text pt-6 w-5/6 *:mb-4 text-secondary">
						<p>
							Địa chỉ : Tòa nhà FPT Polytechnic., Cổng số 2, 13 P. Trịnh Văn Bô, Xuân
							Phương, Nam Từ Liêm, Hà Nội
						</p>
						<p>Phone : +84 034 654 0479</p>
						<p>Email : support@example.com</p>
					</div>
				</div>
				<div className="grid sm:grid-cols-3 gap-4 ">
					<div className="flex flex-col gap-4 items-start justify-start">
						<p className="font-bold text-[#292929] text-[16px] mb-4">Giờ mở cửa</p>
						<p>T2 - T6: 8AM - 10PM</p>
						<p>T7: 9AM - 8PM</p>
						<p>CN: Đóng cửa</p>
					</div>
					<div className="flex flex-col gap-4 items-start justify-start">
						<p className="font-bold text-[#292929] text-[16px] mb-4">Menu</p>
						<Link to="/" className="hover:text-[#00BFC5]">
							Cửa hàng
						</Link>
						<Link to="/" className="hover:text-[#00BFC5]">
							Tin tức
						</Link>
						<Link to="/" className="hover:text-[#00BFC5]">
							Liên hệ
						</Link>
					</div>
					<div className="flex flex-col gap-4 items-start justify-start">
						<p className="font-bold text-[#292929] text-[16px] mb-4">Hỗ trợ</p>
						<Link to="/" className="hover:text-[#00BFC5]">
							Chính sách
						</Link>
						<Link to="/" className="hover:text-[#00BFC5]">
							FAQ
						</Link>
					</div>
				</div>
			</div>
			<div className="lg:flex lg:justify-between sm:grid sm:grir-cols-12 sm:gap-4 border-t border-zinc-200  :*py-2 py-5 ">
				<div className="*:text-[#707070]  min-[320px]:text-center">
					<p className="">
						Copyright & Copy
						<Link to="/" className="px-2 text-[#00BFC5]">
							Susan
						</Link>
						All Rights Reserved.
					</p>
				</div>

				<div className="flex justify-end *:text-[#707070] *:cursor-pointer *:px-6 min-[320px]:justify-center *:text-[16px] max-sm:mt-5">
					<i className="hover:text-[#00BFC5] fa-brands fa-twitter"></i>
					<i className="hover:text-[#00BFC5] fa-brands fa-instagram"></i>
					<i className="hover:text-[#00BFC5] fa-brands fa-google"></i>
					<i className="hover:text-[#00BFC5] fa-brands fa-linkedin-in"></i>
					<i className="hover:text-[#00BFC5] fa-brands fa-pinterest"></i>
				</div>
			</div>
		</div>
	);
};

export default Footer;
