import React, { createContext, useState } from "react";

export const DarkLightContext = createContext();

export const DarkLightProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleDark = () => {
    console.log(isDark);
    setIsDark(!isDark);
  };

  return (
    <DarkLightContext.Provider value={{ isDark, toggleDark }}>
      {children}
    </DarkLightContext.Provider>
  );
};
