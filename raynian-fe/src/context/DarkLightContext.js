import React, { createContext, useEffect, useState } from "react";

export const DarkLightContext = createContext();

export const DarkLightProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const toggleDark = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  return (
    <DarkLightContext.Provider value={{ theme, toggleDark }}>
      {children}
    </DarkLightContext.Provider>
  );
};
