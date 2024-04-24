"use client";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

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
    url: "https://images.unsplash.com/photo-1601233216647-4fb22eb08425?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c2xpcHBlcnN8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1601233216647-4fb22eb08425?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c2xpcHBlcnN8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1622920799137-86c891159e44?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2xpcHBlcnN8ZW58MHx8MHx8fDA%3D",
  },
];

const ProductPage = () => {
  const [image, setImage] = useState(productImages[0].url);

  return (
    <div className="flex justify-between h-full border-t-[1px]">
      <div className="flex-[10] flex py-5">
        <div className="flex-[1.5] px-5">
          <div className="relative flex flex-col w-full items-center justify-center">
            <div className="relative w-full">
              <div className="flex justify-center">
                <Image
                  src={image}
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
                  {productImages.map((image, i, arr) => (
                    <CarouselItem key={image.id} className="basis-1/4">
                      <div
                        onClick={() => setImage(image.url)}
                        className="w-[100px] h-[100px] relative cursor-pointer pl-2 basis-1"
                      >
                        <Image
                          src={image.url}
                          alt="image"
                          className="rounded-md object-cover"
                          fill
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
            <div className="mt-8 flex w-full ">
              <Button size={"sm"} className="w-full">
                View Product
              </Button>
            </div>
          </div>
        </div>
        <div className="flex-[1] border-l-[1px] pl-3">
          <h1 className="font-bold ">Long Sleeve Fleece Sweater</h1>
          <div className="mt-5 grid grid-cols-2 gap-x-2 gap-y-5">
            <div className="flex gap-x-2">
              <div className="bg-sky-300 rounded-full w-5 h-5  flex items-center justify-center">
                <Check className="h-4 w-4" />
              </div>
              <span className="text-sm whitespace-nowrap">Category</span>
            </div>
            <div className="flex gap-x-2">
              <div className="bg-sky-300 rounded-full w-5 h-5  flex items-center justify-center">
                <Check className="h-4 w-4" />
              </div>{" "}
              <span className="text-sm whitespace-nowrap">Long Sleeves</span>
            </div>
            <div className="flex gap-x-2">
              <div className="bg-sky-300 rounded-full w-5 h-5  flex items-center justify-center">
                <Check className="h-4 w-4" />
              </div>{" "}
              <span className="text-sm whitespace-nowrap">Color</span>
            </div>
            <div className="flex gap-x-2">
              <div className="bg-rose-300 rounded-full w-5 h-5  flex items-center justify-center">
                <X className="h-4 w-4" />
              </div>{" "}
              <span className="text-sm whitespace-nowrap">Size</span>
            </div>
            <div className="flex gap-x-2">
              <div className="bg-rose-300 rounded-full w-5 h-5  flex items-center justify-center">
                <X className="h-4 w-4" />
              </div>{" "}
              <span className="text-sm whitespace-nowrap">Category</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-[4] py-5 h-full overflow-hidden ">
        <div className="border-l-[1px] h-full flex flex-col px-5 items-center gap-y-4">
          <div className="flex flex-col gap-y-2 w-full">
            <Label htmlFor="search">Search Products</Label>
            <Input name="search" id="search" placeholder="Search Product..." />
          </div>
          <div className="relative flex flex-col gap-y-5 justify-center h-full">
            <Carousel
              opts={{
                align: "start",
              }}
              orientation="vertical"
            >
              <CarouselContent className="-mt-1 h-[400px]">
                {productImages.map((image, i, arr) => (
                  <CarouselItem key={image.id} className="basis-1/2 w-48 h-56">
                    <div
                      onClick={() => setImage(image.url)}
                      className="h-full w-full relative cursor-pointer pl-2"
                    >
                      <Image
                        src={image.url}
                        alt="image"
                        className="rounded-md object-cover"
                        fill
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
