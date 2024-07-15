import React, { useState } from "react";

const CarouselCard = ({ Icon, title, img, desc, i }) => {
  const [isActive, setIsActive] = useState(false);

  const gradientStyle = {
    // background:
    // "linear-gradient(90deg, rgba(255,95,109,1) 0%, rgba(255,195,113,1) 100%)",
    // WebkitBackgroundClip: "text",
    // WebkitTextFillColor: "transparent",
    color: "aliceblue",
    textShadow: "#465462 1px 0 10px",
  };

  const cardStyle = {
    backgroundImage: img ? `url(${img})` : "none",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundColor: img ? "transparent" : "white",
    // borderImage:
    // "linear-gradient(90deg, rgba(255,95,109,1) 0%, rgba(255,195,113,1) 100%) 1",
    borderWidth: "3px",
    borderStyle: "solid",
    borderColor: "#768A9E",
  };

  return (
    <div
      className="relative h-[300px] w-[250px] rounded-[20px] overflow-hidden shadow-[0_3px_10px_rgb(0,0,0,0.2)] transition-transform ease-in-out duration-1000 hover:transform hover:scale-110 cursor-pointer"
      style={cardStyle}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      <div
        className={`overlay absolute top-0 left-0 w-full h-full ${
          isActive && img
            ? "bg-[rgba(0,0,0,.4)]"
            : isActive && !img
            ? "bg-[rgba(0,0,0,.4)]"
            : !img
            ? ""
            : "bg-[rgba(0,0,0,.3)]"
        } z-1 fade-in`}
      ></div>

      <div
        className={`absolute bottom-0 left-0 flex flex-col gap-y-2 justify-center items-center w-full transition-all ease-in-out duration-700 px-3 ${
          isActive ? "py-10" : "py-4"
        }`}
      >
        <Icon className={`text-3xl drop-shadow-lg`} style={gradientStyle} />
        <span
          className={`text-2xl font-bold font-[Ubuntu] text-center`}
          style={gradientStyle}
        >
          {title}
        </span>
        {desc && (
          <span
            className={`transition-all ease-in-out duration-[3s] text-center transform ${
              !isActive
                ? "max-h-0 opacity-0 overflow-hidden"
                : "max-h-[500px] opacity-100"
            } ${img ? "text-white" : "text-black"}`}
          >
            {desc &&
              desc.split("Per").map((item, index) => (
                <React.Fragment key={index}>
                  {index === 1 && "Per"}
                  {item}
                  <br />
                </React.Fragment>
              ))}
          </span>
        )}
      </div>
    </div>
  );
};

export default CarouselCard;
