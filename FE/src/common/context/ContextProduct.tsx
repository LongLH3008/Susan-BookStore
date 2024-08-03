import { createContext, useContext, useState } from "react";

type ModalType = {
	isOpen: boolean;
	open: () => void;
	close: () => void;
};

type ProdContextType = {
	// compare: boolean;
	// feature: boolean;
	// detail: boolean;
	compareModal: ModalType;
	detailModal: ModalType;
	featuresProduct: ModalType;
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
	const featuresProduct = Modal();
	const detailModal = Modal();
	const compareModal = Modal();
	return (
		<ProductContext.Provider value={{ compareModal, detailModal, featuresProduct }}>
			{children}
		</ProductContext.Provider>
	);
};

export default function useProductContext() {
	return useContext(ProductContext);
}
