import React, { createContext, useState } from "react";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [type, setType] = useState(null);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (!isModalOpen) setType(null);
  };

  const toggleLogin = () => {
    setType("login");
  };

  const toggleSignup = () => {
    setType("signup");
  };

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        type,
        toggleModal,
        toggleLogin,
        toggleSignup,
        setType,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
