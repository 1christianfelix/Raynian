/* eslint-disable tailwindcss/no-custom-classname */
import React, { useContext } from "react";
import { BGCustomContext } from "../../../context/BGCustomContext";
import GradientSliderHandle from "./GradientSliderHandle";

const GradientSlider = () => {
  const { bgProperties, setBGProperties } = useContext(BGCustomContext);

  return (
    <div className="scale-100">
      <div className="range-slider relative flex h-[22px] w-[520px] rounded-full border border-white bg-gray-700">
        <GradientSliderHandle id={"handle1"} z={1} />
        <GradientSliderHandle id={"handle2"} />
      </div>
    </div>
  );
};

export default GradientSlider;
