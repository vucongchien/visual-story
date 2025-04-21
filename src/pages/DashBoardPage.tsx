import React from "react";
import { Button, NavigationVertical } from "../components";
import { useNavigate } from "react-router-dom";

export const DashBoardPage = () => {
  const navigate = useNavigate();
  
  const handleContinueClick = () => {
    navigate("/gameplay");
    console.log("Continue clicked");

  };


  const handleNewGameClick = () => {
    navigate("/gameplay");
    console.log("New Game clicked");

  };

  return (
    <div>
      <NavigationVertical className="absolute right-32 top-20" />
      <div className="absolute right-1/4 bottom-1/4 ">



        <div className="flex flex-col items-center justify-center gap-6">
          <Button variant="primary" className="w-full max-w-xs" onClick={handleContinueClick}>
            Continue
          </Button>
          <Button variant="primary" className="w-full max-w-xs" onClick={handleNewGameClick}>
            New Game
          </Button>
        </div>
      </div>



    </div>
  );
};
