import React, { createContext, useState, useEffect } from "react";

export const BGCustomContext = createContext();

export const BGCustomProvider = ({ children }) => {
  const [bgProperties, setBGProperties] = useState({
    color1: { r: 255, g: 255, b: 255, a: 0.3 },
    position1: 0,
    stopPercent1: 0,
    color2: { r: 255, g: 255, b: 255, a: 0.4 },
    position2: 498,
    stopPercent2: 100,
    angle: 90,
    angleVal: 0,
  });

  let color1 = bgProperties.color1;
  let color2 = bgProperties.color1;
  const [bg, setBg] = useState(
    `linear-gradient(${bgProperties.angleVal}deg, rgba(${color1.r}, ${color1.g}, ${color1.b}, ${color1.a}) ${bgProperties.stopPercent1}%, rgba(${color2.r}, ${color1.g}, ${color2.b}, ${color2.a}) ${bgProperties.stopPercent2}%), #FFF`
  );

  useEffect(() => {
    let color1 = bgProperties.color1;
    let color2 = bgProperties.color2;

    setBg(
      `linear-gradient(${bgProperties.angleVal}deg, rgba(${color1.r}, ${color1.g}, ${color1.b}, ${color1.a}) ${bgProperties.stopPercent1}%, rgba(${color2.r}, ${color2.g}, ${color2.b}, ${color2.a}) ${bgProperties.stopPercent2}%)`
    );
    console.log(bg);
  }, [bgProperties]);

  return (
    <BGCustomContext.Provider value={{ bgProperties, setBGProperties, bg }}>
      {children}
    </BGCustomContext.Provider>
  );
};
