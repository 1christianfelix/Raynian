import React, { useRef, useState } from "react";
import Draggable from "react-draggable";
import { RgbaColorPicker } from "react-colorful";
import "./bg-customizer.css";

const GradientSliderHandle = () => {
  const [color, setColor] = useState({ r: 255, g: 255, b: 255, a: 1 });
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [position, setPosition] = useState(0); // position in pixels
  const wasDragged = useRef(false); // ref to track if the element was dragged

  const colorStyle = {
    backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
  };

  const handleDrag = (e, ui) => {
    setPosition(ui.x);
    wasDragged.current = true; // update ref to note that element was dragged
  };

  const handleClick = () => {
    // If the element was dragged, skip opening color picker
    if (wasDragged.current) {
      wasDragged.current = false; // reset ref for future clicks
    } else {
      setPickerVisible(!isPickerVisible);
    }
  };

  const calculatePercentage = () => {
    console.log(position);
    Math.round((position / 500) * 100);
  };

  return (
    <Draggable
      axis="x"
      bounds=".range-slider"
      onDrag={handleDrag}
      cancel=".color-selector-container"
    >
      <div className="bg-customizer-container relative">
        <div className="color-selector-container h-[255px] w-[255px] absolute translate-y-[-270px] translate-x-[-115px]">
          {isPickerVisible && (
            <div className="color-selector">
              <RgbaColorPicker color={color} onChange={setColor} />
            </div>
          )}
        </div>
        <div
          className="handle h-5 w-5 rounded-full border border-white drop-shadow-sm flex items-center justify-center bg-red-500"
          style={{ left: `${position}px`, ...colorStyle }}
          onClick={handleClick}
        >
          <div className="tooltip">{calculatePercentage()}%</div>
        </div>
      </div>
    </Draggable>
  );
};

export default GradientSliderHandle;
