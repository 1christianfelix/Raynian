import React, { useContext } from "react";
import { ModalContext } from "../context/ModalContext";
import { FaRegMoon, FaRegSun } from "react-icons/fa";

export default function Modal(props) {
  const { isModalOpen, toggleModal } = useContext(ModalContext);
  let content = null;
  if (!isModalOpen) return null;

  if (props?.type === "dropdown") {
    content = (
      <div
        className={`absolute flex flex-col justify-center bg-white  right-[20px] top-[80px] rounded-2xl  outline outline-1 ${
          props.width ? `w-${props.width}` : `w-[]`
        }`}
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
        <div className="flex">
          <button className="py-[5px] px-[20px] pr-[2.5px] "></button>
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
