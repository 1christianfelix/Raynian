import React, { useState, useEffect } from "react";
import GradientSlider from "./GradientSlider";
import AnglePicker from "./AnglePicker";
import { ColorPickerStatusProvider } from "./ColorPickerStatusContext";
import tinycolor from "tinycolor2";
import "./bg-customizer.css";

const BgCustomizerMenu = () => {
  const [bgProperties, setBGProperties] = useState({
    color1: { r: 255, g: 255, b: 255, a: 1 },
    position1: 0,
    stopPercent1: 0,
    color2: { r: 255, g: 255, b: 255, a: 1 },
    position2: 498,
    stopPercent2: 100,
    angle: 90,
    angleVal: 0,
  });

  const [colorInput1, setColorInput1] = useState("");
  const [colorInput2, setColorInput2] = useState("");

  useEffect(() => {
    setColorInput1(tinycolor(bgProperties.color1).toString("rgb"));
    setColorInput2(tinycolor(bgProperties.color2).toString("rgb"));
  }, [bgProperties.color1, bgProperties.color2]);

  const handleColorBlur = (id, value) => {
    const color = tinycolor(value);
    if (color.isValid()) {
      setBGProperties((prev) => ({
        ...prev,
        ["color" + id]: color.toRgb(),
      }));
    }
  };

  const handleInputChange = (id, property, value) => {
    console.log("test", typeof value);
    if (property === "angleVal") {
      value = Number(value);
      let angle;
      if (value >= 180 && value < 360) {
        angle = 450 - value; // This will give you the reversed mapping
      }

      if (value >= 0 && value < 90) {
        angle = 90 - value; // This will give you the reversed mapping
      }

      if (value >= 90 && value < 180) {
        angle = 90 - value; // This will give you the reversed mapping
      }

      if (value >= 360) {
        angle = 90;
        value = 0;
      }
      if (value < 0) {
        angle = 99;
        value = 359;
      }

      setBGProperties((prev) => ({
        ...prev,
        ["angle"]: angle,
        [property]: value,
      }));
    }
    if (property.includes("color")) {
      const color = tinycolor(value);
      if (color.isValid()) {
        value = color.toRgb();
        setBGProperties((prev) => ({
          ...prev,
          [property + id]: value,
        }));
      }
    }
  };

  return (
    <ColorPickerStatusProvider>
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="flex flex-col items-end">
          <div className=" bg-slate-300 flex justify-center items-center gap-5">
            <GradientSlider
              bgProperties={bgProperties}
              setBGProperties={setBGProperties}
            />
            <AnglePicker
              angle={bgProperties.angle}
              bgProperties={bgProperties}
              setBGProperties={setBGProperties}
            ></AnglePicker>
          </div>
          <div className="settings-form flex justify-center">
            <div className="flex flex-col gap-2">
              <h2>Handle1</h2>

              <div className="flex items-end ">
                <div className="cursor-default">RGBA:</div>
                <input
                  name="tt"
                  type="text"
                  value=""
                  // onChange={(e) => setColorInput1(e.target.value)}
                  // onBlur={() => handleColorBlur(1, colorInput1)}
                  className="focus:outline hover:bg-white bg-opacity-50 hover:outline outline-1 transition-all"
                />
              </div>
              <div className="flex items-end">
                <span>HEX:</span>
                <input
                  type="text"
                  value={bgProperties.color1}
                  onChange={(e) =>
                    handleInputChange(1, "color", e.target.value)
                  }
                />
              </div>
              <div className="flex items-end">
                <span>Stop:</span>
                <input
                  type="text"
                  value={bgProperties.stopPercent1}
                  onChange={(e) =>
                    handleInputChange(1, "color", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h2>Handle2</h2>
              <div className="flex">
                <span>RGBA:</span>
                <input
                  type="text"
                  value={bgProperties.color2}
                  onChange={(e) =>
                    handleInputChange(1, "color", e.target.value)
                  }
                />
              </div>
              <div className="flex">
                <span>HEX:</span>
                <input
                  type="text"
                  value={bgProperties.color2}
                  onChange={(e) =>
                    handleInputChange(1, "color", e.target.value)
                  }
                />
              </div>
              <div className="flex">
                <span>Stop:</span>
                <input
                  type="text"
                  value={bgProperties.stopPercent2}
                  onChange={(e) =>
                    handleInputChange(1, "color", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="column">
              <h2>Angle</h2>
              <div>
                Angle:
                <input
                  type="number"
                  value={bgProperties.angleVal}
                  onChange={(e) =>
                    handleInputChange("", "angleVal", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ColorPickerStatusProvider>
  );
};

export default BgCustomizerMenu;
