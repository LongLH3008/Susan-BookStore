import React from "react";

const BlogComment = () => {
  return (
    <>
      <div className="mt-10 mb-24">
        <h3 className="text-xl font-semibold text-[#292929] mb-5">
          Leave a comment
        </h3>
        <div className="*:text-[13px]">
          <p className="text-[#707070] ">
            Your email address will not be published. Required fields are marked
            *
          </p>
          <form action="" className="my-5">
            <div>
              <label
                htmlFor="message"
                className="block mb-2 font-medium text-[#707070]  dark:text-white"
              >
                Comment
              </label>
              <textarea
                id="message"
                rows={4}
                className="block p-2.5 h-[150px]  w-full text-sm text-gray-900 focus:ring-gray-500 focus:border-gray-100  border border-gray-300 shadow-lg"
                placeholder="Message"
                defaultValue={""}
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-8 my-7">
              <div>
                <label
                  htmlFor="first_name"
                  className="block  text-sm font-medium text-gray-900 my-5"
                >
                  Name <span className="text-[#fa4d4d]">*</span>
                </label>
                <input
                  type="text"
                  id="first_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-gray-500 focus:border-gray-100 block w-full p-4 "
                  placeholder="Name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="last_name"
                  className="block  text-sm font-medium text-gray-900 my-5"
                >
                  Email <span className="text-[#fa4d4d]">*</span>
                </label>
                <input
                  type="text"
                  id="last_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-gray-500 focus:border-gray-100 block w-full p-4  "
                  placeholder="Email"
                  required
                />
              </div>
            </div>
            <button className="bg-[#000] text-[#fff] hover:bg-[#00bfc5] p-3 focus:scale-95 font-semibold">
              POST COMMENT
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default BlogComment;
