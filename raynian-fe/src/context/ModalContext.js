import React, { createContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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

  // close login or sign up modals if user signs in (userInfo is not null in auth slice)
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      setType(null);
      toggleModal();
    }
  }, [userInfo]);

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
