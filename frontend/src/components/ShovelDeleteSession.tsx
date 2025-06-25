import React, { useEffect } from "react";
import  useDraggable  from "../hooks/useDraggable";
import clsx from "clsx";



interface ShovelDeleteSessionProps {
  onDrop?:()=>void
}

export const ShovelDeleteSession: React.FC<ShovelDeleteSessionProps> = ({ onDrop }) => {

  useDraggable("shovel",{
    onDragEnd: onDrop
    
  })

  return (
    <div
    id="shovel"
      className={clsx("absolute flex flex-col items-center justify-center w-32 h-32 rounded-full  z-50 transition duration-200  select-none touch-none ")}
    >
        <img src="/shovel.png" alt="xẻng" className="h-32 select-none pointer-events-none" />
    </div>
  );
};
