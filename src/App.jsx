import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
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
  const RightBox = {
    hidden: { x: 300, opacity: 0 },
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
    <div className="bg-[aliceblue] w-screen h-screen justify-center items-center">
      <Navbar />
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="flex h-[85vh] justify-around items-center flex-wrap overflow-hidden"
      >
        <motion.div variants={LeftBox} className="flex flex-col gap-y-4">
          <div className="font-[600] text-[4em] text-[#465462] font-montserrat">
            Physio Experts
          </div>
          <div className=" max-w-[500px] text-3xl font-[400] text-justify font-montserrat text-[#5C6D7F]">
            Welcome to Physio Rehab Center, your trusted destination for
            comprehensive and compassionate physiotherapy services in Pakistan,
            dedicated to enhancing your well-being and restoring your optimal
            health.
          </div>
          <div
            className="underline cursor-pointer font-montserrat font-semibold text-2xl text-white bg-[#465462] hover:bg-[#768A9E] py-3 px-5 rounded-lg transition-all ease-in-out duration-500 w-fit"
            onClick={() => {
              navigate("/appointment/select-city");
            }}
          >
            Book a consultation
          </div>
        </motion.div>
        <motion.div
          variants={RightBox}
          className="rounded-full overflow-hidden border-[#768A9E] border-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]  md:hidden lg:flex"
        >
          <img src="/HomeSVG.jpg" alt="logo" className="w-[500px]" />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default App;
