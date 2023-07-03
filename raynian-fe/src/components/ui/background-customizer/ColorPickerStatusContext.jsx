import React, { createContext, useState } from "react";

export const ColorPickerStatusContext = createContext();

export const ColorPickerStatusProvider = ({ children }) => {
  const [activePicker, setActivePicker] = useState(null);
  return (
    <ColorPickerStatusContext.Provider
      value={{ activePicker, setActivePicker }}
    >
      {children}
    </ColorPickerStatusContext.Provider>
  );
};
