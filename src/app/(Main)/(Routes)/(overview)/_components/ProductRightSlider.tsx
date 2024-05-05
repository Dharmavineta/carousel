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
import CarouselComponent from "@/components/misc/CarouselComponent";

type props = {
  productId: any;
  productIndex: number;
};
const ProductRightSlider = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

  const { products, setProduct, product } = useProductStore();

  const index = products.findIndex((prod) => prod.id === product.id);
  const [productIndex, setProductIndex] = useState<number>(index);

  useEffect(() => {
    setProductIndex(index);
  }, [index]);

  return (
    <div className="flex-[4] py-5 h-full overflow-hidden ">
      <div className="border-l-[1px] h-full flex flex-col px-5 items-center gap-y-4">
        <SearchProducts
          products={products}
          setProduct={setProduct}
          setProductIndex={setProductIndex}
        />

        <div className="relative flex flex-col gap-y-5 justify-center h-full">
          {/* <Carousel
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
          </Carousel> */}
          <CarouselComponent
            direction="vertical"
            items={products}
            productIndex={productIndex}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductRightSlider;
