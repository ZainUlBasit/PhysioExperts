import dayjs from "dayjs";
import React from "react";

export const generateTimeSlots = (start, end) => {
  const timeSlots = [];
  let currentTime = dayjs(start, "HH:mm");

  while (currentTime.isBefore(dayjs(end, "HH:mm"))) {
    const nextTime = currentTime.add(30, "minute");
    if (nextTime.isBefore(dayjs(end, "HH:mm"))) {
      timeSlots.push(
        `${currentTime.format("h:mm A")} - ${nextTime.format("h:mm A")}`
      );
    }
    currentTime = nextTime;
  }

  return timeSlots;
};
