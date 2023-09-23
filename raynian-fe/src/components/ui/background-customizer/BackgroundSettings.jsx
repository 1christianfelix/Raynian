import React from "react";
import wp1 from "../background-customizer/wallpapers/panda_newlife_1.png";
import wp2 from "../background-customizer/wallpapers/4910935.png";
import wp3 from "../background-customizer/wallpapers/anime street dark.jpg";
import wp4 from "../background-customizer/wallpapers/pikisuperstar_1.jpg";
import { PiProhibitBold } from "react-icons/pi";

const BackgroundSettings = () => {
  const wallpapers = [wp1, wp2, wp3, wp4];
  return (
    <div className="w-[700px] rounded-3xl bg-neutral-50 px-[30px] py-10">
      <div className="text-lg font-normal">Wallpapers</div>
      <div className="flex flex-wrap gap-x-5 gap-y-7">
        <div className="h-20 w-20 bg-white flex items-center justify-center">
          <img
            className="h-[50%]"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/ProhibitionSign2.svg/1200px-ProhibitionSign2.svg.png"
            alt="No Symbol"
          />
        </div>
        <div className="h-20 w-20 bg-white flex items-center justify-center">
          <img
            className="h-[50%]"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Color_circle_%28RGB%29.png/600px-Color_circle_%28RGB%29.png"
            alt="Color Wheel"
          />
        </div>
        {wallpapers.map((wp) => {
          return <img src={wp} className="h-20 w-20"></img>;
        })}
      </div>
      <div className="text-lg font-normal">Accents</div>
    </div>
  );
};

export default BackgroundSettings;
