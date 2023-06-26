import React from "react";
import { useContext } from "react";
import { TimerContext } from "../context/TimerContext";

export default function Timer() {
  const { countdown, startTimer, stopTimer } = useContext(TimerContext);

  return (
    <div className="font-inter flex flex-row justify-center relative">
      <p className="text-[128px] leading-tight">
        {countdown.minutes < 10 ? `0${countdown.minutes}` : countdown.minutes}:
        {countdown.seconds < 10 ? `0${countdown.seconds}` : countdown.seconds}
      </p>
      <div className="flex flex-col justify-center absolute bottom-[60px] right-[-50px]">
        <div className="mx-[5px]" onClick={startTimer}>
          start
        </div>
        <div className="mx-[5px]" onClick={stopTimer}>
          stop
        </div>
      </div>
    </div>
  );
}
