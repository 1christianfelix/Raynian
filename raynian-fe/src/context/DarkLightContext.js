import React, { createContext, useEffect, useState } from "react";

export const DarkLightContext = createContext();

export const DarkLightProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleDark = () => {
    console.log(isDark);
    setIsDark(!isDark);
  };

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    console.log("AAA");
  }, [isDark]);

  return (
    <DarkLightContext.Provider value={{ isDark, toggleDark }}>
      {children}
    </DarkLightContext.Provider>
  );
};
