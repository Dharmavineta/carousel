"use client";
import React, { useEffect } from "react";
import ProductRightSlider from "../(overview)/_components/ProductRightSlider";
import ImageEdit from "./_components/ImageEdit";
import axios from "axios";
import { useProductStore } from "@/app/store/store";

const Media = () => {
  const { product, products, setProduct, setProducts } = useProductStore();
  console.log(product);
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
          <ProductRightSlider />
        </div>
      </div>
    </div>
  );
};

export default Media;
