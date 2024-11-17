import useProductStore from "@/common/Zustand/detailProduct";
import { userState } from "@/common/hooks/useAuth";
import { ConvertVNDString } from "@/common/shared/round-number";
import { CustomModalDetail } from "@/common/ui/CustomModalDetail";
import { Modal } from "flowbite-react";
import { useState } from "react";
import useProductContext from "../../../common/context/ContextProduct";

const ModalDetail = () => {
  const { detailModal, featuresProduct, AddToCart } = useProductContext();
  const selectedProduct = useProductStore((state) => state.selectedProduct);
  const { clearSelectedProduct } = useProductStore();

  const [amount, setAmount] = useState<number>(1);

  const { id } = userState();

  const AddProductToCart = () => {
    AddToCart({
      product_id: selectedProduct?._id as string,
      user_id: id,
      product_quantity: amount,
    });
  };

  const openDetail = () => {
    detailModal.open();
    featuresProduct.close();
  };

  return (
    <>
      <span onClick={openDetail}>
        <i className="hover:text-[#00BFC5] fa-solid fa-arrow-up-right-from-square"></i>
      </span>
      <Modal
        theme={CustomModalDetail}
        show={detailModal.isOpen}
        onClose={() => {
          detailModal.close();
          clearSelectedProduct();
        }}
      >
        <Modal.Header />
        <Modal.Body>
          {selectedProduct && (
            <div className="grid max sm:grid-cols-2 p-5">
              <span className="h-[465px] flex justify-center items-center overflow-hidden border">
                <img
                  className="h-full object-cover w-full"
                  src={selectedProduct.coverImage}
                  alt={selectedProduct.title}
                />
              </span>
              <div className=" flex flex-col gap-[1rem] pt-10 sm:pt-0 sm:ps-10">
                <h3 className="text-zinc-700 text-[26px] font-semibold">
                  {selectedProduct.title}
                </h3>
                <div className="*:text-[20px]">
                  <span className="text-[#00BFC5] ">
                    {ConvertVNDString(
                      selectedProduct.price -
                        (selectedProduct.price * selectedProduct.discount) / 100
                    )}
                    đ
                  </span>
                  {selectedProduct.discount > 0 && (
                    <span className="line-through text-zinc-500 ms-3">
                      {ConvertVNDString(selectedProduct.price)}đ
                    </span>
                  )}
                </div>
                <p className="text-gray-400">
                  Số lượng :
                  {selectedProduct?.stock == 0
                    ? "Hết hàng "
                    : " " + selectedProduct?.stock}
                </p>
                <p className="text-[#707070] text-[14px] mt-3 overflow-hidden text-ellipsis  line-clamp-6">
                  {selectedProduct.description}
                </p>

                <div className="mt-5 flex justify-between sm:justify-start gap-10">
                  <div className="relative grid grid-cols-3 w-[100px] border">
                    <button
                      onClick={() =>
                        setAmount((amount) =>
                          amount > 1 ? amount - 1 : amount
                        )
                      }
                      type="button"
                      id="decrement-button"
                      data-input-counter-decrement="quantity-input"
                      className="grid place-items-center border-r text-zinc-500 font-normal text-[13px]"
                    >
                      <i className="fa-solid fa-minus"></i>
                    </button>
                    <input
                      type="text"
                      id="quantity-input"
                      data-input-counter
                      aria-describedby="helper-text-explanation"
                      className="border-0 px-2 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={amount}
                      min={0}
                      max={20}
                      required
                      disabled
                    />
                    <button
                      onClick={() =>
                        amount < 10 &&
                        amount < selectedProduct.stock &&
                        setAmount((amount) => amount + 1)
                      }
                      type="button"
                      id="increment-button"
                      data-input-counter-increment="quantity-input"
                      className="grid place-items-center border-s text-zinc-500 font-normal text-[13px]"
                    >
                      <i
                        className={`fa-solid fa-plus duration-200 ${
                          amount >= 10 && "rotate-45 text-red-500"
                        }`}
                      ></i>
                    </button>
                  </div>
                  <button
                    onClick={AddProductToCart}
                    className="px-[25px] py-[8px] bg-zinc-900 hover:bg-zinc-600 text-white"
                  >
                    Thêm giỏ hàng
                  </button>
                </div>
                {amount >= 10 && (
                  <p className="text-red-500 text-sm">
                    Số lương trong giỏ hàng đã đạt tối đa cho phép
                  </p>
                )}
                {amount >= selectedProduct.stock && (
                  <p className="text-red-500 text-sm">Sản phẩm đã hết</p>
                )}
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalDetail;
