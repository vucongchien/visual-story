import React, { useState, useEffect, useMemo } from "react";
import { Button } from "../components";
import { SessionList } from "../components/SessionList";
import { NewGamePopup } from "../components/NewGamePopup";
import MainLayout from "../layouts/MainLayout";
import { useTheme } from "../contexts/ThemeContext";
import { Theme } from "../constants/theme";
import { useSessions } from "../hooks/useSession";
import { LoadingDots } from "../components/LoadingDots";
import { ShovelDeleteSession } from "../components/ShovelDeleteSession";
import { useSessionDeletionHandler } from "../hooks/useSessionDeletionHandler";
import Circle from "../components/textdrag";
import { ConfirmDialog } from "../components/ConfirmDialog";

export const DashBoardPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const { sessions, handleDrop,cancelDelete,confirmDelete,pendingDeleteId } = useSessionDeletionHandler("shovel");



  const [backgroundImage, setBackgroundImage] = useState(
    "/bg-story-garden.jpg"
  );
  const { theme } = useTheme();
  useEffect(() => {
    const newImage =
      theme === Theme.DARK
        ? "/bg-story-garden-dark.png"
        : "/bg-story-garden.png";
    setBackgroundImage(newImage);
  }, [theme]);
  const togglePopup = () => setShowPopup((prev) => !prev);
  const handleClosePopup = () => setShowPopup(false);

  return (
    <MainLayout>
      <div className="relative min-h-screen w-full overflow-hidden">
        <div className="fixed inset-0 z-20 flex flex-col items-center pt-20 pointer-events-none transition-opacity duration-5000 ease-in-out ">
          <p className="text-2xl md:text-4xl lg:text-6xl text-[var(--text-color-story-garden)]">
            Khu Vườn Truyện
          </p>
        </div>
        <img
          src={backgroundImage}
          key={backgroundImage}
          alt="Background"
          className="absolute inset-0 h-full w-full object-cover pointer-events-none"
          draggable={false}
        />
        <div className="absolute inset-0 z-10">
          <div className="">
            <SessionList sessions={sessions} />
          </div>

          <div className="absolute right-1/4 bottom-1/4 z-10">
            <div className="flex flex-col items-center justify-center gap-6">
              <Button
                variant="story_button"
                className="w-full max-w-xs hover:translate-y-2"
                onClick={togglePopup}
              >
                <div className="p-2">
                  <p>Trồng </p>
                  <p>truyện mới</p>
                </div>
              </Button>
            </div>
          </div>
          <Circle />
          <ShovelDeleteSession onDrop={handleDrop} />

          <NewGamePopup isOpen={showPopup} onClose={handleClosePopup} />
          <ConfirmDialog
            isOpen={pendingDeleteId != null}
            message="Bạn có chắc chắn muốn xóa phiên này không?"
            onCancel={cancelDelete}
            onConfirm={confirmDelete}
          />
        </div>
      </div>
    </MainLayout>
  );
};
