"use client";
import React from "react";
import Handsontable from "handsontable";
import "handsontable/dist/handsontable.full.css";
import { registerAllModules } from "handsontable/registry";
import { HotTable } from "@handsontable/react";

registerAllModules();

const ReactExcel = () => {
  return (
    <HotTable
      data={[
        ["", "Tesla", "Volvo", "Toyota", "Ford"],
        ["2019", 10, 11, 12, 13],
        ["2020", 20, 11, 14, 13],
        ["2021", 30, 15, 12, 13],
      ]}
      rowHeaders={true}
      colHeaders={true}
      dropdownMenu
      columnSorting={true}
      height="auto"
      licenseKey="non-commercial-and-evaluation"
    />
  );
};

export default ReactExcel;
