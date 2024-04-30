import Image from "next/image";
import React from "react";
import ReactExcel from "./ReactExcel";

const SizeChartPage = () => {
  return (
    <div className="h-full">
      <div className="flex justify-between w-full h-full shadow-sm border">
        <div className="flex-[10]">
          <ReactExcel />
        </div>
        <div className="flex-[5] border-l shadow-sm">
          <div className="h-full w-full relative">
            <Image src={""} alt="/" fill />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeChartPage;
