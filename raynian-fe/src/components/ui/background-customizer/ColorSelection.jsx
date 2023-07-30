/* eslint-disable tailwindcss/no-custom-classname */
import React, { useRef, useState } from "react";
import Draggable from "react-draggable";
import { RgbaColorPicker } from "react-colorful";
import "./bg-customizer.css";

const ColorSelection = () => {
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
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="bg-customizer-container relative">
        <div
          className="color-selector-container absolute h-[255px] w-[255px] translate-x-[-115px] translate-y-[-270px]"
          style={{ left: `${position}px` }}
        >
          {isPickerVisible && (
            <div className="color-selector">
              <RgbaColorPicker color={color} onChange={setColor} />
            </div>
          )}
        </div>
        <div className="range-slider relative flex w-[520px] rounded-full border border-white bg-gray-700">
          <Draggable axis="x" bounds="parent" onDrag={handleDrag}>
            <div
              className="handle flex h-5 w-5 items-center justify-center rounded-full border border-white bg-red-500 drop-shadow-sm"
              style={{ left: `${position}px`, ...colorStyle }}
              onClick={handleClick}
            >
              <div className="tooltip">{calculatePercentage()}%</div>
            </div>
          </Draggable>
        </div>
      </div>
    </div>
  );
};

export default ColorSelection;
