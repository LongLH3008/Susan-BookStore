import useCategory from "@/common/hooks/useCategories";
import { ICategory } from "@/common/interfaces/category";
import { IProduct } from "@/common/interfaces/product";
import { ConvertVNDString } from "@/common/shared/round-number";
import { StarRating } from "@/components/(website)/StarRating/StarRating";
import { useState } from "react";
import { Link } from "react-router-dom";

const BookText = ({ detailProduct }: { detailProduct: IProduct }) => {
  const [quantity, setQuantity] = useState<number>(0);
  const { CategoryQuery } = useCategory();
  return (
    <>
      <div className="">
        <h2 className="font-semibold text-2xl">{detailProduct?.title}</h2>
        <div className="*:my-2">
          <div>
            <span className="text-[16px] text-[#00BFC5] font-semibold">
              {ConvertVNDString(
                detailProduct?.price -
                  (detailProduct?.price * detailProduct?.discount) / 100
              )}
              đ
            </span>
            {detailProduct?.discount > 0 && (
              <span className="line-through ms-3 text-zinc-500">
                {ConvertVNDString(detailProduct?.price)} đ
              </span>
            )}
          </div>
          <p>SKU: 9911</p>
          <p>Số lượng : {detailProduct?.stock}</p>
          {detailProduct?.rating ? (
            <StarRating rating={detailProduct?.rating} />
          ) : (
            <StarRating rating={5} />
          )}
        </div>
        <hr className="w-full h-[1px] mx-auto my-10 bg-gray-400 border-0 rounded md:my-10 dark:bg-gray-700"></hr>
        <div className="*:text-[#747474]">
          <p className="overflow-hidden text-ellipsis line-clamp-2">
            {detailProduct?.description}
          </p>
          <table className="border border-[#747474] my-5 *:p-5 w-full">
            <tbody className="*:border-b-2 *:border-[#747474] *:divide-[#747474] *:divide-x-2 ">
              <tr className="*:p-3 ">
                <td>Tên sách:</td>
                <td>{detailProduct?.title}</td>
              </tr>
              <tr className="*:p-3 ">
                <td>Tác giả</td>
                <td>{detailProduct?.author}</td>
              </tr>
              <tr className="*:p-3 ">
                <td>Loại sách </td>
                <td>
                  {CategoryQuery?.data?.metadata
                    ?.filter((category: ICategory) =>
                      detailProduct?.categories.includes(category?.id)
                    )
                    .map((ca: ICategory) => (
                      <p key={ca?.id}>{ca?.category_name}</p>
                    ))}
                </td>
              </tr>
              <tr className="*:p-3 ">
                <td>Ngày sản xuất</td>

                <td>2019 / 09 / 07</td>
              </tr>
            </tbody>
          </table>
          {/* <div id="color" className="flex items-center">
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
          </div> */}
          <div className="flex items-center sm:flex-wrap *:sm:my-4 justify-between  my-8  mr-0 w-full">
            <p>SL :</p>

            <div className="relative flex items-center max-w-[8rem]  ">
              <button
                onClick={() => {
                  quantity >= 1 && setQuantity(Number(quantity) - 1);
                }}
                type="button"
                id="decrement-button"
                data-input-counter-decrement="quantity-input"
                className={`bg-gray-100 text-2xl hover:bg-gray-200 border border-gray-300  w-36 h-16 focus:ring-gray-100  focus:ring-2 focus:outline-none`}
              >
                -
              </button>
              <input
                type="number"
                id="quantity-input"
                data-input-counter
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border-x-0 border-gray-300 h-16 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 "
                value={quantity}
                min={0}
                max={100}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
              <button
                onClick={() => setQuantity(Number(quantity) + 1)}
                type="button"
                id="increment-button"
                data-input-counter-increment="quantity-input"
                className={`bg-gray-100 text-2xl hover:bg-gray-200 border border-gray-300  w-36 h-16 focus:ring-gray-100  focus:ring-2 focus:outline-none`}
              >
                +
              </button>
            </div>
            <div className="flex items-center  border-[3px] border-[#00BFC5] hover:border-[#000] px-9 h-16 ">
              <Link to="/" className=" flex">
                <img
                  className="w-[20px] me-1"
                  src="/src/common/assets/icon/nav_miniCart_icon.png"
                  alt=""
                />{" "}
                Thêm giỏ hàng
              </Link>
            </div>
            <div className="flex *:px-6 h-16 items-center border-[3px] *:text-[#000] hover:text-[#00BFC5] *:text-xl">
              <Link to="/" className=" hover:text-[#00BFC5]">
                <i className="fa-solid fa-heart"></i>
              </Link>
            </div>
          </div>
          <div className="w-full">
            <Link to="/">
              <button className="w-full py-4 transition duration-150 bg-black border border-black text-white font-bold hover:border-[#00BFC5] hover:text-[#00BFC5] hover:bg-white">
                Mua ngay
              </button>
            </Link>
          </div>
          <div className="my-10">
            <h3 className="font-bold text-black">CHIA SẺ SẢN PHẨM NÀY</h3>
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
