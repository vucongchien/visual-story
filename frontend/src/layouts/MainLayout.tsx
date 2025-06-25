import React, { useState } from "react";
import { Button } from "../components";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { FallingLeaves } from "../components/FallingLeaves";
import { ToggleSettingButton } from "../components/ToggleSettingButton";
import { ToggleSoundButton } from "../components/ToggleSoundButton";
import { ToggleThemeButton } from "../components/ToggleThemeButton";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {

  return (
    <div
      className="min-h-screen"
    >
      <FallingLeaves></FallingLeaves>

      <Link to={"/dashboard"} className="absolute top-4 left-4 z-30">
        <img src="/logo.png" className="h-14 md:h-16 object-cover z-30 select-none " alt="" draggable={false}/>
      </Link>
      
      <div className="absolute top-4 right-4 z-30 mt-4 flex flex-col gap-4">
        <ToggleSettingButton />
        <ToggleSoundButton />
        <ToggleThemeButton />
      </div>
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
