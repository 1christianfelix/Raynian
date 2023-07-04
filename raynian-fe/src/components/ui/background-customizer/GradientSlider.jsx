import React from "react";
import GradientSliderHandle from "./GradientSliderHandle";

const GradientSlider = ({ bgProperties, setBGProperties }) => {
  return (
    <div className="scale-100">
      <div className="range-slider w-[520px] relative rounded-full border border-white bg-gray-700 flex h-[22px]">
        <GradientSliderHandle
          bgProperties={bgProperties}
          setBGProperties={setBGProperties}
          id={"handle1"}
          z={1}
        ></GradientSliderHandle>
        <GradientSliderHandle
          // className="absolute"
          bgProperties={bgProperties}
          setBGProperties={setBGProperties}
          id={"handle2"}
        ></GradientSliderHandle>
      </div>
    </div>
  );
};

export default GradientSlider;
