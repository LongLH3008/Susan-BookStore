import React from "react";
import { Link } from "react-router-dom";

const BookText = () => {
  return (
    <>
      <div className="">
        <h2 className="font-semibold text-2xl">4. Soldout product</h2>
        <div className="*:my-2">
          <p className="text-[#00bfc5] font-bold">¥6,104</p>
          <p>SKU: 9911</p>
          <p>Availability: 1</p>
          <div className="flex *:mr-2 *:text-yellow-300 *:text-sm ">
            <i className="fa-regular fa-star " />
            <i className="fa-regular fa-star " />
            <i className="fa-regular fa-star " />
            <i className="fa-regular fa-star " />
            <i className="fa-regular fa-star " />
          </div>
        </div>
        <hr className="w-full h-[1px] mx-auto my-10 bg-gray-400 border-0 rounded md:my-10 dark:bg-gray-700"></hr>
        <div className="*:text-[#747474]">
          <p>
            As opposed to using 'Content here, content here', making it look
            like readable English. Many desktop publishing packages and web page
            editors now use Lorem Ipsum as their default model text, and a
            search for...
          </p>
          <table className="border border-[#747474] my-5 *:p-5 w-full">
            <tbody className="*:border-b-2 *:border-[#747474] *:divide-[#747474] *:divide-x-2 ">
              <tr className="*:p-3 ">
                <td>Book Name:</td>
                <td>11. Product with video</td>
              </tr>
              <tr className="*:p-3 ">
                <td>Author Name</td>
                <td>Vendor 11</td>
              </tr>
              <tr className="*:p-3 ">
                <td>Product Type</td>
                <td>Type 11</td>
              </tr>
              <tr className="*:p-3 ">
                <td>Item Publish Date</td>

                <td>2019 / 09 / 07</td>
              </tr>
            </tbody>
          </table>
          <div id="color" className="flex items-center">
            <p>Color :</p>
            <div className="flex *:w-[35px] mx-3 *:border *:p-[0.5px] *:mx-2 hover:border-[#000] focus:border-[#000]">
              <button className="hover:border-[#000] focus:border-[#000]">
                <img
                  src="https://susan-demo.myshopify.com/cdn/shop/products/11_600x800.jpg?v=1569231186"
                  alt=""
                />
              </button>
              <button className="hover:border-[#000] focus:border-[#000]">
                <img
                  src="https://susan-demo.myshopify.com/cdn/shop/products/7_0703c71f-03e5-4502-b7cc-ce60c55e74de_600x800.jpg?v=1569231186"
                  alt=""
                />
              </button>
              <button className="hover:border-[#000] focus:border-[#000]">
                <img
                  src="https://susan-demo.myshopify.com/cdn/shop/products/8_4953a517-3945-478c-9e98-925e2b1000c0_600x800.jpg?v=1569231186"
                  alt=""
                />
              </button>
              <button className="hover:border-[#000] focus:border-[#000]">
                <img
                  src="https://susan-demo.myshopify.com/cdn/shop/products/9_87e6deda-26c2-4645-90b2-efc6d0fb17d4_600x800.jpg?v=1569231186"
                  alt=""
                />
              </button>
              <button className="hover:border-[#000] focus:border-[#000]">
                <img
                  src="https://susan-demo.myshopify.com/cdn/shop/products/10_913061f8-a25d-4ca1-9878-5ef8fd61bc6e_600x800.jpg?v=1569231186"
                  alt=""
                />
              </button>
              <button className="hover:border-[#000] focus:border-[#000]">
                <img
                  src="https://susan-demo.myshopify.com/cdn/shop/products/4_b155f66b-76de-44a2-a3e9-ca89308d9bc3_600x800.jpg?v=1569231152"
                  alt=""
                />
              </button>
            </div>
          </div>
          <div className="flex items-center sm:flex-wrap *:sm:my-4 justify-between  my-8  mr-0 w-full">
            <p>Qty :</p>

            <div className="relative flex items-center max-w-[8rem]  ">
              <button
                type="button"
                id="decrement-button"
                data-input-counter-decrement="quantity-input"
                className="bg-gray-100 hover:bg-gray-200 border border-gray-300  p-3 h-16 focus:ring-gray-100  focus:ring-2 focus:outline-none"
              >
                <svg
                  className="w-3 h-3 text-gray-900 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 2"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M1 1h16"
                  />
                </svg>
              </button>
              <input
                type="text"
                id="quantity-input"
                data-input-counter
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border-x-0 border-gray-300 h-16 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 "
                placeholder="0"
                required
              />
              <button
                type="button"
                id="increment-button"
                data-input-counter-increment="quantity-input"
                className="bg-gray-100  hover:bg-gray-200 border border-gray-300  p-3 h-16 focus:ring-gray-100  focus:ring-2 focus:outline-none"
              >
                <svg
                  className="w-3 h-3 text-gray-900 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </button>
            </div>
            <div className="flex items-center  border-[3px] border-[#00BFC5] hover:border-[#000] px-9 h-16 ">
              <Link to="/" className=" ">
                Add to cart
              </Link>
            </div>
            <div className="flex *:px-6 h-16 items-center border-[3px] *:text-[#000] hover:text-[#00BFC5] *:text-xl">
              <Link to="/" className="border-r-2 hover:text-[#00BFC5]">
                <i className="fa-solid fa-heart"></i>
              </Link>
              <Link to="/" className="hover:text-[#00BFC5]">
                <i className="fa-solid fa-sliders"></i>
              </Link>
            </div>
          </div>
          <div className="w-full">
            <Link to="/">
              <button className="w-full py-4  bg-black border border-black text-white font-bold hover:border-[#00BFC5] hover:text-[#00BFC5] hover:bg-white">
                Buy it now
              </button>
            </Link>
          </div>
          <div className="my-10">
            <h3 className="font-bold text-black">SHARE THIS PRODUCT</h3>
            <div className="flex justify-start my-5  *:mr-4 ">
              <i className="hover:text-white text-[#1de1f2] fa-brands fa-twitter border hover:bg-[#1de1f2] p-3 "></i>
              <i className="hover:text-white text-[#526faf] fa-brands fa-facebook-f border hover:bg-[#526faf] py-3 px-4  "></i>
              <i className="hover:text-white text-[#dd5245] fa-brands fa-google border hover:bg-[#dd5245] p-3 "></i>
              <i className="hover:text-white text-[#bd081b] fa-brands fa-pinterest border hover:bg-[#bd081b] p-3 "></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookText;
