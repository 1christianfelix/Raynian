/* eslint-disable tailwindcss/no-custom-classname */
import React, { useEffect, useState, useRef } from "react";
import { CiUser } from "react-icons/ci";
import UserDropdown from "../util/UserDropdown";
import thick_logo from "../../assets/thick_logo.svg";

export default function Nav() {
  const [openDropdown, setToggleDropdown] = useState(false);
  const navRef = useRef();

  const toggleDropdown = () => {
    setToggleDropdown(!openDropdown);
  };

  useEffect(() => {}, [openDropdown]);

  return (
    <div className="select-none px-[25px] py-[20px]">
      <div className="Header flex justify-between">
        <div className="flex items-center gap-[1.25rem]">
          <img
            src={thick_logo}
            alt="logo"
            className="dark:invert lg:h-[2.5rem] xl:h-[3.5rem] 2xl:h-[4.5rem]"
          />
          <p className="text-3xl">raynian</p>
        </div>
        <div className="relative" ref={navRef} onClick={() => toggleDropdown()}>
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
  );
}
