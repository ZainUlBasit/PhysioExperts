import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="bg-[#b9cdf6] w-screen h-screen justify-center items-center">
      <Navbar />
      <div className="flex h-[85vh] justify-around items-center flex-wrap overflow-hidden">
        <div className="flex flex-col gap-y-4">
          <div className="font-[600] text-[4em] text-white font-montserrat">
            Physio Experts
          </div>
          <div className=" max-w-[500px] text-3xl font-[400] text-justify font-montserrat">
            Welcome to Physio Rehab Center, your trusted destination for
            comprehensive and compassionate physiotherapy services in Pakistan,
            dedicated to enhancing your well-being and restoring your optimal
            health.
          </div>
          <div className="underline cursor-pointer font-montserrat font-semibold text-2xl text-white bg-[#bb86fc] hover:bg-[#a871eb] py-3 px-5 rounded-lg transition-all ease-in-out duration-500 w-fit">
            Book a consultation
          </div>
        </div>
        <div className="rounded-full overflow-hidden">
          <img src="/HomeSVG.jpg" alt="logo" className="w-[500px]" />
        </div>
      </div>
    </div>
  );
}

export default App;
