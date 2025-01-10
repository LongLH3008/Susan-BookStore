import useProductStore from "@/common/Zustand/detailProduct";
import { userState } from "@/common/hooks/useAuth";
import { IProduct } from "@/common/interfaces/product";
import { ConvertVNDString } from "@/common/shared/round-number";
import { CustomModalDetail } from "@/common/ui/CustomModalDetail";
import { Modal } from "flowbite-react";
import useProductContext from "../../../../common/context/ContextProduct";
import AmountData from "./amountData";
import AmountLocal from "./amountLocal";

const ModalDetail = ({ detailProduct }: { detailProduct: IProduct }) => {
	const { detailModal, featuresProduct } = useProductContext();
	const selectedProduct = useProductStore((state) => state.selectedProduct);
	const { clearSelectedProduct } = useProductStore();

	const { id } = userState();

	const openDetail = () => {
		detailModal?.open();
		featuresProduct.close();
	};

	return (
		<>
			<span onClick={openDetail}>
				<i className="hover:text-[#00BFC5] fa-solid fa-arrow-up-right-from-square"></i>
			</span>
			<Modal
				theme={CustomModalDetail}
				show={detailModal?.isOpen}
				onClose={() => {
					detailModal?.close();
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
												(selectedProduct.price *
													selectedProduct.discount) /
													100
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
								{id ? (
									<AmountData detailProduct={detailProduct} user_id={id} />
								) : (
									<AmountLocal detailProduct={detailProduct} />
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
