"use client";
import React, { useRef, useState } from "react";
import Handsontable from "handsontable";
import "handsontable/dist/handsontable.full.css";
import { registerAllModules } from "handsontable/registry";
import { HotTable, HotTableClass } from "@handsontable/react";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import { useProductStore } from "@/app/store/store";
import { toast } from "sonner";

registerAllModules();
interface HotTableRefObject extends React.RefObject<HotTable> {
  hotInstance?: Handsontable;
}

const ReactExcel = () => {
  const { product, sizeChartAdd } = useProductStore();
  const emptyData = [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ];

  const sizeChartData = product?.meta_data?.find(
    (ele: any) => ele.key === "size_chart"
  );

  const [data, setData] = useState(
    sizeChartData ? sizeChartData.value : emptyData
  );
  const [dataChange, setDataChange] = useState(false);
  const dataRef = useRef<HotTableClass>(null);

  const handleChartData = async () => {
    if (dataRef.current) {
      const currentData = dataRef.current.hotInstance?.getData();

      toast.promise(sizeChartAdd(currentData, product.id), {
        loading: "Updating size chart data",
        success: "Size chart data updated",
        error: "Error updating size chart data",
      });
    }
  };

  return (
    <div className="w-full flex justify-center mt-10 flex-col items-center">
      <HotTable
        ref={dataRef}
        data={data}
        rowHeaders={true}
        colHeaders={true}
        dropdownMenu
        columnSorting={true}
        height="500"
        width="700"
        colWidths={"130"}
        rowHeights={"70"}
        contextMenu
        afterChange={(changes, source) => {
          if (source !== "loadData") {
          }
        }}
        licenseKey="non-commercial-and-evaluation"
      />
      <div className="flex justify-end w-full mb-5 mr-5 gap-x-5">
        <Button onClick={handleChartData} size={"sm"}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default ReactExcel;
