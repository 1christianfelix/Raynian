import React, { useContext } from "react";
import { ModalContext } from "../context/ModalContext";
import { DarkLightContext } from "../context/DarkLightContext";
import { FaRegMoon, FaRegSun } from "react-icons/fa";
import { BsFillBrightnessHighFill } from "react-icons/bs";

export default function Modal(props) {
  const { isModalOpen, toggleModal } = useContext(ModalContext);
  const { theme, toggleDark } = useContext(DarkLightContext);
  let content = null;
  if (!isModalOpen) return null;

  if (props?.type === "dropdown") {
    content = (
      <div
        className={`absolute flex flex-col justify-center right-[20px] top-[80px] rounded-[8px]  bg-white drop-shadow-md dark:bg-slate-900 dark:text-white transition`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="py-[5px] px-[20px] rounded-t-2xl hover:bg-gray-200 dark:hover:bg-gray-600"
          onClick={toggleModal}
        >
          Profile
        </button>
        <button
          className="py-[5px] px-[20px] hover:bg-gray-200 dark:hover:bg-gray-600"
          onClick={toggleModal}
        >
          Settings
        </button>
        <button
          className="py-[5px] px-[20px] hover:bg-gray-200 dark:hover:bg-gray-600"
          onClick={toggleModal}
        >
          Stats
        </button>
        <div className="py-[5px] px-[20px]">
          <input
            type="checkbox"
            id="check"
            className="mode-checkbox opacity-0 absolute"
            onChange={toggleDark}
            checked={theme === "dark"}
          />
          <label
            for="check"
            className="mode-label relative flex justify-between items-center p-[5px] h-[26px] w-[60px] bg-slate-700 rounded-2xl cursor-pointer"
          >
            <FaRegMoon className=" text-yellow-400 dark:text-yellow-400" />
            <BsFillBrightnessHighFill className=" text-yellow-400 dark:text-yellow-400" />
            <div className="mode-ball absolute bg-white top-[2px] left-[2px] w-[22px] h-[22px] rounded-full translate-x-0 transition-transform duration-150 ease-linear"></div>
          </label>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${props.type}-modal-container transition-all duration-100`}
      onClick={toggleModal}
    >
      {content}
    </div>
  );
}
