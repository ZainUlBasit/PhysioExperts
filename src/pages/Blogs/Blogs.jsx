import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import BlogCard from "../../components/Cards/BlogCard";
import BlogCarousel from "../../components/Carousels/BlogCarousel";

const Blogs = () => {
  return (
    <div className="bg-aliceblue w-screen h-screen justify-center items-center">
      <Navbar />
      <div className="flex flex-col h-[85vh] justify-center items-center gap-y-4 overflow-hidden">
        <BlogCarousel />
        {/* <h1
          className="text-[4rem] font-[600] font-montserrat text-[#fff] mb-10"
          style={{ textShadow: "#bb86fc 1px 0 10px" }}
        >
          Blogs
        </h1>
        <div className="overflow-y-auto flex gap-2">
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </div> */}
      </div>
    </div>
  );
};

export default Blogs;
