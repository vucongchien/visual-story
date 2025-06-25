import React, { useState } from "react";
import { Button } from "./Button";
import { Cog6ToothIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { StaggeredList } from "./StaggeredList";
import { ToggleSoundButton } from "./ToggleSoundButton";
import { ToggleThemeButton } from "./ToggleThemeButton";
import { useAuth } from "../contexts/AuthContext";
import { UsersIcon } from "@heroicons/react/24/outline";
import { ToggleLogoutButton } from "./ToggleLogoutButton";

export const ToggleProfileButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="relative">
      <Button
        variant="circle"
        onClick={toggleOpen}
        loading={isLoading}
        aria-label={isOpen ? "đóng trang cá nhân " : "mở trang cá nhân"}
      >
        {isOpen ? (
          <XMarkIcon className="h-6 w-6" />
        ) : (
          <UsersIcon className="h-6 w-6" />
        )}
      </Button>
      {isAuthenticated && user ? (
        <StaggeredList
          isOpen={isOpen}
          className="absolute right-0 top-full mt-2 flex flex-col gap-2 p-2"
        >
          <ToggleLogoutButton key="logout"/> 
          {/* <ToggleThemeButton key="theme" /> */}
        </StaggeredList>
      ) : null}
    </div>
  );
};
