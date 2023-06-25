import React from "react";
import { FaCog, FaRegGrinTongue } from "react-icons/fa";
import thick_logo from "../../assets/thick_logo.svg";

export default function Nav() {
  return (
    <div className="Header h- w-screen p-[0.9375rem] flex justify-between">
      <div className="flex items-center gap-[1.25rem]">
        <img src={thick_logo} alt="logo" className="h-[4.5rem]" />
        <p className="text-3xl ">raynian</p>
      </div>
      <FaRegGrinTongue size={50}></FaRegGrinTongue>
    </div>
  );
}
