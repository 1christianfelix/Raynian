/* eslint-disable tailwindcss/no-custom-classname */
import React, { useEffect, useState, useRef } from "react";
import { CiUser } from "react-icons/ci";
import UserDropdown from "../util/UserDropdown";
import thick_logo from "../../assets/thick_logo.svg";
import RoomButton from "../rooms/RoomButton";

export default function Nav() {
  const [openDropdown, setToggleDropdown] = useState(false);
  const navRef = useRef();

  const toggleDropdown = () => {
    setToggleDropdown(!openDropdown);
  };

  useEffect(() => {}, [openDropdown]);

  return (
    <div className="select-none px-[25px] py-[20px]">
      <div className="Header flex ">
        <div className="flex items-center gap-1">
          <img src={thick_logo} alt="logo" className="h-[3rem] dark:invert" />
          <p className="text-2xl">raynian</p>
        </div>
        <div className="ml-auto flex gap-2">
          <RoomButton />
          <div
            className="relative"
            ref={navRef}
            onClick={() => toggleDropdown()}
          >
            <CiUser
              size={50}
              className="cursor-pointer"
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
