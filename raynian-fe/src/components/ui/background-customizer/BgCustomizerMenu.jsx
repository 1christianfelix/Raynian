import React, { useState, useEffect, useContext } from "react";
import GradientSlider from "./GradientSlider";
import AnglePicker from "./AnglePicker";
import { ColorPickerStatusProvider } from "./ColorPickerStatusContext";
import { BGCustomContext } from "../../../context/BGCustomContext";
import tinycolor from "tinycolor2";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { motion } from "framer-motion";
import "./bg-customizer.css";

const BgCustomizerMenu = () => {
  const { bgProperties, setBGProperties } = useContext(BGCustomContext);
  const [showForm, setShowForm] = useState(false);

  // const [bgProperties, setBGProperties] = useState({
  //   color1: { r: 255, g: 255, b: 44, a: 0.3 },
  //   position1: 0,
  //   stopPercent1: 0,
  //   color2: { r: 255, g: 255, b: 255, a: 0.4 },
  //   position2: 498,
  //   stopPercent2: 100,
  //   angle: 90,
  //   angleVal: 0,
  // });

  const [colorInput1, setColorInput1] = useState("");
  const [colorInput2, setColorInput2] = useState("");
  const [colorInput1Hex, setColorInput1Hex] = useState("");
  const [colorInput2Hex, setColorInput2Hex] = useState("");

  useEffect(() => {
    setColorInput1(tinycolor(bgProperties.color1).toRgbString());
    setColorInput1Hex(tinycolor(bgProperties.color1).toHexString());
    setColorInput2(tinycolor(bgProperties.color2).toRgbString());
    setColorInput2Hex(tinycolor(bgProperties.color2).toHexString());
  }, [bgProperties.color1, bgProperties.color2]);

  const handleColorBlur = (id, value) => {
    console.log("hh", value);
    const color = tinycolor(value);
    let rgba = {
      r: color.toRgb().r,
      g: color.toRgb().g,
      b: color.toRgb().b,
      a: color.toRgb().a,
    };
    // console.log(typeof color.toRgb());
    if (color.isValid()) {
      setBGProperties((prev) => ({
        ...prev,
        ["color" + id]: rgba,
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

    if (property === "colorInput") {
      switch (id) {
        case "1":
          setColorInput1(value);
          break;
        case "2":
          setColorInput2(value);
          break;
      }
    }

    if (property === "colorInputHex") {
      switch (id) {
        case "1":
          setColorInput1Hex(value);
          break;
        case "2":
          setColorInput2Hex(value);
          break;
      }
    }

    if (property === "stop") {
      value = Number(value);
      setBGProperties((prev) => ({
        ...prev,
        ["position" + id]: Math.round(value * 4.98),
        ["stopPercent" + id]: value,
      }));
    }

    // if (property.includes("color")) {
    //   console.log("lor", value);
    //   const color = tinycolor(value);
    //   if (color.isValid()) {
    //     console.log("lor test");
    //     value = color.toRgb();
    //     setBGProperties((prev) => ({
    //       ...prev,
    //       [property + id]: value,
    //     }));
    //   }
    // }
  };

  return (
    <ColorPickerStatusProvider>
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="p-4 pt-8 flex flex-col bg-yellow-600 bg-opacity-50 shadow-2xl shadow-[rgba(0,0,0,.5)] rounded-3xl">
          <div className="flex justify-center items-center gap-5">
            <GradientSlider
              bgProperties={bgProperties}
              setBGProperties={setBGProperties}
            />
            <AnglePicker
              angle={bgProperties.angle}
              bgProperties={bgProperties}
              setBGProperties={setBGProperties}
            />
          </div>

          <motion.div
            className="flex justify-center mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <button
              className="p-2 bg-gray-500 text-white rounded-full px-6 flex items-center shadow-md"
              onClick={() => setShowForm(!showForm)}
            >
              Advanced Settings
              <motion.span
                animate={{ rotate: showForm ? 180 : 0 }}
                transition={{ duration: 0.5 }}
              >
                {showForm ? <FaAngleUp /> : <FaAngleDown />}
              </motion.span>
            </button>
          </motion.div>

          <motion.div
            initial={{ height: 0 }}
            animate={{ height: showForm ? "auto" : 0 }}
            transition={{ duration: 0.5 }}
            style={{ overflow: "hidden", paddingBottom: "2rem" }}
          >
            <div className="settings-form flex justify-center mt-8 px-5 space-x-5">
              <div className="flex flex-col gap-4 text-md font-semibold">
                <h2 className="text-xl">Handle1</h2>

                <div className="flex items-center ">
                  <label htmlFor="rgba1" className="font-bold text-gray-700">
                    RGBA:
                  </label>
                  <input
                    id="rgba1"
                    placeholder="rgba(255, 255, 255, 1)"
                    type="text"
                    value={colorInput1}
                    onChange={(e) =>
                      handleInputChange("1", "colorInput", e.target.value)
                    }
                    onBlur={(e) => handleColorBlur(1, e.target.value)}
                    className="text-sm focus:outline-none rounded bg-white text-black shadow-inner p-2"
                  />
                </div>

                <div className="flex items-center ">
                  <label htmlFor="hex1" className="font-bold text-gray-700">
                    HEX:
                  </label>
                  <input
                    id="hex1"
                    placeholder="#ffffff"
                    type="text"
                    value={colorInput1Hex}
                    onChange={(e) =>
                      handleInputChange("1", "colorInputHex", e.target.value)
                    }
                    onBlur={(e) => handleColorBlur(1, e.target.value)}
                    className="text-sm focus:outline-none rounded bg-white text-black shadow-inner p-2"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4 text-md font-semibold">
                <h2 className="text-xl">Handle2</h2>

                <div className="flex items-center ">
                  <label htmlFor="rgba2" className="font-bold text-gray-700">
                    RGBA:
                  </label>
                  <input
                    id="rgba2"
                    placeholder="rgba(255, 255, 255, 1)"
                    type="text"
                    value={colorInput2}
                    onChange={(e) =>
                      handleInputChange("2", "colorInput", e.target.value)
                    }
                    onBlur={(e) => handleColorBlur(2, e.target.value)}
                    className="text-sm focus:outline-none rounded bg-white text-black shadow-inner p-2"
                  />
                </div>

                <div className="flex items-center">
                  <label htmlFor="hex2" className="font-bold text-gray-700">
                    HEX:
                  </label>
                  <input
                    id="hex2"
                    placeholder="#ffffff"
                    type="text"
                    value={colorInput2Hex}
                    onChange={(e) =>
                      handleInputChange("2", "colorInputHex", e.target.value)
                    }
                    onBlur={(e) => handleColorBlur(2, e.target.value)}
                    className="text-sm focus:outline-none rounded bg-white text-black shadow-inner p-2"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4 text-md font-semibold">
                <h2 className="text-xl mb-3">Angle</h2>

                <div className="flex items-center space-x-2">
                  <label htmlFor="angle" className="font-bold text-gray-700">
                    Deg:
                  </label>
                  <input
                    id="angle"
                    type="number"
                    value={bgProperties.angleVal}
                    onChange={(e) =>
                      handleInputChange("", "angleVal", e.target.value)
                    }
                    className="w-[60px] text-sm focus:outline-none rounded bg-white text-black shadow-inner p-2"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </ColorPickerStatusProvider>
  );
};

export default BgCustomizerMenu;
