import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { LuDog, LuCat } from "react-icons/lu";
import { AiOutlineMinusSquare, AiOutlineLineChart } from "react-icons/ai";
import ParticipantTimer from "../pages/ParticipantTimer";

const ParticipantList = () => {
  const { participants, roomId } = useSelector((state) => state.room);
  const timerState = useSelector((state) => state.timer);

  // if (roomId == null) {
  //   return null;
  // }

  return (
    <div className="flex">
      <div className="flex w-[100%] flex-col items-start justify-start gap-4 rounded-lg border border-gray-300 py-5">
        {participants.map((participant, index) => (
          <div
            key={index}
            className="flex w-[100%] flex-row items-center gap-2 px-2 "
          >
            {participant._id === "guest" ? (
              <div className="flex h-7 w-7 items-center justify-center rounded-full border border-black">
                <LuCat />
              </div>
            ) : participant.profilePicture === "" ? (
              <div className="flex h-7 w-7 items-center justify-center rounded-full border border-black">
                <LuDog />
              </div>
            ) : (
              <div>
                <div className="flex h-7 w-7 items-center justify-center">
                  <img
                    className="rounded-full border border-black"
                    src={participant.profilePicture}
                    alt=""
                  />
                </div>
              </div>
            )}
            <div className="flex-grow text-sm font-normal">
              <p className="relative inline-flex gap-1">
                <div>{participant.username}</div>
                {participant.timerData.sessionStreak > 2 && (
                  <div className="relative select-none text-[12px]">
                    <span className="absolute -right-4 -top-1 text-[10px]">
                      {participant.timerData.sessionStreak}x
                    </span>
                    <span>🔥</span>
                  </div>
                )}
              </p>
            </div>
            <div className="hover:cursor-pointer">
              <AiOutlineLineChart />
            </div>
            {participant.timerData && (
              <div className="">
                <ParticipantTimer
                  timer={participant.timerData.countdown}
                  isRunning={participant.timerData.isRunning}
                  isBreak={participant.timerData.isBreak}
                  isWork={participant.timerData.isWork}
                  isPaused={participant.timerData.isPaused}
                  workTime={participant.timerData.workTime}
                  breakTime={participant.timerData.breakTime}
                />
              </div>
            )}
            {/* <button>sync with room</button> */}
          </div>
        ))}
      </div>
      <div className="text-gray-950 hover:cursor-pointer">
        <AiOutlineMinusSquare size={16} />
      </div>
    </div>
  );
};

export default ParticipantList;
