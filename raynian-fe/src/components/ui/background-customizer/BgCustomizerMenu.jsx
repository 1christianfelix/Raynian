import React, { useState } from "react";
import GradientSlider from "./GradientSlider";
import { ColorPickerStatusProvider } from "./ColorPickerStatusContext";
import "./bg-customizer.css";

const BgCustomizerMenu = () => {
  const [bgProperties, setBGProperties] = useState({
    color: { r: 255, g: 255, b: 255, a: 1 },
    position: 0,
  });

  return (
    <ColorPickerStatusProvider>
      <div>
        <GradientSlider
          bgProperties={bgProperties}
          setBGProperties={setBGProperties}
        />
      </div>
    </ColorPickerStatusProvider>
  );
};

export default BgCustomizerMenu;
