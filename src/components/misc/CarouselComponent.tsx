"use client";
import { useProductStore } from "@/app/store/store";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";
import Image from "next/image";
import React, { FC, useEffect, useRef, useState } from "react";
import "../../app/globals.css";

type props = {
  items: any[];
  direction: "horizontal" | "vertical";
  productIndex: number;
};

const CarouselComponent: FC<props> = ({ direction, items, productIndex }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeItem, setActiveItem] = useState();
  const carouselRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { setProduct } = useProductStore();

  const handleProductIndex = (id: number) => {
    setCurrentIndex(items.findIndex((item) => item.id === id));
  };

  const handleArrowUp = () => {
    setCurrentIndex((prev) => (prev === 0 ? 0 : prev - 1));
  };
  const handleArrowDown = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? prev : prev + 1));
  };

  useEffect(() => {
    const currentItem = itemRefs.current[currentIndex];
    if (currentItem !== null && currentItem !== undefined) {
      currentItem.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [currentIndex]);

  useEffect(() => {
    if (itemRefs.current[productIndex]) {
      itemRefs.current[productIndex].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [productIndex]);

  return (
    <div className={cn("flex flex-col gap-5 items-center justify-center")}>
      <button disabled={currentIndex === 0} onClick={handleArrowUp}>
        <ArrowUp
          className={cn("w-4 h-4", currentIndex === 0 && "text-gray-400")}
        />
      </button>
      <div className="h-[28rem] overflow-auto product-overflow">
        <div className={cn(" flex flex-col gap-5 items-center justify-center")}>
          {items.map((item: any, i: number) => {
            return (
              <div
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                onClick={() => {
                  setProduct(item);
                  handleProductIndex(item.id);
                }}
                className={cn(
                  "cursor-pointer",
                  currentIndex === i && "border shadow-sm  "
                )}
                key={item?.id}
              >
                <div className={cn("w-44 h-44 relative rounded-md")}>
                  <Image
                    src={item?.images[0]?.src}
                    alt="image"
                    fill
                    className={cn(
                      "rounded-md",
                      productIndex === i && "border-2 border-gray-600"
                    )}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <button onClick={handleArrowDown}>
        <ArrowDown
          className={cn(
            "w-4 h-4",
            currentIndex === items.length - 1 && "text-gray-400"
          )}
        />
      </button>
    </div>
  );
};

export default CarouselComponent;
