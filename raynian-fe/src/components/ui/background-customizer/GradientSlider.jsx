import React from "react";
import GradientSliderHandle from "./GradientSliderHandle";

const GradientSlider = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="range-slider w-[520px] relative rounded-full border border-white bg-gray-700 flex">
        <GradientSliderHandle></GradientSliderHandle>
      </div>
    </div>
  );
};

export default GradientSlider;
