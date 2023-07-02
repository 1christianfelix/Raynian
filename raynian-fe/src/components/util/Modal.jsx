import React, { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../context/ModalContext";
import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";

export default function Modal(props) {
  const { type, setType } = useContext(ModalContext);
  const [mouseDown, setMouseDown] = useState("a");
  const [mouseUp, setMouseUp] = useState("b");

  let content = null;

  useEffect(
    (e) => {
      if (mouseDown === mouseUp && mouseDown === "center-modal-container") {
        setType(null);
      }
    },
    [mouseDown, mouseUp]
  );

  if (type) {
    content = (
      <div
        className="center-modal-container"
        onMouseDown={(e) => {
          setMouseDown(e.target.className);
        }}
        onMouseUp={(e) => {
          setMouseUp(e.target.className);
        }}
      >
        {type === "login" && <LoginPage />}
        {type === "signup" && <SignupPage />}
      </div>
    );
  }
  return <>{content}</>;
}
