import { useRef, useState, useEffect } from "react";
import { Button, NavigationVertical } from "../components";
import { SessionList } from "../components/SessionList";
import { NewGamePopup } from "../components/NewGamePopup";
import { CssLineConnector } from "../components/CssLineConnector";
import clsx from "clsx";
import MainLayout from "../layouts/MainLayout";

export const DashBoardPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [displayPopup, setDisplayPopup] = useState(false);
  const [popupClass, setPopupClass] = useState("popup-initial");
  const [sessionListClass, setSessionListClass] = useState("session-initial");


  // Quản lý animation khi showPopup thay đổi
  useEffect(() => {
    if (showPopup) {
      // Hiển thị popup
      setDisplayPopup(true);
      setPopupClass("popup-slide-in");
      setSessionListClass("session-slide-left");
    } else if (displayPopup) {
      // start hide animation
      setPopupClass("popup-slide-out");
      setSessionListClass("session-slide-right");
    }
  }, [showPopup]);

  const togglePopup = () => setShowPopup((prev) => !prev);

  return (
    <MainLayout>
      <div className="relative min-h-screen w-full overflow-hidden">
        <div className="fixed inset-0 z-20 flex flex-col items-center pt-20 pointer-events-none">
          <p className="text-6xl text-[var(--text-color-story-garden)]">
            Khu Vườn Truyện
          </p>
        </div>
        <img
          src="/bg-story-garden-2.png"
          alt="Background"
          className="absolute inset-0 h-full w-full object-cover pointer-events-none"
        />
        <div className="absolute inset-0 z-10">
          <div className={clsx("transition-transform absolute inset-0 z-10", sessionListClass)}>
            <SessionList />
          </div>

          <div className="absolute right-1/4 bottom-1/4 z-10">
            <div className="flex flex-col items-center justify-center gap-6">

                <Button
                  variant="story_button"
                  className="w-full max-w-xs"
                  onClick={togglePopup}
                >
                  <div className="p-2">
                    <p>Trồng </p>
                    <p>truyện mới</p>
                  </div>
                </Button>

            </div>
          </div>

          {displayPopup && (
            <div
              className={clsx(
              "flex items-center justify-center fixed inset-0 transition-transform",
              popupClass
              )}
            >
              <NewGamePopup />
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};
