import React from "react";
import { Button } from "./Button";
import {Cog6ToothIcon,UserIcon,ArrowLeftEndOnRectangleIcon,BellIcon,CreditCardIcon,} from "@heroicons/react/24/outline";
import clsx from "clsx";

// Mảng định nghĩa các mục điều hướng
const navItems = [
  { key: "user", icon: <UserIcon /> },
  { key: "settings", icon: <Cog6ToothIcon /> },
  { key: "notifications", icon: <BellIcon /> },
  { key: "transactions", icon: <CreditCardIcon /> },
  { key: "logout", icon: <ArrowLeftEndOnRectangleIcon /> },
];

interface NavigationVerticalProps {
    className?: string;
  }
  
  export const NavigationVertical: React.FC<NavigationVerticalProps> = ({ className }) => {
    const handleNavItemClick = (itemKey: string) => {
    console.log(`${itemKey} clicked`);
}
    return (
      <nav className={clsx("flex flex-col items-center gap-4", className)}>
        {navItems.map(({ key, icon }) => (
          <Button key={key} variant="circle" aria-label={key} onClick={() => handleNavItemClick(key)}>
            {icon}
          </Button>
        ))}
      </nav>
    );
  };
  