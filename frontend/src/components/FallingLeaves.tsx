import React, { useEffect } from "react";

export const FallingLeaves = () => {
  useEffect(() => {
    const leavesContainer = document.querySelector(".leaves-container");

    const createLeaf = () => {
      const leaf = document.createElement("div");
      leaf.className = "absolute w-16 h-16 ";
      leaf.style.left = `${Math.random() * 100}vw`;
      const leafIndex = Math.floor(Math.random() * 3) + 1;
      console.log(leafIndex)
      leaf.style.backgroundImage = `url(/leaf${leafIndex}.png)`;
      leaf.style.backgroundSize = "contain";
      leaf.style.backgroundRepeat = "no-repeat";
      leaf.style.animation = "fall 30s linear";
      leaf.style.animationDelay = `${Math.random() * 5}s`;
      if (leavesContainer) {
        leavesContainer.appendChild(leaf);
      }
      leaf.addEventListener("animationend", () => leaf.remove());
    };

    const interval = setInterval(createLeaf, 10000);  

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="leaves-container fixed inset-0 -top-10 pointer-events-none z-10 overflow-hidden"></div>
  );
};
