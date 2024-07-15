import React from "react";

const BlogCard = () => {
  return (
    <div className="h-[350px] w-[300px] flex flex-col items-center justify-between gap-x-6 border-[3px] border-custom-bg overflow-hidden bg-aliceblue rounded-[30px] my-4 text-custom-bg">
      {/* Image section */}
      <div className="w-full h-[180px] overflow-auto">
        <img
          src="/blogImage.jpg"
          className="w-full h-full object-cover"
          alt=""
        />
      </div>
      {/* Detail Section */}
      <div className="w-[250px] flex flex-col justify-between flex-1 py-3">
        <div className="font-montserrat font-semibold text-[1.2rem] text-center">
          How to eat well for a better life
        </div>
        <div className="w-full flex justify-end">
          <div className="text-gray-700 text-sm">Blog — Jan 03, 2030</div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
