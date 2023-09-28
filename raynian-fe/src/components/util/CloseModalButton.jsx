import React, { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";
import { RxCross1 } from "react-icons/rx";

const CloseModalButton = () => {
  const { type, setType } = useContext(ModalContext);
  const handleContent = () => {
    setType(null);
  };
  return (
    <div className="absolute right-4 top-4 z-[100] ">
      <div onClick={handleContent} className="cursor-pointer">
        <RxCross1 />
      </div>
    </div>
  );
};

export default CloseModalButton;
