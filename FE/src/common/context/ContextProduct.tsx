import { createContext, useContext, useState } from "react";
import { cartData } from "../hooks/useCart";
import { useToast } from "../hooks/useToast";
import { ToastVariant } from "../interfaces/toast";

type ModalType = {
	isOpen: boolean;
	open: () => void;
	close: () => void;
};

type ProdContextType = {
	compareModal: ModalType;
	detailModal: ModalType;
	featuresProduct: ModalType;
	AddToCart: (arg: ICartNewProduct) => void;
};

type ProdContextProps = {
	children: React.ReactNode;
};

export const ProductContext = createContext<ProdContextType>({} as ProdContextType);

function Modal() {
	const [isOpen, setIsOpen] = useState(false);
	const open = () => setIsOpen(true);
	const close = () => setIsOpen(false);
	return { isOpen, open, close };
}

export const ProdContextProvider = ({ children }: ProdContextProps) => {
	const { toast } = useToast();
	const featuresProduct = Modal();
	const detailModal = Modal();
	const compareModal = Modal();
	const { add } = cartData();

	const AddToCart = (arg: ICartNewProduct) => {
		add(arg);
		toast({
			variant: ToastVariant.ADD_TO_CART,
			content: "Đã thêm vào giỏ hàng",
			duration: 1500,
		});
	};

	return (
		<ProductContext.Provider value={{ compareModal, detailModal, featuresProduct, AddToCart }}>
			{children}
		</ProductContext.Provider>
	);
};

export default function useProductContext() {
	return useContext(ProductContext);
}
