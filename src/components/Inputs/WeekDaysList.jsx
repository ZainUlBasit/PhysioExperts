import React, { useState } from "react";
import { NumberToDay } from "../../utils/NumberToDay";

const WeekDaysList = ({ weekDays, setWeekDays }) => {
  const handleCheckboxChange = (index) => {
    const updatedWeekDays = weekDays.map((day) => ({ ...day })); // Create a copy of the array and its objects
    updatedWeekDays[index].available = !updatedWeekDays[index].available;
    setWeekDays(updatedWeekDays);
  };

  const handleTimeChange = (index, field) => (e) => {
    const updatedWeekDays = weekDays.map((day) => ({ ...day })); // Create a copy of the array and its objects
    updatedWeekDays[index][field] = e.target.value;
    setWeekDays(updatedWeekDays);
  };

  return (
    <div>
      {weekDays.map((day, index) => (
        <div key={index} className="flex gap-x-2 my-2 items-center">
          <input
            type="checkbox"
            checked={day.available}
            onChange={() => handleCheckboxChange(index)}
          />
          <span className="font-montserrat font-bold w-[100px]">{day.day}</span>
          <input
            type="time"
            value={day.from}
            onChange={handleTimeChange(index, "from")}
            className="border p-1 rounded-lg w-[140px] font-montserrat font-bold"
          />
          <span>-</span>
          <input
            type="time"
            value={day.to}
            onChange={handleTimeChange(index, "to")}
            className="border p-1 rounded-lg w-[140px] font-montserrat font-bold"
          />
        </div>
      ))}
    </div>
  );
};

export default WeekDaysList;
