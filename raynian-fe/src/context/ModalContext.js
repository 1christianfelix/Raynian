import React, { createContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [type, setType] = useState(null);
  const [userStatsParams, setUserStatsParams] = useState({
    user: {},
  });

  const toggleLogin = () => {
    setType("login");
  };

  const toggleSignup = () => {
    setType("signup");
  };

  const toggleAFK = () => {
    setType("afk");
  };

  const toggleJoinRoomPrompt = () => {
    setType("joinRoomPrompt");
  };

  const toggleOpenRoomPrompt = () => {
    setType("openRoomPrompt");
  };

  const toggleLeaveRoomPrompt = () => {
    setType("leaveRoomPrompt");
  };

  const toggleTimerSettings = () => {
    setType("timerSettings");
  };

  const toggleBackgroundSettings = () => {
    setType("backgroundSettings");
  };

  const toggleUserStatsModal = () => {
    setType("userStats");
  };

  // close login or sign up modals if user signs in (userInfo is not null in auth slice)
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
      if (!isModalOpen) setType(null);
    };
    if (userInfo && (type == "login" || type == "signup")) {
      setType(null);
      toggleModal();
    }
  }, [userInfo]);

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        setIsModalOpen,
        type,
        toggleLogin,
        toggleSignup,
        toggleAFK,
        toggleJoinRoomPrompt,
        toggleOpenRoomPrompt,
        toggleLeaveRoomPrompt,
        toggleTimerSettings,
        toggleBackgroundSettings,
        toggleUserStatsModal,
        userStatsParams,
        setUserStatsParams,
        setType,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
