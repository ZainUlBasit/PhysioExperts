import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import ProductCards from "../../components/Cards/ProductCards";
import ServiceCarousel from "../../components/Carousels/ServiceCarousel";

const Products = () => {
  return (
    <div className="bg-[aliceblue] w-screen h-screen justify-center items-start">
      <Navbar />
      <div className="flex flex-col h-[85vh] justify-start items-center gap-y-4">
        <ServiceCarousel />
        {/* <div className="font-[600] font-montserrat text-5xl pb-8">
          Supporting Products
        </div>
        <div className="flex">
          <ProductCards />
        </div> */}
      </div>
    </div>
  );
};

export default Products;
