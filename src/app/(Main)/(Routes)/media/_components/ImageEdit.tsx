"use client";
import { useProductStore } from "@/app/store/store";
import React, { FC } from "react";

const ImageEdit = () => {
  const { product, products, setProduct, setProducts } = useProductStore();
  console.log(product);
  console.log(products);

  return (
    <div className="flex justify-between flex-[10]">
      <div className="flex-[5] flex flex-col gap-y-3">
        <div className=" shadow-sm ">
          <h1 className="text-sm font-bold">Main Gallery</h1>
          <div className="flex gap-x-3"></div>
        </div>
        <div className=" shadow-sm ">
          <h1 className="text-sm font-bold">Size Chart</h1>
          <div className="flex gap-x-3"></div>
        </div>
        <div className=" shadow-sm ">
          <h1 className="text-sm font-bold">Variations</h1>
          <div className="flex gap-x-3"></div>
        </div>
      </div>
      <div className="flex-[4] border-l h-full">Main image content</div>
    </div>
  );
};

export default ImageEdit;
