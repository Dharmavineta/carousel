"use client";
import React, { useEffect, useState } from "react";
import ProductPage from "./_components/ProductPage";
import axios from "axios";
import { useProductStore } from "@/app/store/store";

const Overview = () => {
  const { products, setProducts, product } = useProductStore();

  return (
    <div className="h-full">
      <ProductPage />
    </div>
  );
};

export default Overview;
