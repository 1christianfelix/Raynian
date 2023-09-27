import React, { useEffect, useContext } from "react";
import { ModalContext } from "../../context/ModalContext";

const UserStatsModalURL = () => {
  const { toggleUserStatsModal } = useContext(ModalContext);

  useEffect(() => {
    toggleUserStatsModal();
  }, []);
  return <></>;
};

export default UserStatsModalURL;
