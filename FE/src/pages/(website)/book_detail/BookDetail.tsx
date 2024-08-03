import BookImage from "./_components/BookImage";
import BookText from "./_components/BookText";
import Bookservice from "./_components/Bookservice";
import Breadcrumb from "../../../components/(website)/breadcrumb/breadcrumb";

const BookDetail = () => {
	return (
		<>
			<div className="">
				<Breadcrumb title="Detail Product" />
				<div className=" min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%]">
					<div className="grid lg:grid-cols-2 my-14 gap-8">
						<BookImage />
						<BookText />
					</div>
					<Bookservice />
				</div>
			</div>
		</>
	);
};

export default BookDetail;
