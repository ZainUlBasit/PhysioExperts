import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import ProductCards from "../../components/Cards/ProductCards";

const Products = () => {
  return (
    <div className="bg-[#b9cdf6] w-screen h-screen justify-center items-center">
      <Navbar />
      <div className="flex flex-col h-[85vh] justify-center items-center gap-y-4">
        <div className="font-[600] font-montserrat text-5xl pb-8">
          Supporting Products
        </div>
        <div className="flex">
          <ProductCards />
        </div>
      </div>
    </div>
  );
};

export default Products;
