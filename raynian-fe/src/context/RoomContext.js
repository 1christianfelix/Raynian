import React, { createContext, useState } from "react";
import { Howl } from "howler";
import sound1 from "../assets/sounds/sound1.mp3";

export const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  const [volume, setVolume] = useState(0.1); //set in local storage
  const [postWorkAlarm, setPostWorkAlarm] = useState(null);
  const [postBreakAlarm, setPostBreakAlarm] = useState(null);
  const [background, setBackground] = useState(null);

  const playSound = (src) => {
    const sound = new Howl({
      src: sound1,
      html5: true,
      volume: volume,
    });
    sound.play();
  };
  return (
    <RoomContext.Provider value={{ playSound, volume, setVolume }}>
      {children}
    </RoomContext.Provider>
  );
};
