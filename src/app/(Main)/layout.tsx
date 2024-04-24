import Navbar from "@/components/common/Navbar";
import ProductSection from "@/components/misc/ProductSection";
import ProductsNav from "@/components/misc/ProductsNav";
import { Separator } from "@/components/ui/separator";
import React, { FC } from "react";
type props = {
  children: React.ReactNode;
};

const layout: FC<props> = ({ children }) => {
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

export default layout;
