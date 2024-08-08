import React from "react";

const Exercises = ({ exercises }) => {
  console.log(exercises);
  return (
    <div className="flex flex-col">
      <div className="flex justify-center items-center px-3 flex-wrap gap-x-4 py-4 gap-y-4">
        {exercises &&
          exercises.map((vid) => {
            return (
              <div className="px-2 py-2 border-2 border-black flex items-center flex-col rounded-lg bg-custom-bg">
                <img
                  src={vid}
                  alt="image"
                  className="w-60 h-60 rounded-lg border-2 border-custom-bg-hover relative object-cover"
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Exercises;
