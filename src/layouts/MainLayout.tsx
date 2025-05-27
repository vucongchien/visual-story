import React, { useState } from "react";
import { Button } from "../components";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { ToggleThemeButton } from "../components/ToggleThemeButton";
import { FallingLeaves } from "../components/FallingLeaves";
import { BackgroundMusic } from "../components/BackgroundMusic";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  };

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <BackgroundMusic />
      <FallingLeaves></FallingLeaves>
      <Link to={"/dashboard"} className="absolute top-4 left-4">
        <img src="/logo.png" className=" h-16 object-cover " alt="" />
      </Link>
      <div className="absolute top-4 right-4 ">
        <ToggleThemeButton />
      </div>
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
