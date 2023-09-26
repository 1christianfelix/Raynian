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
  }, [timerState.sessionElapsedTime, listFormats]);

  return (
    <div className="flex w-[100%] items-center text-xs font-normal">
      <div className="flex flex-grow">
        <div className="flex w-1/2 items-center gap-1">
          <LuTally5 />
          <p>Sessions Completed: {timerState.sessionStreak}</p>
        </div>
        <div
          className="relative flex w-1/2 items-center gap-1 hover:cursor-pointer hover:bg-black/20"
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
                  className="absolute left-0 mt-3 flex w-20 flex-col items-center gap-3 bg-neutral-50 py-3"
                  style={{ ...wpStyle, boxShadow: "" }}
                >
                  <div
                    onClick={() => {
                      setFormat("hh:mm:ss");
                    }}
                    className="w-[100%] cursor-pointer text-center outline-blue-500 hover:outline"
                  >
                    <button>hh:mm:ss</button>
                  </div>
                  <div
                    onClick={() => {
                      setFormat("h [hr] m [min]");
                    }}
                    className="w-[100%] cursor-pointer text-center outline-blue-500 hover:outline"
                  >
                    <button>h m</button>
                  </div>
                  <div
                    onClick={() => {
                      setFormat("m [min]");
                    }}
                    className="w-[100%] cursor-pointer text-center outline-blue-500 hover:outline"
                  >
                    <button>mins</button>
                  </div>
                  <div
                    onClick={() => {
                      setFormat("s [sec]");
                    }}
                    className="w-[100%] cursor-pointer text-center outline-blue-500 hover:outline"
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
        className="cursor-pointer text-base"
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
