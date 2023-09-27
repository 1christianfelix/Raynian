import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WallpaperContext } from "../../context/WallpaperContex";
import { ModalContext } from "../../context/ModalContext";
import { TbCalendarStats } from "react-icons/tb";
import { LuTally5, LuTimer } from "react-icons/lu";
import { AiOutlineFire, AiOutlineLineChart } from "react-icons/ai";
import * as timerActions from "../../slices/timerSlice";
import {
  useUpdateStudyTimeMutation,
  useUpdateLongestStreakMutation,
  useUpdateSessionsCompletedMutation,
} from "../../slices/statsApi";

import moment from "moment";
import "moment-duration-format";

import UserStats from "./UserStats";

import { Tooltip } from "react-tooltip";

const SessionStatsDisplay = () => {
  const dispatch = useDispatch();
  const { wpStyle, theme } = useContext(WallpaperContext);
  const { toggleUserStatsModal, setUserStatsParams } = useContext(ModalContext);
  const { userInfo } = useSelector((state) => state.auth);
  const timerState = useSelector((state) => state.timer);

  const [duration, setDuration] = useState();
  const [format, setFormat] = useState("m [mins]");
  const [listFormats, setListFormats] = useState(false);
  const [longestStreak, setLongestStreak] = useState(null);

  const [updateStudyTime] = useUpdateStudyTimeMutation();
  const [updateSessionsCompleted] = useUpdateSessionsCompletedMutation();
  const [updateLongestStreak] = useUpdateLongestStreakMutation();

  useEffect(() => {
    const hhmmssFormat = moment
      .duration(timerState.sessionElapsedTime, "seconds")
      .format(format, {
        trim: false,
      });
    setDuration(hhmmssFormat);
  }, [timerState.sessionElapsedTime, listFormats]);

  const updateTotalStudyTime = async (totalStudyTimeMins) => {
    const data = { studyTime: totalStudyTimeMins };
    const res = await updateStudyTime({ id: userInfo.user._id, data });
    if (res) {
      setUserStatsParams({
        user: userInfo.user,
      });
    }
    toggleUserStatsModal();
  };

  useEffect(() => {
    updateTotalStudyTime(timerState.totalStudyTimeMins);
  }, []);

  useEffect(() => {
    if (timerState.sessionElapsedTime % 60 == 0) {
      dispatch(
        timerActions.setTotalStudyTimeMins(timerState.totalStudyTimeMins + 1)
      );
    }

    // update database every 10 minutes of active studying if user is logged in
    if (
      userInfo?.user &&
      userInfo.user._id != "guest" &&
      timerState.sessionElapsedTime % 600 == 0
    ) {
      updateTotalStudyTime(timerState.totalStudyTimeMins);
    }
  }, [timerState.sessionElapsedTime]);

  // update sessions Completed

  useEffect(() => {
    const update = async () => {
      if (userInfo?.user && userInfo.user._id !== "guest") {
        const data = {
          sessionsCompleted: 1,
        };
        const res = await updateSessionsCompleted({
          id: userInfo.user._id,
          data,
        });
      }
    };
    update();
  }, [timerState.sessionsCompleted]);

  //update longeststreak
  // Get initial longestStreak
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userInfo?.user?._id && userInfo?.user?._id !== "guest") {
          const response = await fetch(
            `http://localhost:4000/api/user/${userInfo.user._id}/stats`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch stats");
          }

          const data = await response.json();
          setLongestStreak(data[0].longestStreak);
          return data;
        }
      } catch (error) {
        console.error("Error fetching stats:", error.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const update = async () => {
      if (
        longestStreak != null &&
        timerState.sessionStreak > longestStreak.streak
      ) {
        const data = {
          longestStreak: {
            workTime: timerState.workTime.minutes,
            breakTime: timerState.breakTime.minutes,
            streak: timerState.sessionStreak,
          },
        };
        const res = await updateLongestStreak({ id: userInfo.user._id, data });
      }
    };
    update();
  }, [timerState.sessionStreak]);

  return (
    <div className="relative flex flex-col gap-2 w-[100%] text-xs font-normal">
      <div className=" flex justify-between items-center">
        <p className="font-normal text-sm">Current Session Stats</p>
        <div
          className={`p-1 border-2 rounded-full cursor-pointer text-base ${
            userInfo?.user._id == "guest"
              ? "text-gray-500"
              : "hover:scale-90 hover:border-blue-500 transition-all"
          }`}
          onClick={
            userInfo?.user._id != "guest"
              ? () => {
                  updateTotalStudyTime(timerState.totalStudyTimeMins);
                }
              : null
          }
          data-tooltip-id="stats"
          data-tooltip-content={
            userInfo?.user._id == "guest"
              ? "Sign in to view more stats"
              : "See more stats"
          }
          data-tooltip-place="right"
        >
          <AiOutlineLineChart />
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
