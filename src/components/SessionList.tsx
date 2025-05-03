import React from "react";
import { useSessions } from "../hooks/useSession";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

export const SessionList = () => {
  const { sessions, sessionsFake } = useSessions();
  const navigate = useNavigate();

  const handleNavigateToSession = (sessionId: string) => {
    navigate(`/gameplay/${sessionId}`);
  };

  const row2=4/5;
  const row1=2/3;

  const positionMap = [
    { top:row1,left:1/5},
    { top:row1,left:2/5},
    { top:row1,left:3/5},
    { top:row2,left:0.31},
    { top:row2,left:0.51},
  ];

  const randomImg=[
    "leaf1.png",
    "leaf2.png",
    "leaf3.png"
  ]

  const getSrc=()=>{
    return randomImg[Math.floor(Math.random()*randomImg.length)]
  }

  return (
    <div className="grid grid-cols-6 grid-rows-2 gap-6 max-w-5xl mx-auto">
      
      {sessionsFake.slice(0, 5).map((session) => (
        <div
          key={session.id}
          className="absolute"
          style={{
            top: `${positionMap[sessionsFake.indexOf(session)]?.top * 100}%`,
            left: `${positionMap[sessionsFake.indexOf(session)]?.left * 100}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <Button
            type="button"
            variant="story_button"
            className="w-40"
            onClick={() => handleNavigateToSession(session.id)}
          >
            <img src={getSrc()} alt="" />
            <div className="mb-2">
            {session.title}
            </div>

          </Button>
        </div>
      ))}
    </div>
  );
};
