import React, { useContext } from "react";
import { ModalContext } from "../context/ModalContext";

export const Modal = () => {
  const { isModalOpen, toggleModal } = useContext(ModalContext);

  if (!isModalOpen) return null;

  return (
    <div>
      <h1>Modal Content</h1>
      <button onClick={toggleModal}>Close Modal</button>
    </div>
  );
};
