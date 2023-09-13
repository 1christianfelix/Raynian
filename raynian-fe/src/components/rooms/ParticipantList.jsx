import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { LuDog, LuCat } from "react-icons/lu";
import ParticipantTimer from "../pages/ParticipantTimer";

const ParticipantList = () => {
  const { participants, roomId } = useSelector((state) => state.room);
  const timerState = useSelector((state) => state.timer);

  return (
    <div className="flex flex-col items-start justify-start gap-2">
      {participants.map((participant, index) => (
        <div
          key={index}
          className="flex flex-row items-center justify-center gap-2"
        >
          {participant._id === "guest" ? (
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-black">
              <LuCat />
            </div>
          ) : participant.profilePicture === "" ? (
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-black">
              <LuDog />
            </div>
          ) : (
            <div>
              <div className="flex h-10 w-10 items-center justify-center">
                <img
                  className="rounded-full border border-black"
                  src={participant.profilePicture}
                  alt=""
                />
              </div>
            </div>
          )}
          <div className="text-sm">{participant.username}</div>
          {participant.timerData && (
            <ParticipantTimer
              timer={participant.timerData.countdown}
              isRunning={participant.timerData.isRunning}
              isBreak={participant.timerData.isBreak}
              isWork={participant.timerData.isWork}
              isPaused={participant.timerData.isPaused}
              workTime={participant.timerData.workTime}
              breakTime={participant.timerData.breakTime}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ParticipantList;
