import React, { useEffect, useState } from "react";
import { Card } from "../components";
import MainLayout from "./MainLayout";
import { useTheme } from "../contexts/ThemeContext";
import { Theme } from "../constants/theme";
type AuthLayoutProps = {
  children: React.ReactNode;
};

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {

  const [backgroundImage, setBackgroundImage] = useState('/bg-gate-garden.jpg');
  const {theme} = useTheme();

  useEffect(() => {

    const lightBg = '/bg-gate-garden.jpg';
    const darkBg = '/bg-gate-garden-dark.jpg'; 
    
    const newImage = theme === Theme.DARK ? darkBg : lightBg;
    setBackgroundImage(newImage);
  }, [theme]);
  
  return (
    <MainLayout>
      
      <div className="relative min-h-screen w-full overflow-hidden">
        <img
          src={backgroundImage}
          key={backgroundImage} 
          alt="Background"
          className="absolute inset-0 h-full w-full object-cover z-0 pointer-events-none
            transition-opacity duration-5000 ease-in-out "
        />

        {/* Static title with Montserrat font */}
        <div className="fixed inset-0 z-20 flex flex-col items-center pt-20 pointer-events-none">
          <p className="text-6xl ">Mỗi bước một duyên</p>
          <p className="text-4xl">Tiểu thuyết tương tác</p>
        </div>

        <div className="absolute inset-0 z-10 flex justify-center items-center transform translate-y-30">
          <Card className="w-full max-w-md">
            {children}
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};
