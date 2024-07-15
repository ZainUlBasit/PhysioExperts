import React from "react";
import ServiceCard from "./ServiceCard";

const serviceData = [
  { title: "Sports physiotherapy", img: "/ServicesSVG.jpg" },
  { title: "Paediatric physiotherapy", img: "/ServicesSVG.jpg" },
  { title: "Musculoskeletal physiotherapy", img: "/ServicesSVG.jpg" },
  { title: "Physical Therapy physiotherapy", img: "/ServicesSVG.jpg" },
  { title: "Neurological physiotherapy", img: "/ServicesSVG.jpg" },
];

const ServiceCards = () => {
  return serviceData.map((dt) => {
    return <ServiceCard dt={dt} />;
  });
};

export default ServiceCards;
