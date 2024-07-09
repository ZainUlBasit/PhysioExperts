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

const DoctorCarousel = () => {
  // Define custom arrow components with react-icons
  const PrevArrow = (props) => (
    <div {...props} className="slick-prev">
      <FiChevronLeft size={30} color="black" className="!-m-5 !-mx-2" />
    </div>
  );

  const NextArrow = (props) => (
    <div {...props} className="slick-next">
      <FiChevronRight size={30} color="black" className="!-m-5 !-mx-3 !" />
    </div>
  );
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
  return (
    <CarouselWrapper className="gap-y-10 flex flex-col justify-between items-center w-full h-full">
      <h1
        className="text-[4rem] font-[600] font-montserrat text-[#fff] mb-10"
        style={{ textShadow: "#bb86fc 1px 0 10px" }}
      >
        Supporting Products
      </h1>
      <div className="w-[80%]">
        <Slider
          dots={false}
          infinite={true}
          speed={500}
          slidesToShow={4}
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
          {TargetMarketsData.map((dt, i) => (
            <CarouselCard
              key={i}
              Icon={dt.icon}
              title={dt.title}
              img={dt.img}
            />
          ))}
        </Slider>
      </div>
    </CarouselWrapper>
  );
};

export default DoctorCarousel;