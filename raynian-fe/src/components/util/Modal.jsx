import React, { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";
import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";

export default function Modal(props) {
  const { toggleModal, type, setType } = useContext(ModalContext);
  let content = null;
  if (type) {
    content = (
      <div className="center-modal-container" onClick={() => setType(null)}>
        {type === "login" && <LoginPage />}
        {type === "signup" && <SignupPage />}
      </div>
    );
  }
  return <>{content}</>;
}
