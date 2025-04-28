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
  const [popupClass, setPopupClass] = useState("animated-slide-scale");

  // Refs cho các phần tử cần kết nối
  const newGameButtonRef = useRef(null);
  const genreDropboxRef = useRef(null);
  const settingDropboxRef = useRef(null);

  // Quản lý animation khi showPopup thay đổi
  useEffect(() => {
    if (showPopup) {
      // Hiển thị popup
      setDisplayPopup(true);
      requestAnimationFrame(() => {
        // setIsVisible(true); // Kích hoạt animation hiển thị
        setPopupClass("animated-slide-scale animate-slide-scale-show");
      });
    } else if(displayPopup) {
       // start hide animation
       setPopupClass("animated-slide-scale animate-slide-scale-hide");
    }
  }, [showPopup]);

  const togglePopup = () => setShowPopup((prev) => !prev);



  return (
    <MainLayout>
      {/* <NavigationVertical className="absolute right-32 top-20" /> */}

      <SessionList></SessionList>
      <div className="absolute right-1/4 bottom-1/4 ">
        <div className="flex flex-col items-center justify-center gap-6">
          <div ref={newGameButtonRef}>
            <Button
              variant="primary"
              className="w-full max-w-xs"
              onClick={togglePopup}
            >
              New Game
            </Button>
          </div>
        </div>

        
      </div>
      <div>
        
      </div>
      {
          displayPopup&&(
            <div
            className={clsx(
              "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"," animated-slide-scale",
              popupClass,''
            )}
          >
            <NewGamePopup
              genreRef={genreDropboxRef}
              settingRef={settingDropboxRef}
            />
          </div>
          )
        }
    </MainLayout>
  );
};
