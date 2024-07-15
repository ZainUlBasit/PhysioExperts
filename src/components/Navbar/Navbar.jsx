import React, { useEffect, useState } from "react";
import { BsMenuButtonWideFill } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AddAppoitmentModal from "../Modals/AddAppoitmentModal";
import { Popover, Typography } from "@mui/material";
import "./Navbar.css";

const navData = [
  { title: "Home", link: "/" },
  { title: "Services", link: "/services" },
  { title: "Doctors", link: "/doctors" },
  { title: "Products", link: "/products" },
  { title: "Blogs", link: "/blogs" },
  { title: "Plans", link: "/plans" },
];

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [activeNavItem, setActiveNavItem] = useState("");

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const navigate = useNavigate();
  const [OpenModal, setOpenModal] = useState(false);
  const [UserType, setUserType] = useState("");

  const location = useLocation(); // Get the current location from react-router-dom
  const pathname = location.pathname;

  useEffect(() => {
    navData.map((dt) => {
      if (dt.link === pathname) {
        setActiveNavItem(dt.title);
      }
    });
  }, [pathname]);

  return (
    <div className="flex justify-between items-center h-[15vh] px-8">
      <div className="">
        <img src="/logo.png" alt="logo" className="w-[100px]" />
      </div>
      <div className="flex gap-x-4">
        {navData.map((nav) => {
          return (
            <div className="relative overflow-hidden">
              <Link
                to={nav.link}
                className={`text-[18px] font-montserrat font-[700] hover:text-custom-bg-hover ${
                  activeNavItem === nav.title
                    ? "text-custom-bg-hover"
                    : "text-custom-bg"
                }`}
                onClick={() => setActiveNavItem(nav.title)}
              >
                {nav.title}
              </Link>
              {activeNavItem === nav.title && (
                <div className="box-below-link active"></div>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-x-4">
        <div
          className="cursor-pointer font-montserrat font-semibold text-2xl bg-[#465462] hover:bg-[#768A9E] py-3 px-5 rounded-full transition-all ease-in-out duration-500"
          style={{ color: "white" }}
          onClick={() => navigate("/add-appointment")}
        >
          Book Now
        </div>
        <div className="text-[#465462] text-3xl hover:text-[#768A9E] cursor-pointer transition-all ease-in-out duration-500">
          <BsMenuButtonWideFill onClick={handleClick} />
        </div>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          PaperProps={{
            sx: {
              borderRadius: "25px", // Add rounded corners
              width: "200px",
              backgroundColor: "white", // Set background color to white
              overflowY: "auto", // Add vertical scroll
              borderWidth: "2px",
              borderColor: "black",
            },
          }}
        >
          <Typography
            sx={{
              p: 2,
              borderColor: "#bb86fc",
              backgroundColor: "#465462",
              width: "200px",
              borderRadius: "22px",
              overflowY: "auto", // Ensure vertical scroll if needed
              maxHeight: "60vh", // Set height to 60vh
            }}
          >
            <div className="bg-[#465462] text-white font-[Quicksand] flex flex-col justify-center items-center rounded-[50px]">
              <div className="w-full flex flex-col justify-between gap-y-3 items-start">
                {[
                  { type: 0, title: "Admin", link: "/admin" },
                  { type: 1, title: "Doctor", link: "/doctor" },
                  { type: 2, title: "Patient", link: "/patient" },
                ].map((dt) => (
                  <div
                    key={dt.type}
                    className="flex gap-x-3 items-center cursor-pointer"
                    onClick={() => {
                      handleClose();
                      // setUserType(dt.type);
                      navigate(dt.link);
                    }}
                  >
                    <input
                      type="checkbox"
                      className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                      checked={UserType === dt.type}
                      readOnly
                    />
                    <span>{dt.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </Typography>
        </Popover>
      </div>

      {OpenModal && (
        <AddAppoitmentModal Open={OpenModal} setOpen={setOpenModal} />
      )}
    </div>
  );
};

export default Navbar;
