import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import clsx from "clsx";

interface SessionItemProps {
  id: string;
  title: string;
  imageSrc: string;
  position: { top: string; left: string };
}

export const SessionItem: React.FC<SessionItemProps> = ({
  id,
  title,
  imageSrc,
  position,
}) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/gameplay/${id}`);
  };

  return (
<div
      id={id}
      className={clsx(
        'absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300',
      )}
      style={{ top: position.top, left: position.left }}
    >
      <Button
        type="button"
        variant="story_button"
        className="w-40"
        onClick={handleNavigate}
      >
        <img src={imageSrc} alt={`Image for ${title}`} />
        <div className="mb-2">{title}</div>
      </Button>
    </div>
  );
};
