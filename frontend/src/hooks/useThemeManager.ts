import { useState, useEffect } from "react";
import { Theme, ThemeType } from "../constants/theme.ts";

export const useThemeManager = () => {
  const [theme, setTheme] = useState<ThemeType>(Theme.LIGHT);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark'); 

    if (theme === Theme.DARK) {
      root.classList.add('dark');
    } else {
      root.classList.add('light'); 
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as ThemeType | null;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      setTheme(prefersDark ? Theme.DARK : Theme.LIGHT);
    }
  },[]);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
    );
  };
  return { theme, toggleTheme };
};
