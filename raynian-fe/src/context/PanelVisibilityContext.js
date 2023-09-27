import React, { createContext, useState, useEffect, useContext } from "react";
export const PanelContext = createContext();

export const PanelProvider = ({ children }) => {
  return <PanelContext.Provider value={{}}>{children}</PanelContext.Provider>;
};
