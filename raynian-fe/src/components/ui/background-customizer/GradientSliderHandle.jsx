import React, { useEffect, useRef, useState, useContext } from "react";
import { ColorPickerStatusContext } from "./ColorPickerStatusContext";
import Draggable from "react-draggable";
import { RgbaColorPicker } from "react-colorful";
import "./bg-customizer.css";

const GradientSliderHandle = ({ bgProperties, setBGProperties, id }) => {
  const [color, setColor] = useState({ r: 255, g: 255, b: 255, a: 1 });
  const { activePicker, setActivePicker } = useContext(
    ColorPickerStatusContext
  );
  const active = activePicker === id;
  const isPickerVisible = activePicker === id;
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(id == "handle2" ? 498 : 0); // position in pixels
  const wasDragged = useRef(false); // ref to track if the element was dragged

  const colorStyle = {
    backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
  };

  const handleDrag = (e, ui) => {
    setIsDragging(true);
    console.log(ui);
    setPosition(ui.x);
    wasDragged.current = true; // update ref to note that element was dragged
  };

  const handleStop = () => {
    setIsDragging(false);
  };

  const handleClick = () => {
    // If the element was dragged, skip opening color picker
    if (wasDragged.current) {
      wasDragged.current = false; // reset ref for future clicks
    } else {
      setActivePicker(isPickerVisible ? null : id);
    }
  };

  useEffect(() => {
    setBGProperties({ color, position: Math.round((position / 500) * 100) });
  }, [color, position]);

  return (
    <Draggable
      axis="x"
      bounds=".range-slider"
      defaultPosition={{ x: id === "handle2" ? 498 : 0, y: 0 }}
      onDrag={handleDrag}
      onStop={handleStop}
      cancel=".color-selector-container"
    >
      <div className="bg-customizer-container absolute ">
        <div
          className={`color-selector-container h-[255px] w-[255px] absolute translate-y-[-270px] translate-x-[-115px] ${
            !isPickerVisible && "hidden"
          }`}
        >
          {isPickerVisible && (
            <div
              className="color-selector"
              style={{ zIndex: active === id ? 1000 : 0 }}
            >
              <RgbaColorPicker color={color} onChange={setColor} />
            </div>
          )}
        </div>
        <div
          className={`handle h-5 w-5 rounded-full border border-white drop-shadow-sm flex items-center justify-center bg-red-500 ${
            isDragging && "scale-110"
          } ${active && "scale-110"}`}
          style={{
            // left: `${position}px`,
            ...colorStyle,
          }}
          onClick={handleClick}
        >
          <div className="tooltip">{Math.round((position / 500) * 100)}%</div>
        </div>
      </div>
    </Draggable>
  );
};

export default GradientSliderHandle;
