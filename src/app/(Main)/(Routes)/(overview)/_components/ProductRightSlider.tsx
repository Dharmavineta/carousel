"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Image from "next/image";
import React, { FC, useEffect, useRef, useState } from "react";
import SearchProducts from "./SearchProducts";
import useEmblaCarousel from "embla-carousel-react";
import { useProductStore } from "@/app/store/store";

type props = {
  productId: any;
  productIndex: number;
};
const ProductRightSlider = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

  const { products, setProduct } = useProductStore();

  // const [productIndex, setProductIndex] = useState<number | null>(null);
  // const handleProductSelect = (selectedProduct: any) => {
  //   const index = products.findIndex((prod) => prod.id === productId);
  //   setProductIndex(index);
  // };
  // useEffect(() => {
  //   console.log(emblaApi);
  //   if (emblaApi && productIndex !== null) {
  //     emblaApi.scrollTo(productIndex);
  //   }
  // }, [emblaApi, productIndex]);

  return (
    <div className="flex-[4] py-5 h-full overflow-hidden ">
      <div className="border-l-[1px] h-full flex flex-col px-5 items-center gap-y-4">
        <SearchProducts products={products} setProduct={setProduct} />

        <div className="relative flex flex-col gap-y-5 justify-center h-full">
          <Carousel
            ref={emblaRef}
            opts={{
              align: "start",
            }}
            orientation="vertical"
          >
            <CarouselContent className="-mt-1 h-[400px]">
              {products.map((prod, i, arr) => {
                return (
                  <CarouselItem
                    onClick={() => {
                      // handleProductSelect(prod);
                      // handleProductIndex(i);
                      setProduct(prod);
                    }}
                    key={prod.id}
                    className="basis-1/2 w-48 h-56"
                  >
                    <div className="h-full w-full relative cursor-pointer pl-2">
                      <Image
                        src={prod.images[0]?.src}
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
      </div>
    </div>
  );
};

export default ProductRightSlider;
