"use client";
import { useProductStore } from "@/app/store/store";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import Image from "next/image";
import React, { FC } from "react";

const ImageEdit = () => {
  const { product, products, setProduct, setProducts } = useProductStore();

  return (
    <div className="flex justify-between flex-[10] w-full">
      <div className="flex-[5] flex flex-col gap-y-3">
        <div className=" shadow-sm">
          <h1 className="text-sm font-bold">Main Gallery</h1>
          <div className="flex gap-x-3 ">
            <div className="w-32 h-32 rounded-md hover:bg-gray-50 border transition-all cursor-pointer duration-200 flex items-center justify-center shadow-sm">
              <Plus className="w-4 h-4" />
            </div>

            {product &&
              product.images.map((img: any, i: number) => (
                <div
                  className=" shadow-sm rounded-xl relative w-32 h-32 border border-gray-100"
                  key={img.id}
                >
                  <Image
                    src={img.src}
                    alt="image"
                    fill
                    className="rounded-md object-cover w-32 h-32 "
                  />
                </div>
              ))}
          </div>
        </div>
        <div className=" shadow-sm ">
          <h1 className="text-sm font-bold">Size Chart</h1>
          <div className="flex gap-x-3">
            <div className="flex"></div>
          </div>
        </div>
        <div className=" shadow-sm ">
          <h1 className="text-sm font-bold">Variations</h1>
          <div className="flex gap-x-3"></div>
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
