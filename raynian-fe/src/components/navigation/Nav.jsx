import React, { useContext, useEffect } from "react";
import { FaCog, FaRegGrinTongue } from "react-icons/fa";
import { ModalContext } from "../../context/ModalContext";
import Modal from "../Modal";
import thick_logo from "../../assets/thick_logo.svg";

export default function Nav() {
  const { toggleModal } = useContext(ModalContext);

  return (
    <div className="px-[25px] py-[20px]">
      <div className="Header flex justify-between">
        <div className="flex items-center gap-[1.25rem]">
          <img src={thick_logo} alt="logo" className="h-[4.5rem]" />
          <p className="text-3xl">raynian</p>
        </div>
        <div className="relative">
          <FaRegGrinTongue size={50} onClick={toggleModal} />
          <Modal type={"dropdown"} />
        </div>
      </div>
    </div>
  );
}
