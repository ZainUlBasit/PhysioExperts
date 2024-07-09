import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import ServiceCards from "../../components/Cards/ServiceCards";

const Services = () => {
  return (
    <div className="bg-[#b9cdf6] w-screen h-screen justify-center items-center">
      <Navbar />
      <div className="flex flex-col h-[85vh] justify-center items-center gap-y-4">
        <div className="font-[600] font-montserrat text-5xl pb-8">
          We provide different type of physiotherapy services
        </div>
        <div className="flex">
          <ServiceCards />
        </div>
      </div>
    </div>
  );
};

export default Services;
