import React from "react";
import { Card } from "../components";
import MainLayout from "./MainLayout";
type AuthLayoutProps = {
  children: React.ReactNode;
};

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <MainLayout>
      
      <div className="relative min-h-screen w-full overflow-hidden">
        {/* Dùng thẻ img để hình nền co giãn theo zoom */}
        <img
          src="/bg-gate-garden.jpg"
          alt="Background"
          className="absolute inset-0 h-full w-full object-cover z-0 pointer-events-none"
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
