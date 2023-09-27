/* eslint-disable tailwindcss/no-custom-classname */
import React, { useEffect, useState, useRef, useContext } from "react";
import { CiUser } from "react-icons/ci";
import UserDropdown from "../util/UserDropdown";
import thick_logo from "../../assets/thick_logo.svg";
import RoomButton from "../rooms/RoomButton";
import { useDispatch, useSelector } from "react-redux";

import { PiImagesSquareThin } from "react-icons/pi";
import { BsFillChatSquareTextFill } from "react-icons/bs";
import { IoIosStats } from "react-icons/io";
import { IoTime } from "react-icons/io5";
import { HiUserGroup } from "react-icons/hi";
import { PanelContext } from "../../context/PanelContext";
import { ModalContext } from "../../context/ModalContext";

export default function Nav() {
  const { toggleBackgroundSettings } = useContext(ModalContext);
  const {
    chatPanel,
    setChatPanel,
    timerPanel,
    setTimerPanel,
    sessionStatsPanel,
    setSessionStatsPanel,
    participantsPanel,
    setParticipantsPanel,
  } = useContext(PanelContext);
  const [openDropdown, setToggleDropdown] = useState(false);
  const navRef = useRef();
  const { roomId } = useSelector((state) => state.room);

  const toggleDropdown = () => {
    setToggleDropdown(!openDropdown);
  };

  useEffect(() => {}, [openDropdown]);

  return (
    <div className="flex h-16 select-none px-[25px] justify-between">
      <div className="flex items-center gap-1">
        <img src={thick_logo} alt="logo" className="h-[3rem] dark:invert" />
        <p className="text-3xl ">raynian</p>
      </div>

      <div className="flex gap-3">
        <div className="flex items-center gap-2 bg-white/10 px-4 backdrop-blur-md">
          <button
            className={`${!sessionStatsPanel ? "text-black" : "text-white"}`}
            onClick={() => setSessionStatsPanel((prev) => !prev)}
          >
            <IoIosStats />
          </button>
          {roomId && (
            <>
              <button
                className={`${
                  !participantsPanel ? "text-black" : "text-white"
                }`}
                onClick={() => setParticipantsPanel((prev) => !prev)}
              >
                <HiUserGroup />
              </button>
              <button
                className={`${!chatPanel ? "text-black" : "text-white"}`}
                onClick={() => setChatPanel((prev) => !prev)}
              >
                <BsFillChatSquareTextFill />
              </button>
            </>
          )}
          <button
            className={`${!timerPanel ? "text-black" : "text-white"}`}
            onClick={() => setTimerPanel((prev) => !prev)}
          >
            <IoTime />
          </button>
        </div>
        <div className="flex items-center gap-2 bg-white/10 px-4 backdrop-blur-md">
          <RoomButton />
          <div onClick={toggleBackgroundSettings}>
            <PiImagesSquareThin
              size={45}
              className="transition-all hover:text-white dark:hover:text-neutral-900 cursor-pointer"
            />
          </div>
          <div
            className="relative"
            ref={navRef}
            onClick={() => toggleDropdown()}
          >
            <CiUser
              size={45}
              className="transition-all hover:text-white dark:hover:text-neutral-900 cursor-pointer"
              onClick={() => toggleDropdown()}
            />
            <UserDropdown
              openDropdown={openDropdown}
              toggleDropdown={toggleDropdown}
              setToggleDropdown={setToggleDropdown}
              navRef={navRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
