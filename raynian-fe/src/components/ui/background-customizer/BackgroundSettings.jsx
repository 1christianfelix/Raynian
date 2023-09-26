import React, { useContext, useEffect, useState } from "react";
import wp1 from "../background-customizer/wallpapers/panda_newlife_1.png";
import wp2 from "../background-customizer/wallpapers/4910935.png";
import wp3 from "../background-customizer/wallpapers/anime_street_dark.jpg";
import wp4 from "../background-customizer/wallpapers/pikisuperstar_1.jpg";
import { IoIosAdd } from "react-icons/io";
import { MdOutlineOpacity } from "react-icons/md";

import { WallpaperContext } from "../../../context/WallpaperContex";
import { BGCustomContext } from "../../../context/BGCustomContext";

import BgCustomizerMenu from "./BgCustomizerMenu";

const BackgroundSettings = () => {
  const { bg } = useContext(BGCustomContext);
  const {
    selectedImage,
    setSelectedImage,
    selectedGradient,
    setSelectedGradient,
    colorAccents,
    palette,
    setPalette,
    theme,
    setTheme,
    wallpaper,
    glassMode,
    setGlassMode,
  } = useContext(WallpaperContext);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    event.target.value = null;
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  useEffect(() => {}, [bg]);

  const wallpapers = [wp1, wp2, wp3, wp4];
  return (
    <div className="relative">
      <div className="flex w-[700px] flex-col gap-6 rounded-3xl bg-neutral-50 px-[30px] py-10">
        <div className="flex flex-col gap-2">
          <div className="text-lg font-normal">Wallpapers</div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-7">
            {wallpapers.map((wp, index) => {
              return (
                <img
                  key={index}
                  src={wp}
                  className={`h-20 w-20 outline-blue-500 hover:cursor-pointer hover:outline ${
                    wp == selectedImage && "outline"
                  }`}
                  onClick={() => {
                    setSelectedImage(wp);
                  }}
                ></img>
              );
            })}

            <div>
              <div
                className={`flex h-20 w-20 items-center justify-center bg-white outline-blue-500 hover:cursor-pointer hover:outline ${
                  selectedImage == "" && "outline"
                }`}
                onClick={() => {
                  setSelectedImage("");
                }}
              >
                <img
                  className="h-[50%]"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/ProhibitionSign.svg/1024px-ProhibitionSign.svg.png"
                  alt="Remove Background"
                />
              </div>
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
          <div className="text-lg font-normal">Themes</div>
          <div className="grid grid-cols-6 place-items-center  gap-3 text-lg font-normal">
            {palette.map((color, index) => {
              return (
                <div
                  key={index}
                  className={`flex outline-blue-500 drop-shadow-lg hover:cursor-pointer hover:outline ${
                    theme[0] == colorAccents[color[0]] &&
                    theme[1] == colorAccents[color[1]] &&
                    "outline"
                  }`}
                  onClick={() => {
                    setTheme([
                      colorAccents[color[0]] + (glassMode ? "B4" : ""),
                      colorAccents[color[1]],
                    ]);
                  }}
                >
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

        <div className="flex items-center justify-center gap-2">
          <div
            className="transition-all hover:scale-110 hover:cursor-pointer"
            style={{ color: theme[0] == "#ffffffB4" ? "#9e9e9e" : theme[0] }}
            onClick={() => {
              setGlassMode((prev) => !prev);
              setTheme([
                theme[0].length <= 7 ? theme[0] + "B4" : theme[0].slice(0, -2),
                theme[1],
              ]);
            }}
          >
            {theme[0] && (
              <MdOutlineOpacity
                color={theme[0].includes("#ffffff") ? "#9e9e9e" : theme[0]}
                size={44}
              />
            )}
          </div>
          <div
            className="transition-all hover:scale-110 hover:cursor-pointer"
            onClick={() => {
              setSelectedGradient((prev) => !prev);
            }}
          >
            <img
              className="h-10 w-10 "
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Color_circle_%28RGB%29.png/600px-Color_circle_%28RGB%29.png"
              alt="Color Wheel"
            />
          </div>
        </div>
      </div>
      <div className="mt-2">{selectedGradient && <BgCustomizerMenu />}</div>
      <div
        className="absolute -right-[28rem] bottom-[25%] flex h-64 w-96 items-center justify-center"
        style={{ background: selectedGradient ? bg : "" }}
      >
        {wallpaper}
        <div
          className="flex h-44 w-64 items-center justify-center text-lg font-bold transition-all duration-[700ms]"
          style={{
            backgroundColor: theme[0] || "#fafafaB4",
            boxShadow: `8px 8px 1px ${theme[1] || "#8080807F"}`,
          }}
        >
          Example panel
        </div>
      </div>
    </div>
  );
};

export default BackgroundSettings;
