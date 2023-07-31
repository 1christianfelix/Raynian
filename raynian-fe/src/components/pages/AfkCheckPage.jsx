import React from "react";
import dogSleep from "../../assets/Sleep.png";

export default function AfkCheckPage() {
  return (
    <div className="flex flex-col items-center relative">
      <p className="text-3xl text-white absolute top-[140px]">Still There?</p>
      <img src={dogSleep} alt="" />
    </div>
  );
}
