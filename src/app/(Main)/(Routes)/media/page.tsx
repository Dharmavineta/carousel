"use client";
import React, { useEffect } from "react";
import ProductRightSlider from "../(overview)/_components/ProductRightSlider";
import ImageEdit from "./_components/ImageEdit";
import axios from "axios";
import { useProductStore } from "@/app/store/store";

const Media = () => {
  const { product, products, setProduct, setProducts } = useProductStore();
  useEffect(() => {
    const fetchProducts = async () => {
      const prods = await axios.get(
        "https://02xz.com/wp-json/wc/v3/products?per_page=100",
        {
          auth: {
            username: "ck_3df3b824b55c0188e1b060289b5df4dacf3f7786",
            password: "cs_8927ec339e47f7f14ad5c19dafac8d19865273cc",
          },
        }
      );

      setProducts(prods.data);
    };

    fetchProducts();
  }, [setProducts]);

  if (products.length === 0) {
    return (
      <div className=" h-screen flex items-center justify-center">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="border-t w-full h-full">
      <div className="flex justify-between w-full h-full">
        <ImageEdit />
        {/* carousel */}
        <div className="flex-[2] border-l h-full">
          {/* <ProductRightSlider/> */}
          Product Slider
        </div>
      </div>
    </div>
  );
};

export default Media;
