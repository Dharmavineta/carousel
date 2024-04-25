"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { FC, useEffect, useRef, useState } from "react";

type props = {
  products: any[];
  setProduct: (id: string) => void;
};

const SearchProducts: FC<props> = ({ products, setProduct }) => {
  const [input, setInput] = useState("");
  const targetRef = useRef<HTMLDivElement>(null);
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
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
            filteredProducts.map((prod) => (
              <div
                onClick={() => {
                  setProduct(prod.id);
                }}
                className="text-3xl hover:bg-gray-50 p-2 cursor-pointer"
                key={prod.id}
              >
                <h1 className="text-sm font-bold">{prod.id}</h1>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default SearchProducts;
