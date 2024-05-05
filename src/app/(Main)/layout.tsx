"use client";
import Navbar from "@/components/common/Navbar";
import ProductSection from "@/components/misc/ProductSection";
import ProductsNav from "@/components/misc/ProductsNav";
import { Separator } from "@/components/ui/separator";
import React, { FC, useEffect } from "react";
import { useProductStore } from "../store/store";
import axios from "axios";
import { Toaster } from "sonner";
import Loader from "@/components/misc/Loader";
type props = {
  children: React.ReactNode;
};

const Layout: FC<props> = ({ children }) => {
  const {
    products,
    product,
    setProduct,
    setProducts,
    fetchProducts,
    fetchVariationProducts,
    fetchVariationImageGallery,
  } = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (product) {
      fetchVariationProducts(product.id);
    }
  }, [product, fetchVariationProducts]);

  if (products?.length === 0) {
    return <Loader />;
  }
  return (
    <div className="h-full">
      <Toaster />
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
