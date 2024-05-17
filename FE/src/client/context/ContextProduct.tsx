import { createContext, useContext, useState } from "react";

type ModalType = {
  open: () => void;
  close: () => void;
};

type ProdContextType = {
  compare: boolean;
  feature: boolean;
  detail: boolean;
  compareModal: ModalType;
  detailModal: ModalType;
  featuresProduct: ModalType;
};

type ProdContextProps = {
  children: React.ReactNode;
};

export const ProductContext = createContext<ProdContextType>({} as ProdContextType);

export const ProdContextProvider = ({ children }: ProdContextProps) => {
  const [compare, setCompare] = useState(false);
  const [feature, setFeature] = useState(false);
  const [detail, setDetail] = useState(false);

  const compareModal: ModalType = {
    open: () => {
      setCompare(true);
    },
    close: () => {
      setCompare(false);
    },
  };

  const detailModal: ModalType = {
    open: () => {
      setDetail(true);
    },
    close: () => {
      setDetail(false);
    },
  };

  const featuresProduct: ModalType = {
    open: () => {
      setFeature(true);
    },
    close: () => {
      setFeature(false);
    },
  };

  return (
    <ProductContext.Provider value={{ compare, feature, detail, compareModal, detailModal, featuresProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export default function useProductContext() {
  return useContext(ProductContext);
}
