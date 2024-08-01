import React from "react";
import { Link } from "react-router-dom";

const Bookservice = () => {
  return (
    <>
      <hr className="w-full h-[1px] mx-auto my-10 bg-gray-400 border-0 rounded md:my-10 dark:bg-gray-700"></hr>
      <div className="my-24">
        <div className=" flex justify-center">
          <button className="font-bold text-gray-300 text-xl px-4">
            Description
          </button>
          <button className="font-bold text-gray-300 text-xl px-4">
            Reviews
          </button>
          <button className="font-bold text-gray-300 text-xl px-4">
            Comments
          </button>
          <button className="font-bold text-gray-300 text-xl px-4">
            Tab Title
          </button>
        </div>
        <div className="my-14">
          {/* Description */}
          {/* <div className=" text-[#646464] leading-loose">
            <p>
              we denounce with righteous indignation and dislike men who are so
              beguiled and demoralized by the charms of pleasure of the moment,
              so blinded by desire, that they cannot foresee the pain and
              trouble that are bound to ensue; and equal blame belongs to those
              who fail in their duty through weakness of will, which is the same
              as saying through shrinking from toil and pain. These cases are
              perfectly simple and easy to distinguish. In a free hour, when our
              power of choice is untrammelled and when nothing prevents our
              being able to do what we like best, every pleasure is to be
              welcomed and every pain avoided. But in certain circumstances and
              owing to the claims of duty or the obligations of business it will
              frequently occur that pleasures have to be repudiated and
              annoyances accepted. The wise man therefore always holds in these
              matters to this principle of selection: he rejects pleasures to
              secure other greater pleasures, or else he endures pains to avoid
              worse pains. <br />
              <br />I must explain to you how all this mistaken idea of
              denouncing pleasure and praising pain was born and I will give you
              a complete account of the system, and expound the actual teachings
              of the great explorer of the truth, the master-builder of human
              happiness. No one rejects, dislikes, or avoids pleasure itself,
              because it is pleasure, but because those who do not know how to
              pursue pleasure rationally encounter consequences that are
              extremely painful.
            </p>
          </div> */}
          {/* Reviews */}
          <div className="">
            <h2 className="text-center text-black text-2xl font-semibold">
              Customer Reviews
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
                <p>Be the first to write a review</p>
              </div>
              <div className="">
                <button className="py-3 px-16 mx-10 bg-yellow-300 text-white font-bold">
                  Cancel review
                </button>
              </div>
            </div>
            <hr className="w-full h-[1px] mx-auto my-10 bg-yellow-300 border-0 rounded md:my-10 "></hr>
            <div className="*:text-[#646464] *:text-center">
              <h2 className=" text-black text-2xl font-bold">Write a review</h2>
              <p className="my-3">Rating</p>
              <div className="flex justify-center *:mr-2 *:text-yellow-300 *:text-xl ">
                <i className="fa-solid fa-star " />
                <i className="fa-solid fa-star " />
                <i className="fa-solid fa-star " />
                <i className="fa-solid fa-star " />
                <i className="fa-solid fa-star " />
              </div>
              <form className="w-2/4 m-auto  my-4">
                <div className="*:my-4">
                  <label htmlFor="title">Review Title(100)</label>
                  <input
                    className="w-full  bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-yellow-300 focus:border-yellow-300 p-2.5"
                    type="text"
                    name=""
                    id="title"
                    placeholder="Give your review a title"
                  />
                </div>
                <div className="*:my-4">
                  <label htmlFor="review">Review(50)</label>
                  <textarea
                    name=""
                    id="review"
                    className="w-full h-32 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:border-yellow-300 focus:ring-yellow-300"
                    placeholder="Write your comment here ..."
                  ></textarea>
                </div>
                <div className="*:my-4">
                  <label htmlFor="">Picture/Video (optional)</label>
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
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" />
                  </label>
                </div>

                <div className="*:my-4">
                  <label htmlFor="fullname">Fullname</label>
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
                  How we use your data: We’ll only contact you about the review
                  you left, and only if necessary. By submitting your review,
                  you agree to Judge.me’s terms, privacy and content policies.
                </p>
                <div className="flex justify-center *:mx-2 my-6">
                  <Link
                    to="/"
                    className="px-8 py-2 border-[3px] text-[17px] font-bold text-yellow-300 border-yellow-300 hover:opacity-80 "
                  >
                    Cancel review
                  </Link>
                  <Link
                    to="/"
                    className="px-8 py-2 border text-[17px] font-bold text-white bg-yellow-300 hover:opacity-80 "
                  >
                    Submit review
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bookservice;
