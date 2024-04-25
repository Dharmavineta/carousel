"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import React, { FC, useEffect, useRef, useState } from "react";

type props = {
  products: any[];
  setProduct: (id: string) => void;
};

const SearchProducts: FC<props> = ({ products, setProduct }) => {
  const [input, setInput] = useState("");
  const targetRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredProducts = input
    ? products.filter((prod) => prod.id.toString().includes(input.toString()))
    : products;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        targetRef.current &&
        !targetRef.current.contains(event.target as Node)
      ) {
        setInput("");
        setSelectedIndex(null);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown") {
        setSelectedIndex((prevIndex) =>
          prevIndex === null
            ? 0
            : Math.min(prevIndex + 1, filteredProducts.length - 1)
        );
      } else if (event.key === "ArrowUp") {
        setSelectedIndex((prevIndex) =>
          prevIndex === null
            ? filteredProducts.length - 1
            : Math.max(prevIndex - 1, 0)
        );
      } else if (event.key === "Enter") {
        if (selectedIndex !== null) {
          setProduct(filteredProducts[selectedIndex].id);
          setInput("");
          setSelectedIndex(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [filteredProducts, selectedIndex, setProduct]);

  return (
    <div className="flex flex-col gap-y-2 w-full relative">
      <Label htmlFor="search">Search Products</Label>
      <Input
        onChange={(e) => setInput(e.target.value)}
        name="search"
        id="search"
        placeholder="Search Product..."
      />
      {input && filteredProducts.length > 0 && (
        <div
          ref={targetRef}
          className="absolute top-16 w-full bg-white z-10 h-fit max-h-[15rem] flex flex-col gap-y-4 overflow-y-scroll shadow-md p-3 rounded-md border"
        >
          {filteredProducts.length > 0 &&
            filteredProducts.map((prod, index, arr) => {
              return (
                <div
                  onClick={() => {
                    setProduct(prod.id);
                  }}
                  className={`text-3xl hover:bg-gray-50 p-2 flex gap-x-4 cursor-pointer ${
                    selectedIndex === index ? "bg-gray-200" : ""
                  }`}
                  key={prod.id}
                >
                  <div className="relative shadow-sm px-2">
                    <Image
                      src={prod.images[0].src}
                      alt="image"
                      height={50}
                      width={50}
                      className="rounded-md"
                    />
                  </div>
                  <h1 className="text-sm font-bold">{prod.id}</h1>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default SearchProducts;
