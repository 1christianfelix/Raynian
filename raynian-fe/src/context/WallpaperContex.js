import React, { createContext, useState, useEffect, useContext } from "react";
import { usePalette } from "react-palette";
import { BGCustomContext } from "./BGCustomContext";

export const WallpaperContext = createContext();

export const WallpaperProvider = ({ children }) => {
  const { bg } = useContext(BGCustomContext);
  const [selectedImage, setSelectedImage] = useState(
    "/images/backgrounds/lofi1-pikisuperstar.jpg"
  );
  const [selectedGradient, setSelectedGradient] = useState(false);

  const [colorAccents, setColorAccents] = useState({ white: "#ffffffD0" });

  const [palette, setPalette] = useState([]);

  const [theme, setTheme] = useState([]);

  const { data, loading, error } = usePalette(selectedImage);

  const [wallpaper, setWallpaper] = useState("");

  useEffect(() => {
    if (!selectedGradient) {
      setWallpaper(
        <img
          className="absolute -z-10 h-full w-full object-cover"
          src={selectedImage}
        ></img>
      );
    } else {
      setWallpaper(
        <div
          style={{
            position: "absolute",
            zIndex: "-10",
            height: "100%",
            width: "100%",
            background: bg,
          }}
        ></div>
      );
    }
  }, [selectedImage, selectedGradient]);

  const colorPaletteBuilder = () => {
    const colorKeys = Object.keys(colorAccents);
    const pairs = [];

    for (let color of colorKeys) {
      if (color != "white") pairs.push(["white", color]);
    }

    for (let i = 0; i < colorKeys.length; i++) {
      if (colorKeys[i] == "white") continue;
      for (let j = 0; j < colorKeys.length; j++) {
        if (colorKeys[j] == "white") continue;
        if (!colorKeys[i].includes("dark") && colorKeys[i] != colorKeys[j]) {
          pairs.push([colorKeys[i], colorKeys[j]]);
        }
      }
    }
    setPalette(pairs);
  };

  useEffect(() => {
    colorPaletteBuilder();
    // console.log(colorPalette());
  }, [colorAccents]);

  useEffect(() => {
    if (palette.length > 0) {
      setTheme([colorAccents[palette[0][0]], colorAccents[palette[0][1]]]);
    }
  }, [palette]);

  useEffect(() => {
    console.log(data);
    setColorAccents((prev) => {
      return { ...prev, ...data };
    });
  }, [selectedImage, data]);

  return (
    <WallpaperContext.Provider
      value={{
        selectedImage,
        setSelectedImage,
        colorAccents,
        selectedGradient,
        setSelectedGradient,
        theme,
        setTheme,
        wallpaper,
        palette,
        setPalette,
      }}
    >
      {children}
    </WallpaperContext.Provider>
  );
};
