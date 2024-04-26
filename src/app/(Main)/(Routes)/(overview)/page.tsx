"use client";
import React, { useEffect, useState } from "react";
import ProductPage from "./_components/ProductPage";
import axios from "axios";
import { useProductStore } from "@/app/store/store";

const Overview = () => {
  // const { products, setProducts, product } = useProductStore();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const prods = await axios.get(
        "https://02xz.com/wp-json/wc/v3/products?per_page=100",
        {
          auth: {
            username: "ck_3df3b824b55c0188e1b060289b5df4dacf3f7786",
            password: "cs_8927ec339e47f7f14ad5c19dafac8d19865273cc",
          },
        }
      );

      setProducts(prods.data);
    };

    fetchProducts();
  }, [setProducts]);

  if (products?.length === 0) {
    return null;
  }

  return (
    <div className="h-full">
      <ProductPage products={products} />
    </div>
  );
};

export default Overview;
