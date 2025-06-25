import React from "react";
import useDraggable from "../hooks/useDraggable";

const Circle: React.FC = () => {
  
  useDraggable("circle");

  return <div id="circle" className="absolute top-0 left-20 bg-amber-900 h-20 w-20 border-2 z-50"></div>
};

export default Circle;