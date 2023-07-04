import React, { useEffect, useRef, useState, useContext } from "react";
import { ColorPickerStatusContext } from "./ColorPickerStatusContext";
import { BGCustomContext } from "../../../context/BGCustomContext";
import Draggable from "react-draggable";
import { RgbaColorPicker } from "react-colorful";
import "./bg-customizer.css";

const GradientSliderHandle = ({ id }) => {
  const { bgProperties, setBGProperties } = useContext(BGCustomContext);

  const [color, setColor] = useState(
    id === "handle1" ? bgProperties.color1 : bgProperties.color2
  );

  const { activePicker, setActivePicker } = useContext(
    ColorPickerStatusContext
  );
  const active = activePicker === id;
  const isPickerVisible = activePicker === id;
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(
    id == "handle2" ? bgProperties.position2 : bgProperties.position1
  ); // position in pixels
  const [stopPercent, setStopPercent] = useState(
    id == "handle2" ? bgProperties.stopPercent2 : bgProperties.stopPercent1
  );
  const wasDragged = useRef(false); // ref to track if the element was dragged
  const colorStyle = {
    backgroundColor:
      id === "handle1"
        ? `rgba(${bgProperties.color1.r}, ${bgProperties.color1.g}, ${bgProperties.color1.b}, ${bgProperties.color1.a})`
        : `rgba(${bgProperties.color2.r}, ${bgProperties.color2.g}, ${bgProperties.color2.b}, ${bgProperties.color2.a})`,
  };

  const handleDrag = (e, ui) => {
    setIsDragging(true);
    setPosition(ui.x);
    setStopPercent(Math.round((position / 500) * 100));
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
    // This is your new effect to listen for changes in stopPercent
    setPosition((stopPercent / 100) * 500);
  }, [stopPercent]);

  useEffect(() => {
    setBGProperties((prev) => {
      if (id === "handle1") {
        prev = {
          ...prev,
          position1: position,
          stopPercent1: stopPercent,
        };
      } else {
        prev = {
          ...prev,
          position2: position,
          stopPercent2: stopPercent,
        };
      }
      return prev;
    });
  }, [position, stopPercent]);

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
          className={`color-selector-container h-[255px] w-[255px] absolute translate-y-[-318px] translate-x-[-115px] ${
            !isPickerVisible && "hidden"
          }`}
        >
          {isPickerVisible && (
            <div
              className="color-selector"
              style={{ zIndex: active === id ? 1000 : 0 }}
            >
              <RgbaColorPicker
                color={
                  id === "handle1" ? bgProperties.color1 : bgProperties.color2
                }
                onChange={(e) => {
                  setBGProperties((prev) => {
                    console.log(e);
                    if (id === "handle1") {
                      prev = {
                        ...prev,
                        color1: e,
                      };
                    } else {
                      prev = {
                        ...prev,
                        color2: e,
                      };
                    }
                    return prev;
                  });
                }}
              />
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
          <div className="tooltip  ">{stopPercent}%</div>
        </div>
      </div>
    </Draggable>
  );
};

export default GradientSliderHandle;
