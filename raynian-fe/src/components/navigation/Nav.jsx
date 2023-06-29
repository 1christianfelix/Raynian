import React, { useContext, useEffect } from "react";
import { FaCog, FaRegGrinTongue } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { ModalContext } from "../../context/ModalContext";
import UserDropdown from "../util/UserDropdown";
import thick_logo from "../../assets/thick_logo.svg";

export default function Nav() {
  const { toggleModal } = useContext(ModalContext);

  return (
    <div className="px-[25px] py-[20px]">
      <div className="Header flex justify-between">
        <div className="flex items-center gap-[1.25rem]">
          <img
            src={thick_logo}
            alt="logo"
            className="h-[4.5rem] dark:filter dark:invert"
          />
          <p className="text-3xl">raynian</p>
        </div>
        <div className="relative">
          <CiUser size={50} onClick={toggleModal} className="cursor-pointer" />
          <UserDropdown type={"dropdown"} />
        </div>
      </div>
    </div>
  );
}
