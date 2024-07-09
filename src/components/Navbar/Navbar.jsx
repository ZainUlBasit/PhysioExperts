import React from "react";
import { BsMenuButtonWideFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const navData = [
  { title: "Home", link: "/" },
  { title: "Services", link: "/services" },
  { title: "Doctors", link: "/doctors" },
  { title: "Products", link: "/products" },
  { title: "Blogs", link: "/blogs" },
  { title: "Plans", link: "/plans" },
];

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center h-[15vh] px-8">
      <div className="">
        <img src="/logo.png" alt="logo" className="w-[100px]" />
      </div>
      <div className="flex gap-x-4">
        {navData.map((nav) => {
          return (
            <div
              className="underline hover:text-[#a871eb] transition-all ease-in-out duration-700 cursor-pointer font-montserrat font-semibold text-2xl"
              onClick={() => navigate(nav.link)}
            >
              {nav.title}
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-x-4">
        <div className="underline cursor-pointer font-montserrat font-semibold text-2xl text-white bg-[#bb86fc] hover:bg-[#a871eb] py-3 px-5 rounded-lg transition-all ease-in-out duration-500">
          Book Now
        </div>
        <div className="text-[#bb86fc] text-3xl hover:text-[#a871eb] cursor-pointer">
          <BsMenuButtonWideFill />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
