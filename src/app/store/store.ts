import { create } from "zustand";

interface ProductState {
  products: any[];
  setProducts: (products: any[]) => void;
  product: any;
  setProduct: (product: any) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  product: null,
  setProduct: (product) => set({ product }),
  setProducts: (newProducts) =>
    set((state) => ({
      products: newProducts,
      product: newProducts.length > 0 ? newProducts[0] : null,
    })),
}));
