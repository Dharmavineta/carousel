"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import React, { FC, useEffect, useRef, useState } from "react";

type props = {
  products: any[];
  setProduct: (product: any) => void;
  setProductIndex: (index: number) => void;
};

const SearchProducts: FC<props> = ({
  products,
  setProduct,
  setProductIndex,
}) => {
  const [input, setInput] = useState("");
  const targetRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);
  const inputRef = useRef<HTMLInputElement>(null);

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
      if (inputRef.current === document.activeElement) {
        if (event.key === "ArrowDown") {
          event.preventDefault();
          setSelectedIndex((prevIndex) => {
            if (prevIndex === null) {
              return 0;
            } else if (prevIndex === filteredProducts.length - 1) {
              return 0;
            } else {
              return prevIndex + 1;
            }
          });
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          setSelectedIndex((prevIndex) => {
            if (prevIndex === null) {
              return filteredProducts.length - 1;
            } else if (prevIndex === 0) {
              return filteredProducts.length - 1;
            } else {
              return prevIndex - 1;
            }
          });
        } else if (event.key === "Enter") {
          if (selectedIndex !== null) {
            setProduct(filteredProducts[selectedIndex]);
            setProductIndex(selectedIndex);
            setInput("");
          }
        } else if (event.key === "Escape") {
          setInput("");
          setSelectedIndex(0);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [filteredProducts, selectedIndex, setProduct, setProductIndex]);

  useEffect(() => {
    const scrollIntoView = () => {
      if (targetRef.current && selectedIndex !== null) {
        const selectedItem = targetRef.current.children[selectedIndex];
        selectedItem?.scrollIntoView({ block: "nearest" });
      }
    };

    scrollIntoView();
  }, [selectedIndex, filteredProducts.length]);

  return (
    <div className="flex flex-col gap-y-2 w-full relative">
      <Label htmlFor="search">Search Products</Label>
      <Input
        onChange={(e) => {
          setInput(e.target.value);
          if (e.target.value === "") {
            setSelectedIndex(0);
          }
        }}
        name="search"
        id="search"
        value={input}
        ref={inputRef}
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
                    setProduct(prod);
                    setProductIndex(
                      products.findIndex((p) => p?.id === prod?.id)
                    );
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
