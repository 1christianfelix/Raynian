import React, { useContext } from "react";
import wp1 from "../background-customizer/wallpapers/panda_newlife_1.png";
import wp2 from "../background-customizer/wallpapers/4910935.png";
import wp3 from "../background-customizer/wallpapers/anime street dark.jpg";
import wp4 from "../background-customizer/wallpapers/pikisuperstar_1.jpg";
import { IoIosAdd } from "react-icons/io";

import { WallpaperContext } from "../../../context/WallpaperContex";

const BackgroundSettings = () => {
  const { setSelectedImage } = useContext(WallpaperContext);

  const wallpapers = [wp1, wp2, wp3, wp4];
  return (
    <div className="w-[700px] rounded-3xl bg-neutral-50 px-[30px] py-10">
      <div className="text-lg font-normal">Wallpapers</div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-7">
        {wallpapers.map((wp, index) => {
          return (
            <img
              key={index}
              src={wp}
              className="h-20 w-20 outline-blue-500 hover:cursor-pointer hover:outline"
              onClick={() => {
                setSelectedImage(wp);
              }}
            ></img>
          );
        })}
        <div className="flex h-20 w-20 items-center justify-center bg-white outline-blue-500 hover:cursor-pointer hover:outline">
          <img
            className="h-[50%]"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Color_circle_%28RGB%29.png/600px-Color_circle_%28RGB%29.png"
            alt="Color Wheel"
          />
        </div>
        <div className="hover:cursor-pointer hover:text-gray-500">
          <IoIosAdd size={50} />
        </div>
      </div>
      <div className="text-lg font-normal">Accents</div>
    </div>
  );
};

export default BackgroundSettings;
