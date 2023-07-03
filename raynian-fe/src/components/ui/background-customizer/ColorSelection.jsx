import React, { useState } from "react";

import { RgbaColorPicker } from "react-colorful";
import "./bg-customizer.css";

const ColorSelection = () => {
  const [color, setColor] = useState({
    r: "255",
    g: "255",
    b: "255",
    a: "1",
  });

  return (
    <div className="inline-block">
      <div className="color-selector inline-block">
        <RgbaColorPicker color={color} onChange={setColor} />
      </div>
    </div>
  );
};

export default ColorSelection;
