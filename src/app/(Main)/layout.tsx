"use client";
import Navbar from "@/components/common/Navbar";
import ProductSection from "@/components/misc/ProductSection";
import ProductsNav from "@/components/misc/ProductsNav";
import { Separator } from "@/components/ui/separator";
import React, { FC, useEffect } from "react";
import { useProductStore } from "../store/store";
import axios from "axios";
type props = {
  children: React.ReactNode;
};

const Layout: FC<props> = ({ children }) => {
  const { products, product, setProduct, setProducts } = useProductStore();
  useEffect(() => {
    const fetchProducts = async () => {
      const prods = await axios.get("https://02xz.com/wp-json/wc/v3/products", {
        auth: {
          username: "ck_3df3b824b55c0188e1b060289b5df4dacf3f7786",
          password: "cs_8927ec339e47f7f14ad5c19dafac8d19865273cc",
        },
      });

      setProducts(prods.data);
    };

    fetchProducts();
  }, [setProducts]);

  if (products?.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center">
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <div className="h-full">
      <Navbar />
      <div className="mt-10 lg:px-5">
        <div className="flex justify-between shadow-md border px-5 rounded-sm">
          <div className="flex flex-col flex-[10] ">
            <ProductsNav />
            <div className="h-[39rem]">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
