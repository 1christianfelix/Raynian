import React, { useContext, useEffect, useState } from "react";
import wp1 from "../background-customizer/wallpapers/panda_newlife_1.png";
import wp2 from "../background-customizer/wallpapers/4910935.png";
import wp3 from "../background-customizer/wallpapers/anime_street_dark.jpg";
import wp4 from "../background-customizer/wallpapers/pikisuperstar_1.jpg";
import { IoIosAdd } from "react-icons/io";

import { WallpaperContext } from "../../../context/WallpaperContex";

const BackgroundSettings = () => {
  const {
    selectedImage,
    setSelectedImage,
    selectedGradient,
    setSelectedGradient,
    colorAccents,
    palette,
    setPalette,
  } = useContext(WallpaperContext);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const colorPalettes = () => {
    const colorKeys = Object.keys(colorAccents);
    const pairs = [];

    for (let color of colorKeys) {
      if (color != "white") pairs.push(["white", color]);
    }

    for (let i = 0; i < colorKeys.length; i++) {
      if (colorKeys[i] == "white") continue;
      for (let j = 0; j < colorKeys.length; j++) {
        if (colorKeys[j] == "white") continue;
        if (!colorKeys[i].includes("dark") && colorKeys[i] != colorKeys[j]) {
          pairs.push([colorKeys[i], colorKeys[j]]);
        }
      }
    }

    return pairs;
  };

  useEffect(() => {
    setPalette(colorPalettes());
    console.log(colorPalettes());
  }, [colorAccents]);

  const wallpapers = [wp1, wp2, wp3, wp4];
  return (
    <div className="relative">
      <div className="flex flex-col gap-6 w-[700px] rounded-3xl bg-neutral-50 px-[30px] py-10">
        <div className="flex flex-col gap-2">
          <div className="text-lg font-normal">Wallpapers</div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-7">
            {wallpapers.map((wp, index) => {
              return (
                <img
                  key={index}
                  src={wp}
                  className={`h-20 w-20 outline-blue-500 hover:cursor-pointer hover:outline ${
                    wp == selectedImage && !selectedGradient && "outline"
                  }`}
                  onClick={() => {
                    setSelectedGradient(false);
                    setSelectedImage(wp);
                  }}
                ></img>
              );
            })}
            <div
              className={`flex h-20 w-20 items-center justify-center bg-white outline-blue-500 hover:cursor-pointer hover:outline ${
                selectedGradient && "outline"
              }`}
              onClick={() => {
                setSelectedGradient(true);
              }}
            >
              <img
                className="h-[50%]"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Color_circle_%28RGB%29.png/600px-Color_circle_%28RGB%29.png"
                alt="Color Wheel"
              />
            </div>
            <label
              htmlFor="fileInput"
              className="hover:cursor-pointer hover:text-gray-500"
            >
              <IoIosAdd size={50} />
            </label>
            <input
              id="fileInput"
              className="absolute hidden"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-lg font-normal">Accents</div>
          <div className="text-lg font-normal grid  grid-cols-6 gap-3">
            {palette.map((color, index) => {
              return (
                <div key={index} className="flex hover:cursor-pointer">
                  <div
                    className="h-10 w-10"
                    style={{ backgroundColor: colorAccents[color[0]] }}
                  ></div>
                  <div
                    className="h-10 w-10"
                    style={{ backgroundColor: colorAccents[color[1]] }}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackgroundSettings;
