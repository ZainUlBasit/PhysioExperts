import React, { useEffect, useState } from "react";
import { BsFillMenuButtonFill, BsMenuButtonWideFill } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AddAppoitmentModal from "../Modals/AddAppoitmentModal";
import { Popover, Typography } from "@mui/material";
import "./PatientNavbar.css";
import { GiExitDoor } from "react-icons/gi";

const navData = [
  { title: "Dashboard", link: "/patient/dashboard" },
  { title: "Videos", link: "/patient/videos" },
  { title: "Exercises", link: "/patient/exercises" },
  { title: "New Appointment", link: "/patient/new-appointment" },
  { title: "History", link: "/patient/history" },
  { title: "Chat", link: "/patient/chat" },
];

const PatientNavbar = () => {
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
      <div className="flex items-center gap-x-2">
        <section className="hidden">
          <BsFillMenuButtonFill className="text-[#465462] text-3xl hover:text-[#768A9E] cursor-pointer transition-all ease-in-out duration-500" />
        </section>
        <img src="/logo.png" alt="logo" className="w-[100px]" />
      </div>
      <nav className="flex gap-x-4">
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
      </nav>
      <div className="flex items-center gap-x-4">
        <div className="text-[#465462] text-3xl hover:text-[#768A9E] cursor-pointer transition-all ease-in-out duration-500">
          <GiExitDoor
            onClick={() => {
              localStorage.removeItem("user-data");
              localStorage.removeItem("token");
              localStorage.removeItem("logged-in");
              window.location.reload();
            }}
          />
        </div>
      </div>

      {OpenModal && (
        <AddAppoitmentModal Open={OpenModal} setOpen={setOpenModal} />
      )}
    </div>
  );
};

export default PatientNavbar;
