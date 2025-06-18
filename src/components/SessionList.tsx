import React, { useMemo } from "react";
import { SessionProps } from "../types";
import { SessionItem } from "./SessionItem";

const POSITION_MAP = [
  { top: "66.67%", left: "20%" }, 
  { top: "66.67%", left: "40%" },
  { top: "66.67%", left: "60%" }, 
  { top: "80%", left: "31%" },    
  { top: "80%", left: "51%" },    
  // Thêm các vị trí khác ở đây nếu muốn mở rộng
  { top: "50%", left: "80%" },
];
  const LEAF_IMAGES=[
    "leaf1.png",
    "leaf2.png",
    "leaf3.png"
  ]
const maxItems=5;

type SessionListProps = {
  sessions:SessionProps[]
};

export const SessionList: React.FC<SessionListProps> = ({ sessions }) => {

  const sessionsToDisplay = useMemo(()=>{
    return sessions.slice(0, maxItems).map((session, index) => ({
      ...session,
      imageSrc: LEAF_IMAGES[index % LEAF_IMAGES.length],
      position: POSITION_MAP[index % POSITION_MAP.length],

    }))
  },[sessions, maxItems]);





  return (
    <div className="relative w-full h-full ">
      
       {sessionsToDisplay.map((sessionWithLayout) => (
        <SessionItem
          key={sessionWithLayout.id}
          id={sessionWithLayout.id}
          title={sessionWithLayout.title}
          imageSrc={sessionWithLayout.imageSrc}
          position={sessionWithLayout.position}
          
        />
      ))}
    </div>
  );
};
