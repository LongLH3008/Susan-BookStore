import { IProduct } from "@/common/interfaces/product";
import Comment from "@/components/(website)/comment/comment";
import { useState } from "react";
import { Link } from "react-router-dom";

const Bookservice = ({ detailProduct }: { detailProduct: IProduct }) => {
  const [tab, setTab] = useState<string>("Description");
  const [writeReview, setWriteReview] = useState<boolean>(false);
  return (
    <>
      <hr className="w-full h-[1px] mx-auto my-10 bg-gray-400 border-0 rounded md:my-10"></hr>
      <div className="my-24">
        <div className=" flex justify-center">
          <button
            onClick={() => setTab("Description")}
            className={`${
              tab == "Description" ? "text-gray-900" : "text-gray-300"
            } font-bold  text-xl px-4 hover:text-gray-900`}
          >
            Mô Tả
          </button>
          <button
            onClick={() => setTab("Reviews")}
            className={`${
              tab == "Reviews" ? "text-gray-900" : "text-gray-300"
            } font-bold  text-xl px-4 hover:text-gray-900`}
          >
            Đánh giá
          </button>
          <button
            onClick={() => setTab("Comments")}
            className={`${
              tab == "Comments" ? "text-gray-900" : "text-gray-300"
            } font-bold  text-xl px-4 hover:text-gray-900`}
          >
            Bình luận
          </button>
        </div>
        <div className=" my-14">
          {/* Description */}
          <div
            className={`${
              tab !== "Description" ? "hidden" : ""
            } text-[#646464] leading-loose`}
          >
            <p>{detailProduct?.description}</p>
          </div>
          {/* Reviews */}
          <div className={`${tab !== "Reviews" ? "hidden" : ""}`}>
            <h2 className="text-center text-black text-2xl font-semibold">
              Đánh giá của khách hàng
            </h2>
            <div className="flex justify-center divide-x divide-yellow-300 my-8">
              <div className="mx-10">
                <div className="flex *:mr-2 *:text-yellow-300 *:text-xl ">
                  <i className="fa-regular fa-star " />
                  <i className="fa-regular fa-star " />
                  <i className="fa-regular fa-star " />
                  <i className="fa-regular fa-star " />
                  <i className="fa-regular fa-star " />
                </div>
                <p>Hãy là người đầu tiên viết đánh giá</p>
              </div>
              <div className="">
                <button
                  onClick={() => {
                    setWriteReview(!writeReview);
                  }}
                  className="py-3 px-16 mx-10 bg-yellow-300 text-white font-bold hover:opacity-80"
                >
                  {writeReview ? "Hủy đánh giá" : "Viết đánh giá"}
                </button>
              </div>
            </div>
            <div
              className={`${
                writeReview ? "" : "hidden"
              } *:text-[#646464] *:text-center`}
            >
              <hr className="w-full h-[1px] mx-auto my-10 bg-yellow-300 border-0 rounded md:my-10 "></hr>
              <h2 className=" text-black text-2xl font-bold">Viết đánh giá</h2>
              <p className="my-3">Đánh giá</p>
              <div className="flex justify-center *:mr-2 *:text-yellow-300 *:text-xl ">
                <i className="fa-solid fa-star " />
                <i className="fa-solid fa-star " />
                <i className="fa-solid fa-star " />
                <i className="fa-solid fa-star " />
                <i className="fa-solid fa-star " />
              </div>
              <form className="w-2/4 m-auto  my-4">
                <div className="*:my-4">
                  <label htmlFor="title">Tiêu đề đánh giá(100)</label>
                  <input
                    className="w-full  bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-yellow-300 focus:border-yellow-300 p-2.5"
                    type="text"
                    name=""
                    id="title"
                    placeholder="Give your review a title"
                  />
                </div>
                <div className="*:my-4">
                  <label htmlFor="review">Đánh giá(50)</label>
                  <textarea
                    name=""
                    id="review"
                    className="w-full h-32 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:border-yellow-300 focus:ring-yellow-300"
                    placeholder="Write your comment here ..."
                  ></textarea>
                </div>
                <div className="*:my-4">
                  <label htmlFor="">Hình ảnh/Video (tùy chọn)</label>
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col  items-center justify-center w-full  h-28 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 "
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Nhấn để tải lên</span>{" "}
                        hoặc kéo và thả
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (TỐI ĐA. 800x400px)
                      </p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" />
                  </label>
                </div>

                <div className="*:my-4">
                  <label htmlFor="fullname">Họ và tên</label>
                  <input
                    className="w-full  bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-yellow-300 focus:border-yellow-300 p-2.5"
                    type="text"
                    name=""
                    id="fullname"
                    placeholder="Enter your fullname (private)"
                  />
                </div>
                <div className="*:my-4">
                  <label htmlFor="email">Email</label>
                  <input
                    className="w-full  bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-yellow-300 focus:border-yellow-300 p-2.5"
                    type="text"
                    name=""
                    id="email"
                    placeholder="Enter your email (private)"
                  />
                </div>
                <p>
                  Cách chúng tôi sử dụng dữ liệu của bạn: Chúng tôi sẽ chỉ liên
                  hệ với bạn về đánh giá bạn để lại và chỉ khi cần thiết. Bằng
                  cách gửi đánh giá của mình, bạn đồng ý với các điều khoản,
                  chính sách quyền riêng tư và nội dung của Judge.me.
                </p>
                <div className="flex justify-center *:mx-2 my-6">
                  <Link
                    to="/"
                    className="px-8 py-2 border-[3px] text-[17px] font-bold text-yellow-300 border-yellow-300 hover:opacity-80 "
                  >
                    Hủy đánh giá
                  </Link>
                  <Link
                    to="/"
                    className="px-8 py-2 border text-[17px] font-bold text-white bg-yellow-300 hover:opacity-80 "
                  >
                    Gửi đánh giá
                  </Link>
                </div>
              </form>
            </div>
            <hr className="w-full h-[1px] mx-auto my-10 bg-yellow-300 border-0 rounded md:my-10 "></hr>

            {/* Bài review */}
            <div className="">
              <form className="max-w-[170px] my-5">
                <select
                  id="countries"
                  className=" border-0 text-gray-900 text-sm rounded-lg focus:ring-yellow-300 focus:border-yellow-300 block w-full p-2 "
                >
                  <option selected>Gần đây nhất</option>
                  <option value="highest-rating">Xếp hạng cao nhất</option>
                  <option value="lowest-rating">Xếp hạng thấp nhất</option>
                </select>
              </form>
              <div className="">
                <h4 className="text-xl font-semibold mb-5">1 Bình Luận</h4>
                <Comment />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bookservice;
