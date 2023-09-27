import React, { createContext, useState, useEffect, useContext } from "react";
export const PanelContext = createContext();

export const PanelProvider = ({ children }) => {
  const [chatPanel, setChatPanel] = useState(true);
  const [timerPanel, setTimerPanel] = useState(true);
  const [sessionStatsPanel, setSessionStatsPanel] = useState(true);
  const [participantsPanel, setParticipantsPanel] = useState(true);
  return (
    <PanelContext.Provider
      value={{
        chatPanel,
        setChatPanel,
        timerPanel,
        setTimerPanel,
        sessionStatsPanel,
        setSessionStatsPanel,
        participantsPanel,
        setParticipantsPanel,
      }}
    >
      {children}
    </PanelContext.Provider>
  );
};
