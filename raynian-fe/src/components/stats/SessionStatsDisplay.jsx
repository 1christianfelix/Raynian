import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WallpaperContext } from "../../context/WallpaperContex";
import { ModalContext } from "../../context/ModalContext";
import { TbCalendarStats } from "react-icons/tb";
import { LuTally5, LuTimer } from "react-icons/lu";
import { AiOutlineFire } from "react-icons/ai";

import moment from "moment";
import "moment-duration-format";

import UserStats from "./UserStats";

import { Tooltip } from "react-tooltip";

const SessionStatsDisplay = () => {
  const { wpStyle, theme } = useContext(WallpaperContext);
  const { toggleUserStatsModal } = useContext(ModalContext);
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
    <div className="relative flex flex-col gap-2 w-[100%] text-xs font-normal">
      <div className=" flex justify-between items-center">
        <p className="font-normal text-sm">Current Session Stats</p>
        <div
          className="hover:scale-90 hover:border-blue-500 transition-all p-1 border-2 border-transparent rounded-full cursor-pointer "
          onClick={toggleUserStatsModal}
        >
          <div
            className="text-base"
            data-tooltip-id="stats"
            data-tooltip-content="see more stats"
            data-tooltip-place="right"
          >
            <TbCalendarStats />
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-1">
          <LuTally5 />
          <p>Completed: {timerState.sessionsCompleted}</p>
        </div>
        <div className="flex  items-center gap-1">
          <AiOutlineFire />
          <p>Streak: {timerState.sessionStreak}</p>
        </div>
        <div
          className="relative flex  items-center gap-1 hover:cursor-pointer hover:bg-black/20"
          onClick={() => {
            setListFormats((prev) => !prev);
          }}
        >
          <LuTimer />
          <p>
            Elapsed Time:{" "}
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
