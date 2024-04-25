import React from "react";
import ProductPage from "./_components/ProductPage";
import axios from "axios";

const Overview = async () => {
  const products = await axios.get(
    "https://02xz.com/wp-json/wc/v3/products?per_page=100",
    {
      auth: {
        username: "ck_3df3b824b55c0188e1b060289b5df4dacf3f7786",
        password: "cs_8927ec339e47f7f14ad5c19dafac8d19865273cc",
      },
    }
  );
  console.log(products.data);
  return (
    <div className="h-full">
      <ProductPage products={products.data} />
    </div>
  );
};

export default Overview;
