import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WallpaperContext } from "../../context/WallpaperContex";
import { TbCalendarStats } from "react-icons/tb";

import moment from "moment";
import "moment-duration-format";

const SessionStatsDisplay = () => {
  const { wpStyle } = useContext(WallpaperContext);
  const timerState = useSelector((state) => state.timer);

  const [duration, setDuration] = useState();

  const [format, setFormat] = useState("mm [mins]");
  const [listFormats, setListFormats] = useState(false);

  useEffect(() => {
    const hhmmssFormat = moment
      .duration(timerState.sessionElapsedTime, "seconds")
      .format(format, {
        trim: false,
      });
    setDuration(hhmmssFormat);
  }, [timerState.sessionElapsedTime]);

  return (
    <div className="font-normal text-xs flex items-center w-[100%]">
      <div className="w-1/2">
        <p>Sessions Completed: {timerState.sessionStreak}</p>
      </div>
      <div
        className="relative w-1/2 hover:cursor-pointer"
        onClick={() => {
          setListFormats((prev) => !prev);
        }}
      >
        <p>
          Elapsed Work Time:{" "}
          <div className="relative inline">
            {duration}
            {listFormats && (
              <div
                className="w-20 absolute flex flex-col gap-3 mt-3 left-0 bg-neutral-50 items-center"
                style={{ ...wpStyle, boxShadow: "" }}
              >
                <div className="">
                  <button>hh:mm:ss</button>
                </div>
                <div className="">
                  <button>hours mins</button>
                </div>
                <div className="">
                  <button>mins</button>
                </div>
                <div className="">
                  <button>secs</button>
                </div>
              </div>
            )}
          </div>
        </p>
      </div>
      <div className="text-base">
        <TbCalendarStats />
      </div>
    </div>
  );
};

export default SessionStatsDisplay;
