import React from "react";

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
        </div>
      </div>
    </>
  );
};

export default BookText;
