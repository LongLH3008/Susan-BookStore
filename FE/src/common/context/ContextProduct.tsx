import { createContext, useContext, useState } from "react";
import { useCart } from "../hooks/useCart";
import { useToast } from "../hooks/useToast";

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

	const { onAction: AddToCart } = useCart({
		action: "ADD",
		onSuccess: (data: any) => {
			toast("ADD_TO_CART", "Added to Cart", 1500);
		},
		onError: (err: any) => {
			console.log(err);
		},
	});

	return (
		<ProductContext.Provider value={{ compareModal, detailModal, featuresProduct, AddToCart }}>
			{children}
		</ProductContext.Provider>
	);
};

export default function useProductContext() {
	return useContext(ProductContext);
}
