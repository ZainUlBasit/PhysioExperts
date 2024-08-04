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
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../../store/Slices/BlogSlice";

const BlogCarousel = () => {
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

  const dispatch = useDispatch();
  const BlogState = useSelector((state) => state.BlogState);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, []);

  return (
    <CarouselWrapper className="gap-y-10 flex flex-col justify-between items-center w-full h-[600px]">
      <h1
        className="text-[4rem] font-[600] font-montserrat text-custom-bg mb-10"
        style={{ textShadow: "#768A9E 1px 0 10px" }}
      >
        Blogs
      </h1>
      <div className="w-[80%]">
        <Slider
          dots={true}
          infinite={true}
          speed={500}
          slidesToShow={BlogState.data.length < 3 ? BlogState.data.length : 3}
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
          {BlogState.data &&
            BlogState.data.map((dt, i) => <BlogCard key={i} data={dt} />)}
        </Slider>
      </div>
    </CarouselWrapper>
  );
};

export default BlogCarousel;
