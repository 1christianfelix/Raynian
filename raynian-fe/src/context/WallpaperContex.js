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
  const [glassMode, setGlassMode] = useState(false);

  const [colorAccents, setColorAccents] = useState({ white: "#ffffff" });

  const [palette, setPalette] = useState([]);

  const [theme, setTheme] = useState([]);

  const { data, loading, error } = usePalette(selectedImage);

  const [wallpaper, setWallpaper] = useState("");
  const [wpStyle, setWpStyle] = useState({});

  useEffect(() => {
    if (selectedImage) {
      setWallpaper(
        <img
          className="absolute -z-10 h-full w-full object-cover"
          src={selectedImage}
        ></img>
      );
    } else {
      setWallpaper(<div></div>);
      setColorAccents({ white: "#ffffff" });
      setPalette([]);
      setTheme([]);
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
    if (selectedImage) colorPaletteBuilder();
    // console.log(colorPalette());
  }, [colorAccents]);

  useEffect(() => {
    if (palette.length > 0) {
      setTheme([
        glassMode
          ? colorAccents[palette[0][0]] + "B4"
          : colorAccents[palette[0][0]],
        colorAccents[palette[0][1]],
      ]);
    }
  }, [palette]);

  useEffect(() => {
    let solid = theme[0];
    if (solid && solid.slice(-2) === "B4") {
      solid = solid.slice(0, -2);
    }
    const style = {
      backgroundColor: solid || "#fafafa",
      boxShadow: `8px 8px 1px ${theme[1] || "#8080807F"}`,
    };
    setWpStyle(style);
  }, [theme]);

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
        wpStyle,
        setGlassMode,
        glassMode,
      }}
    >
      {children}
    </WallpaperContext.Provider>
  );
};
