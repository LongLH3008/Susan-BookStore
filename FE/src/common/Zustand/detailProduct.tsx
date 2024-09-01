import create from "zustand";
import { IProduct } from "../interfaces/product";

type ProductStore = {
  selectedProduct: IProduct | null;
  setSelectedProduct: (product: IProduct) => void;
  clearSelectedProduct: () => void;
};

const useProductStore = create<ProductStore>((set) => ({
  selectedProduct: null,
  setSelectedProduct: (product) => set({ selectedProduct: product }),
  clearSelectedProduct: () => set({ selectedProduct: null }),
}));

export default useProductStore;
