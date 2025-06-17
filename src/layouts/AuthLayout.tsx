import React, { useEffect, useState } from "react";
import { Card } from "../components";
import MainLayout from "./MainLayout";
import { useTheme } from "../contexts/ThemeContext";
import { Theme } from "../constants/theme";
type AuthLayoutProps = {
  children: React.ReactNode;
};

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const [backgroundImage, setBackgroundImage] = useState("/bg-gate-garden.jpg");
  const { theme } = useTheme();

  useEffect(() => {
    const lightBg = "/bg-gate-garden.jpg";
    const darkBg = "/bg-gate-garden-dark.jpg";

    const newImage = theme === Theme.DARK ? darkBg : lightBg;
    setBackgroundImage(newImage);
  }, [theme]);

  return (
    <MainLayout>
      <div className="relative min-h-screen w-full overflow-hidden ">
        <img
          src={backgroundImage}
          key={backgroundImage}
          alt="Background"
          className="absolute inset-0 h-full w-full object-cover z-0 pointer-events-none select-none
            transition-opacity duration-5000 ease-in-out  "
          draggable={false}
        />

        <div className="relative z-10 flex flex-col items-center gap-8">
          <div className="text-center pt-20 pointer-events-none text-[var(--text-color-story-garden)] select-none">
            <p className="text-2xl md:text-4xl lg:text-6xl ">
              Mỗi bước một duyên
            </p>
            <p className="md:text-2xl lg:text-4xl">Tiểu thuyết tương tác</p>
          </div>

          <Card className="w-full max-w-md transform translate-y-50">
            {children}
          </Card>

        </div>
        {/* Static title with Montserrat font */}
      </div>
    </MainLayout>
  );
};
