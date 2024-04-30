import { create } from "zustand";
import axios from "axios";

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

  fetchProducts: async () => {
    const response = await axios.get(`https://02xz.com/wp-json/wc/v3/products`);

    const productsArray = response.data;
    const firstProduct = productsArray.length > 0 ? productsArray[0] : null;
    set((state) => ({
      products: productsArray,
      product: firstProduct,
    }));
  },

  updateImages: async (id: any) => {
    const response = await axios.put(
      `https://02xz.com/wp-json/wc/v3/products/${id}`
    );

    const updatedProduct = response.data;

    set((state) => {
      const productIndex = state.products.findIndex((prod) => prod.id === id);
      if (productIndex !== -1) {
        const updatedProducts = [...state.products];
        updatedProducts[productIndex] = updatedProduct;

        return {
          ...state,
          products: updatedProducts,
        };
      }
      return state;
    });
  },
}));
