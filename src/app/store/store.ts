import { create } from "zustand";
import axios from "axios";

interface ProductState {
  products: any[];
  setProducts: (products: any[]) => void;
  product: any;
  setProduct: (product: any) => void;
  fetchProducts: () => Promise<void>;
  updateImages: (id: any, updatedImages: any) => Promise<void>;
  addImage: (formData: FormData) => Promise<void>;
  addSizeChartImage: (formData: FormData, id: any) => Promise<void>;
  sizeChartAdd: (data: any, id: any) => Promise<void>;
  fetchVariationProducts: (id: any) => Promise<void>;
  sizeChartImageRemove: (id: any, product: any) => Promise<void>;
  variationProducts: any[];
  variationImagesGallery: any[];
  fetchVariationImageGallery: () => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
  variationProducts: [],
  variationImagesGallery: [],
  products: [],
  product: null,
  setProduct: (product) => set({ product }),
  setProducts: (newProducts) =>
    set((state) => ({
      products: newProducts,
      product: newProducts.length > 0 ? newProducts[0] : null,
    })),

  fetchProducts: async () => {
    const response = await axios.get(
      `https://02xz.com/wp-json/wc/v3/products?per_page=100`,
      {
        auth: {
          username: "ck_3df3b824b55c0188e1b060289b5df4dacf3f7786",
          password: "cs_8927ec339e47f7f14ad5c19dafac8d19865273cc",
        },
      }
    );

    const productsArray = response.data;
    const firstProduct = productsArray.length > 0 ? productsArray[0] : null;
    set((state) => ({
      products: productsArray,
      product: firstProduct,
    }));
  },
  fetchVariationProducts: async (id: any) => {
    const response = await axios.get(
      `https://02xz.com/wp-json/wc/v3/products/${id}/variations`,
      {
        auth: {
          username: "ck_3df3b824b55c0188e1b060289b5df4dacf3f7786",
          password: "cs_8927ec339e47f7f14ad5c19dafac8d19865273cc",
        },
      }
    );

    console.log(response.data);

    set({ variationProducts: response.data });
  },

  updateImages: async (id: any, updateImages: any) => {
    console.log(updateImages);

    const response = await axios.put(
      `https://02xz.com/wp-json/wc/v3/products/${id}`,

      {
        images: updateImages,
      },
      {
        auth: {
          username: "ck_3df3b824b55c0188e1b060289b5df4dacf3f7786",
          password: "cs_8927ec339e47f7f14ad5c19dafac8d19865273cc",
        },
      }
    );

    const updatedProduct = response.data;
    console.log(updatedProduct);

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

  addImage: async (formData: FormData) => {
    try {
      const response = await axios.post(
        `https://02xz.com/wp-json/wp/v2/media`,
        formData,

        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Basic ${Buffer.from(
              "vaikruta@02xz.com:zeCM BMwM jrXe JS8n KGPN 8fbY"
            ).toString("base64")}`,
          },
        }
      );

      console.log(response);
      const imageUrl = response?.data?.source_url;

      // set((state) => {
      //   const updatedProduct = {
      //     ...state.product,
      //     images: [...state.product?.images, {src:imageUrl}],
      //   };

      //   await updatedProduct(state.product.id, updatedProduct)

      // });
    } catch (error) {
      console.log(error);
    }
  },

  addSizeChartImage: async (formData: FormData, id: any) => {
    try {
      const response = await axios.post(
        `https://02xz.com/wp-json/wp/v2/media`,
        formData,

        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Basic ${Buffer.from(
              "vaikruta@02xz.com:zeCM BMwM jrXe JS8n KGPN 8fbY"
            ).toString("base64")}`,
          },
        }
      );

      console.log(response);
      const imageUrl = response?.data?.source_url;

      const updateResponse = await axios.put(
        `https://02xz.com/wp-json/wc/v3/products/${id}`,
        {
          meta_data: [
            {
              key: "size_chart_image",
              value: imageUrl,
            },
          ],
        },
        {
          auth: {
            username: "ck_3df3b824b55c0188e1b060289b5df4dacf3f7786",
            password: "cs_8927ec339e47f7f14ad5c19dafac8d19865273cc",
          },
        }
      );

      console.log(updateResponse);
      const updatedProduct = updateResponse.data;

      set((state) => ({
        ...state,
        product: updatedProduct,
      }));
    } catch (error) {
      console.log(error);
    }
  },

  sizeChartAdd: async (data: any, id: any) => {
    try {
      const updateResponse = await axios.put(
        `https://02xz.com/wp-json/wc/v3/products/${id}`,
        {
          meta_data: [
            {
              key: "size_chart",
              value: data,
            },
          ],
        },
        {
          auth: {
            username: "ck_3df3b824b55c0188e1b060289b5df4dacf3f7786",
            password: "cs_8927ec339e47f7f14ad5c19dafac8d19865273cc",
          },
        }
      );

      console.log(updateResponse);
      const updatedProduct = updateResponse.data;

      set((state) => ({
        ...state,
        product: updatedProduct,
      }));
    } catch (error) {
      console.log(error);
    }
  },

  sizeChartImageRemove: async (id: any, product: any) => {
    const metaData = product?.meta_data?.filter(
      (item: any) => item.key !== "size_chart_image"
    );

    const filteredMetaData = [
      ...metaData,
      { key: "size_chart_image", value: null },
    ];

    try {
      const response = await axios.put(
        `https://02xz.com/wp-json/wc/v3/products/${id}`,
        {
          meta_data: filteredMetaData,
        },
        {
          auth: {
            username: "ck_3df3b824b55c0188e1b060289b5df4dacf3f7786",
            password: "cs_8927ec339e47f7f14ad5c19dafac8d19865273cc",
          },
        }
      );

      set((state) => ({
        ...state,
        product: response.data,
      }));
    } catch (error) {
      console.log(error);
    }
  },

  fetchVariationImageGallery: async () => {},
}));
