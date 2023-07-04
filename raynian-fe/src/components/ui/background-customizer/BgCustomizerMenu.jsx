import React, { useState } from "react";
import GradientSlider from "./GradientSlider";
import AnglePicker from "./AnglePicker";
import { ColorPickerStatusProvider } from "./ColorPickerStatusContext";
import "./bg-customizer.css";

const BgCustomizerMenu = () => {
  const [bgProperties, setBGProperties] = useState({
    color1: { r: 255, g: 255, b: 255, a: 1 },
    position1: 0,
    stopPercentage1: 0,
    color2: { r: 255, g: 255, b: 255, a: 1 },
    position2: 498,
    stopPercentage2: 100,
    angle: 0,
    angleVal: 90,
  });

  const handleInputChange = (id, property, value) => {
    setBGProperties((prev) => ({
      ...prev,
      [property + id]: value,
    }));
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
              bgProperties={bgProperties}
              setBGProperties={setBGProperties}
            ></AnglePicker>
          </div>
          <div className="settings-form flex justify-center">
            <div className="flex flex-col gap-2">
              <h2>Handle1</h2>
              <label>
                Color:
                <input
                  type="text"
                  value={bgProperties.color1}
                  onChange={(e) =>
                    handleInputChange(1, "color", e.target.value)
                  }
                />
              </label>
              <label>
                Position:
                <input
                  type="text"
                  value={bgProperties.position1}
                  onChange={(e) =>
                    handleInputChange(1, "position", e.target.value)
                  }
                />
              </label>
            </div>
            <div className="flex flex-col gap-2">
              <h2>Handle2</h2>
              <label>
                Color:
                <input
                  type="text"
                  value={bgProperties.color2}
                  onChange={(e) =>
                    handleInputChange(2, "color", e.target.value)
                  }
                />
              </label>
              <label>
                Position:
                <input
                  type="text"
                  value={bgProperties.position2}
                  onChange={(e) =>
                    handleInputChange(2, "position", e.target.value)
                  }
                />
              </label>
            </div>
            <div className="column">
              <h2>Angle</h2>
              <label>
                Angle:
                <input
                  type="text"
                  value={bgProperties.angleVal}
                  onChange={(e) =>
                    handleInputChange("", "angle", e.target.value)
                  }
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </ColorPickerStatusProvider>
  );
};

export default BgCustomizerMenu;
