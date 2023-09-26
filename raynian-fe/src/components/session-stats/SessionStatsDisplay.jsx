import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WallpaperContext } from "../../context/WallpaperContex";
import { TbCalendarStats } from "react-icons/tb";
import { LuTally5, LuTimer } from "react-icons/lu";

import moment from "moment";
import "moment-duration-format";

import { Tooltip } from "react-tooltip";

const SessionStatsDisplay = () => {
  const { wpStyle, theme } = useContext(WallpaperContext);
  const timerState = useSelector((state) => state.timer);

  const [duration, setDuration] = useState();

  const [format, setFormat] = useState("m [mins]");
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
      <div className="flex flex-grow">
        <div className="w-1/2 flex items-center gap-1">
          <LuTally5 />
          <p>Sessions Completed: {timerState.sessionStreak}</p>
        </div>
        <div
          className="relative w-1/2 hover:cursor-pointer hover:bg-black/20 flex items-center gap-1"
          onClick={() => {
            setListFormats((prev) => !prev);
          }}
        >
          <LuTimer />
          <p>
            Session Time:{" "}
            <div className="relative inline text-xs">
              {duration}
              {listFormats && (
                <div
                  className="w-20 absolute flex flex-col gap-3 mt-3 left-0 bg-neutral-50 items-center py-3"
                  style={{ ...wpStyle, boxShadow: "" }}
                >
                  <div
                    onClick={() => {
                      setFormat("hh:mm:ss");
                    }}
                    className="hover:outline outline-blue-500 w-[100%] text-center cursor-pointer"
                  >
                    <button>hh:mm:ss</button>
                  </div>
                  <div
                    onClick={() => {
                      setFormat("h [hr] m [min]");
                    }}
                    className="hover:outline outline-blue-500 w-[100%] text-center cursor-pointer"
                  >
                    <button>h m</button>
                  </div>
                  <div
                    onClick={() => {
                      setFormat("m [min]");
                    }}
                    className="hover:outline outline-blue-500 w-[100%] text-center cursor-pointer"
                  >
                    <button>mins</button>
                  </div>
                  <div
                    onClick={() => {
                      setFormat("s [sec]");
                    }}
                    className="hover:outline outline-blue-500 w-[100%] text-center cursor-pointer"
                  >
                    <button>secs</button>
                  </div>
                </div>
              )}
            </div>
          </p>
        </div>
      </div>
      <div
        className="text-base cursor-pointer"
        data-tooltip-id="stats"
        data-tooltip-content="see more stats"
        data-tooltip-place="right"
      >
        <TbCalendarStats />
      </div>
      <Tooltip
        id="stats"
        noArrow
        style={{
          color: "white",
          backgroundColor: theme[1],
          padding: "6px",
          fontSize: "16px",
        }}
        opacity={1}
        delayHide={100}
      />
    </div>
  );
};

export default SessionStatsDisplay;
