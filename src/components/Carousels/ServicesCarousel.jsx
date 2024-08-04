import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { FaBuildingColumns } from "react-icons/fa6";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import CarouselCard from "../Cards/CarouselCard";
import { TargetMarketsData } from "./TargetMarketsData";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";
import { CarouselWrapper } from "./CarouselWrapper";
import BlogCard from "../Cards/BlogCard";
import ServiceCard from "../Cards/ServiceCard";
import { dateTimePickerTabsClasses } from "@mui/x-date-pickers";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "../../store/Slices/ServiceSlice";

const ServicesCarousel = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const container = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.5,
        duration: 0.8,
        delayChildren: 0.3,
        staggerChildren: 0.2,
        ease: "easeInOut",
      },
    },
  };

  const dispatch = useDispatch();
  const ServiceState = useSelector((state) => state.ServiceState);

  useEffect(() => {
    dispatch(fetchServices());
  }, []);

  return (
    <CarouselWrapper className="gap-y-10 flex flex-col justify-between items-center w-full h-[630px]">
      <h1
        className="text-[3rem] font-[600] font-montserrat text-custom-bg mb-10"
        style={{ textShadow: "#768A9E 1px 0 10px" }}
      >
        We provide different type of physiotherapy services
      </h1>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="w-[80%]"
      >
        <Slider
          dots={true}
          infinite={true}
          speed={500}
          slidesToShow={
            ServiceState.data.length < 3 ? ServiceState.data.length : 3
          }
          slidesToScroll={1}
          autoplay={true}
          draggable={true}
          centerMode={windowWidth < 500 ? true : true}
          centerPadding={windowWidth < 400 ? "20%" : "0"}
          arrows={true}
          // prevArrow={<PrevArrow />}
          // nextArrow={<NextArrow />}
          responsive={[
            {
              breakpoint: 420,
              settings: {
                slidesToShow: 1,
                centerMode: false,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
              },
            },
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
              },
            },
          ]}
        >
          {ServiceState.data &&
            ServiceState.data.map((dt, i) => <ServiceCard dt={dt} />)}
        </Slider>
      </motion.div>
    </CarouselWrapper>
  );
};

export default ServicesCarousel;
