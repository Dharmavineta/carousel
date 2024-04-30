"use client";
import { useProductStore } from "@/app/store/store";
import { Label } from "@/components/ui/label";
import { Edit, Edit2, Plus, X } from "lucide-react";
import Image from "next/image";
import React, { ChangeEvent, FC, useRef, useState } from "react";

const ImageEdit = () => {
  const { product, products, setProduct, setProducts } = useProductStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const [img, setImg] = useState();

  const handleAddImage = () => {
    inputRef.current?.click();
  };

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const image = event.target.files?.[0];

    if (image) {
      setImg((prev) => prev);
    } else {
      alert("Please input image");
    }
  };

  return (
    <div className="flex justify-between flex-[10] w-full">
      <input
        onChange={handleImageUpload}
        type="file"
        accept="image/*"
        ref={inputRef}
        hidden
      />
      <div className="flex-[5] flex flex-col gap-y-5">
        <div className=" shadow-sm p-3">
          <h1 className="text-sm font-bold mb-2">Main Gallery</h1>
          <div className="flex gap-x-3 overflow-x-scroll whitespace-nowrap w-[46rem] ">
            <div className="flex gap-x-3">
              <div
                onClick={handleAddImage}
                className="w-32 h-32 rounded-md hover:bg-gray-50 border transition-all cursor-pointer duration-200 flex items-center justify-center shadow-sm"
              >
                <Plus className="w-4 h-4" />
              </div>
              {product &&
                product.images.map((img: any, i: number) => (
                  <div
                    className=" shadow-sm  rounded-xl relative w-32 h-32 border border-gray-100"
                    key={img.id}
                  >
                    <div className="flex gap-x-1 absolute right-0 z-10">
                      <div className="right-0 w-3 h-3 cursor-pointer bg-black flex items-center justify-center">
                        <Edit2 className="text-white w-2 h-2" />
                      </div>
                      <div className="right-0 w-3 h-3 cursor-pointer bg-rose-600 flex items-center justify-center">
                        <X className="text-white w-3 h-3" />
                      </div>
                    </div>

                    <Image
                      src={img.src}
                      alt="image"
                      fill
                      className="rounded-md object-cover w-full h-full"
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className=" shadow-sm p-3 ">
          <h1 className="text-sm font-bold mb-4">Size Chart</h1>
          <div className="flex gap-x-3 ">
            <div className="flex cursor-pointer hover:bg-gray-100 transition-all duration-200">
              <div className="w-32 h-32 rounded-md flex items-center justify-center shadow-md">
                <Plus className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
        <div className=" shadow-sm p-3 ">
          <h1 className="text-sm font-bold">Variations</h1>
          <div className="flex gap-x-3">
            <div className="flex cursor-pointer hover:bg-gray-100 transition-all duration-200">
              <div className="w-32 h-32 rounded-md flex items-center justify-center shadow-md">
                <Plus className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-[4] border-l w-full ">
        <div className="flex justify-center mt-2">
          <Label className="font-bold text-center">Image Pool</Label>
        </div>
        <div className="grid mt-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 place-items-center gap-y-5">
          {product &&
            product.images.map((img: any, i: number) => (
              <div
                className=" shadow-sm rounded-xl relative w-32 h-32 border border-gray-100"
                key={img.id}
              >
                <Image src={img.src} alt="image" fill className="rounded-md" />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ImageEdit;
