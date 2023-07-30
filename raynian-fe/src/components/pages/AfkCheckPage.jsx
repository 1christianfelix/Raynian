import React from "react";
import dogSleep from "../../assets/Sleep.png";

export default function AfkCheckPage() {
  return (
    <div className="relative flex flex-col items-center">
      <p className="absolute top-[140px] text-3xl text-white">Still There?</p>
      <img src={dogSleep} alt="" />
    </div>
  );
}
