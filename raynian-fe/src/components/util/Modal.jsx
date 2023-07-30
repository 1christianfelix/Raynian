import React, { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../context/ModalContext";
import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";
import AfkCheckPage from "../pages/AfkCheckPage";
import RoomPrompt from "../rooms/RoomPrompt";

export default function Modal(props) {
  const { type, setType } = useContext(ModalContext);

  let content = null;

  const handleContent = () => {
    setType(null);
  };

  if (type) {
    content = (
      <div className="absolute h-screen w-[100%] flex items-center justify-center">
        <div className="z-[60]">
          {type === "login" && <LoginPage />}
          {type === "signup" && <SignupPage />}
          {type === "afk" && <AfkCheckPage />}
          {type === "roomPrompt" && <RoomPrompt />}
        </div>
        <div
          className="absolute z-50 h-screen w-screen cursor-pointer backdrop-blur-sm bg-black bg-opacity-50"
          onClick={handleContent}
        ></div>
      </div>
    );
  }
  return <>{content}</>;
}
