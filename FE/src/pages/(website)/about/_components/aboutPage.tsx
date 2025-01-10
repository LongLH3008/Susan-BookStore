type Props = {};

const AboutPage = (props: Props) => {
	return (
		<div className="min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%]">
			<div className="grid md:grid-cols-12 gap-4 my-10">
				<div className="col-span-6">
					<img
						src="https://susan-demo.myshopify.com/cdn/shop/files/0d6f4828835899.55d4a5402cb87.jpg?v=1613590896"
						alt=""
					/>
				</div>
				<div className="col-span-6">
					<div>
						<h1 className="pb-5 font-bold text-2xl md:text-4xl uppercase">
							chào mừng đến với <span className="text-[#00BFC5]">susan.</span>
						</h1>
						<p className="text-[#707070] text-[15px]">
							Tại Cửa Hàng Sách Susan, chúng tôi tự hào mang đến cho bạn một thế giới tri
							thức phong phú và đa dạng, từ những tác phẩm kinh điển đến những cuốn sách mới
							nhất. Với niềm đam mê sách và mong muốn truyền cảm hứng đọc sách đến mọi
							người, Susan không chỉ là nơi để mua sách, mà còn là không gian để bạn thư
							giãn, khám phá, và mở rộng hiểu biết.
							<br />
							<br />
							Chúng tôi cam kết cung cấp những đầu sách chất lượng với dịch vụ tận tâm, để
							mỗi khách hàng đều có trải nghiệm tuyệt vời khi đến với cửa hàng. Dù bạn là
							một người yêu thích văn học, đam mê khoa học hay đơn giản là muốn tìm một cuốn
							sách hay để giải trí, Susan đều sẵn sàng đáp ứng nhu cầu của bạn.
							<br />
							<br />
							Hãy ghé thăm Cửa Hàng Sách Susan và cùng chúng tôi khám phá những hành trình
							đầy thú vị qua từng trang sách!
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AboutPage;
