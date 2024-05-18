import BookImage from "../components/page/bookDetail/BookImage";
import BookText from "../components/page/bookDetail/BookText";
import Breadcrumb from "../components/reuse/breadcrumb/breadcrumb";

const BookDetail = () => {
  return (
    <>
      <div className="">
        <Breadcrumb title="Detail Product" />
        <div className="grid grid-cols-2 gap-8 min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%]">
          <BookImage />
          <BookText />
        </div>
      </div>
    </>
  );
};

export default BookDetail;
