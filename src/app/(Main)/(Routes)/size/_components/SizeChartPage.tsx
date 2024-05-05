"use client";
import Image from "next/image";
import React from "react";
import ReactExcel from "./ReactExcel";
import { useProductStore } from "@/app/store/store";

const SizeChartPage = () => {
  const { product } = useProductStore();
  const size_chart_image = product?.meta_data.find(
    (ele: any) => ele.key === "size_chart_image"
  );

  return (
    <div className="h-full">
      <div className="flex justify-between w-full h-full shadow-sm border">
        <div className="flex-[10]">
          <ReactExcel />
        </div>
        <div className="flex-[5] border-l shadow-sm">
          <div className="h-full w-full relative">
            <Image
              className="object-contain"
              src={size_chart_image?.value}
              alt="/"
              fill
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeChartPage;
