import React, { createContext, useState } from "react";

export const BGCustomContext = createContext();

export const BGCustomProvider = ({ children }) => {
  const [bgProperties, setBGProperties] = useState({
    color1: { r: 255, g: 255, b: 44, a: 0.3 },
    position1: 0,
    stopPercent1: 0,
    color2: { r: 255, g: 255, b: 255, a: 0.4 },
    position2: 498,
    stopPercent2: 100,
    angle: 90,
    angleVal: 0,
  });
  return (
    <BGCustomContext.Provider value={{ bgProperties, setBGProperties }}>
      {children}
    </BGCustomContext.Provider>
  );
};
