import { FaFax, FaPhoneAlt, FaRegEnvelope } from "react-icons/fa";
type Props = {};

const Info = (props: Props) => {
	return (
		<div className="lg:col-span-5 border-l border-[#222] ml-10 pl-10 text-[15px] h-3/4 px-6 flex flex-col justify-between">
			<h2 className="font-semibold text-3xl pb-5">Thông tin liên hệ</h2>
			<p className="text-[#535353] text-[15px]">
				Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Nếu có bất kỳ câu hỏi hay yêu cầu nào, vui lòng
				liên hệ với chúng tôi qua thông tin dưới đây. Đội ngũ của Susan sẽ phản hồi trong thời gian sớm
				nhất.
			</p>
			<div className=" divide-y divide-gray-100">
				<div>
					<div className="flex items-center">
						<FaFax />
						<h4 className="font-semibold py-3 ps-1">Địa chỉ</h4>
					</div>

					<p className="text-[#535353]">
						Tòa nhà FPT Polytechnic., Cổng số 2, 13 P. Trịnh Văn Bô, Xuân Phương, Nam Từ Liêm,
						Hà Nội
					</p>
				</div>
				<div>
					<div className="flex items-center">
						<FaPhoneAlt />
						<h4 className="font-semibold py-3 ps-1">Điện thoại</h4>
					</div>
					<p className="text-[#535353]">
						Mobile: (+84) 034 654 0479
						<br />
						Hotline: 1009 678 456
					</p>
				</div>
				<div>
					<div className="flex items-center">
						{" "}
						<FaRegEnvelope />
						<h4 className="font-semibold py-3 ps-1">Email</h4>
					</div>

					<p className="text-[#535353]">
						yourmail@domain.com
						<br />
						support@hastech.company
					</p>
				</div>
			</div>
		</div>
	);
};

export default Info;
