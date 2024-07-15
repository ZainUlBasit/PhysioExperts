import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import ServiceCards from "../../components/Cards/ServiceCards";
import ServicesCarousel from "../../components/Carousels/ServicesCarousel";

const Services = () => {
  return (
    <div className="bg-[aliceblue] w-screen h-screen justify-center items-center">
      <Navbar />
      <div className="flex">
        <ServicesCarousel />
      </div>
    </div>
  );
};

export default Services;
