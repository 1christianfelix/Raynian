import React, { createContext, useState, useEffect } from "react";
import { usePalette } from "react-palette";

export const WallpaperContext = createContext();

export const WallpaperProvider = ({ children }) => {
  const [selectedImage, setSelectedImage] = useState(
    "/images/backgrounds/lofi1-pikisuperstar.jpg"
  );

  const [colorAccents, setColorAccents] = useState({});

  const { data, loading, error } = usePalette(selectedImage);

  useEffect(() => {
    console.log(data);
    setColorAccents(data);
  }, [selectedImage]);

  return (
    <WallpaperContext.Provider
      value={{ selectedImage, setSelectedImage, colorAccents }}
    >
      {children}
    </WallpaperContext.Provider>
  );
};
