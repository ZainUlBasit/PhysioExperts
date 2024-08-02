import { motion } from "framer-motion";
import React from "react";

const ServiceCard = ({ dt }) => {
  const LeftBox = {
    hidden: { x: -300, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1,
        delay: 0.5,
        ease: "easeOut",
      },
    },
  };
  return (
    <motion.div
      variants={LeftBox}
      className="flex flex-col justify-center items-center overflow-hidden gap-y-5 my-4"
    >
      <div className="rounded-[50px] overflow-hidden shadow-[rgba(0,0,0,0.24)_0px_3px_8px]">
        <img
          src={dt.img}
          alt="nothing"
          className="object-cover w-[210px] h-[300px]"
        />
      </div>
      <div className="font-bold font-montserrat text-2xl text-center w-[250px] text-custom-bg-hover">
        {dt.title}
      </div>
    </motion.div>
  );
};

export default ServiceCard;
