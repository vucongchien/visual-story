import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const WelcomePage: React.FC = () => {
  const [showPrompt, setShowPrompt] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPrompt(true);
    }, 1000); // Tùy chỉnh thời gian phù hợp với thời gian animation của bạn

    return () => clearTimeout(timer);
  }, []);

  const { user } = useAuth();
  const handleStart = () => {
    if (!user) {
      navigate('/login');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div
      className="h-screen flex justify-center items-center cursor-pointer"
      onClick={handleStart}
    >
      <div className="inline-flex flex-row space-x-4">
      <img
          src="/bg-gate-garden.jpg"
          alt="Background"
          className="absolute inset-0 h-full w-full object-cover -z-1 pointer-events-none"
        />
        <div className="animate-walk-right">
          <img
            src="/logo_circle_pink.png"
            alt=""
            className="w-16 h-16 object-cover "
          />
        </div>

        <img src="/logo_bow.png" alt="" className="w-16 h-16 object-cover" />
        <div className="animate-walk-left">
          <img
            src="/logo_circle_blue.png"
            alt=""
            className="w-16 h-16 object-cover"
          />
        </div>
      </div>
      {showPrompt && (
        <div className="absolute bottom-1/3 pointer-events-none">
          <p>nhấn vào màn hình để bắt đầu</p>
        </div>
      )}
    </div>
  );
};
