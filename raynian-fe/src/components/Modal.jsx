import React, { useContext } from "react";
import { ModalContext } from "../context/ModalContext";
import { DarkLightContext } from "../context/DarkLightContext";
import { FaRegMoon, FaRegSun } from "react-icons/fa";

export default function Modal(props) {
  const { isModalOpen, toggleModal } = useContext(ModalContext);
  const { toggleDark } = useContext(DarkLightContext);
  let content = null;
  if (!isModalOpen) return null;

  if (props?.type === "dropdown") {
    content = (
      <div
        className={`absolute flex flex-col justify-center right-[20px] top-[80px] rounded-2xl  outline outline-1 dark:bg-black dark:text-white`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="py-[5px] px-[20px] rounded-t-2xl hover:bg-violet-600"
          onClick={toggleModal}
        >
          Profile
        </button>
        <button
          className="py-[5px] px-[20px] hover:bg-violet-600"
          onClick={toggleModal}
        >
          Settings
        </button>
        <button
          className="py-[5px] px-[20px] hover:bg-violet-600"
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
          />
          <label
            for="check"
            className="mode-label relative flex justify-between items-center p-[5px] h-[26px] w-[60px] bg-violet-600 rounded-2xl"
          >
            <h1>a</h1>
            <h2>b</h2>
            <div className="mode-ball absolute bg-white top-[2px] left-[2px] w-[22px] h-[22px] rounded-full translate-x-0 transition-transform duration-200 ease-linear"></div>
          </label>
        </div>
      </div>
    );
  }

  return (
    <div className={`${props.type}-modal-container`} onClick={toggleModal}>
      {content}
    </div>
  );
}
