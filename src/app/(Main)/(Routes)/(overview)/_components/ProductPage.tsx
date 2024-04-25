"use client";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Check, X } from "lucide-react";
import Image from "next/image";
import React, { FC, useState } from "react";
import ProductRightSlider from "./ProductRightSlider";

const productImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2hvZXN8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1622920799137-86c891159e44?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2xpcHBlcnN8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNob2VzfGVufDB8fDB8fHww",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1601233216647-4fb22eb08425?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c2xpcHBlcnN8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNob2VzfGVufDB8fDB8fHww",
  },
];

type props = {
  products: any[];
};

const ProductPage: FC<props> = ({ products }) => {
  const [product, setProduct] = useState(products[0].id);
  const originalProduct = products.find((prod) => prod.id === product);
  const [img, setImg] = useState(originalProduct?.images[0]?.src);

  return (
    <div className="flex justify-between h-full border-t-[1px]">
      <div className="flex-[10] flex py-5">
        <div className="flex-[1.5] px-5">
          <div className="relative flex flex-col w-full items-center justify-center">
            <div className="relative w-full">
              <div className="flex justify-center">
                <Image
                  src={originalProduct?.images[0]?.src}
                  alt="image"
                  className="rounded-md h-80 w-80 object-cover"
                  width={80}
                  height={80}
                />
              </div>
            </div>
            <div className="w-full flex gap-x-4 mt-10 justify-center relative">
              <Carousel opts={{ align: "start" }} className="w-[500px] ">
                <CarouselContent className="-ml-1">
                  {originalProduct.images.map((image: any, i: number) => {
                    return (
                      <CarouselItem
                        onClick={() => setImg(image.src)}
                        key={image.id}
                        className="basis-1/4"
                      >
                        <div className="w-[100px] h-[100px] relative cursor-pointer pl-2 basis-1">
                          <Image
                            src={image.src}
                            alt="image"
                            className="rounded-md object-cover"
                            fill
                          />
                        </div>
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
            <div className="mt-16 flex w-full ">
              <Button size={"sm"} className="w-full">
                View Product
              </Button>
            </div>
          </div>
        </div>
        <div className="flex-[1] border-l-[1px] pl-3">
          <h1 className="font-bold ">{originalProduct?.name}</h1>
          {originalProduct?.tags.length === 0 && (
            <h1 className="text-gray-500 text-sm mt-5 text-center">
              Tags Unavailable
            </h1>
          )}
          <div className="mt-5 grid grid-cols-2 gap-x-2 gap-y-5">
            {originalProduct.tags.map((tag: any, i: number) => (
              <div key={tag.id} className="flex gap-x-2">
                <div className="bg-sky-300 rounded-full w-5 h-5  flex items-center justify-center">
                  <Check className="h-4 w-4" />
                </div>
                <span className="text-sm whitespace-nowrap">{tag?.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* from here */}
      <ProductRightSlider products={products} setProduct={setProduct} />

      {/* till here */}
    </div>
  );
};

export default ProductPage;
