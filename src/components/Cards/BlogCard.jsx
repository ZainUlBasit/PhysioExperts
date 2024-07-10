import React from "react";

const BlogCard = () => {
  return (
    <div
      className="h-[250px] w-[500px] flex gap-x-6 border-[3px] border-[#bb86fc] bg-white px-4 py-4 rounded-lg shadow-[5px_5px_rgba(187,_134,_252,_0.4),_10px_10px_rgba(187,_134,_252,_0.3),_15px_15px_rgba(187,_134,_252,_0.2),_20px_20px_rgba(187,_134,_252,_0.1),_25px_25px_rgba(187,_134,_252,_0.05)]
    "
    >
      {/* Image section */}
      <div className="w-[200px] h-full overflow-hidden rounded-[20px] shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset]">
        <img
          src="/blogImage.jpg"
          className="w-full h-full object-cover"
          alt=""
        />
      </div>
      {/* Detail Section */}
      <div className="w-[250px]">
        <div className="font-montserrat font-semibold text-[1.5rem] text-[#bb86fc]">
          How to eat well for a better life
        </div>
        <div className="text-gray-700">Blog — Jan 03, 2030</div>
      </div>
    </div>
  );
};

export default BlogCard;
