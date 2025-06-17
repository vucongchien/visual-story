import React, { useState } from "react";
import { Button } from "../components";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { FallingLeaves } from "../components/FallingLeaves";
import { ToggleSettingButton } from "../components/ToggleSettingButton";

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
        <img src="/logo.png" className="h-14 md:h-16 object-cover z-30 select-none " alt="" />
      </Link>
      
      <div className="absolute top-4 right-4 z-30">
        <ToggleSettingButton></ToggleSettingButton>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
