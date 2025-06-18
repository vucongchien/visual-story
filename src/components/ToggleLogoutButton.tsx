import React from 'react';
import { Button } from './Button';
import { useAuth } from '../contexts/AuthContext'; // Sử dụng AuthContext
import { ArrowLeftEndOnRectangleIcon } from '@heroicons/react/16/solid';

export const ToggleLogoutButton: React.FC = () => {
  // Lấy hàm logout từ AuthContext
  const { logout } = useAuth();

  return (
    <Button
      variant="circle"
      onClick={logout} 
      aria-label="Đăng xuất"
    >
      <ArrowLeftEndOnRectangleIcon className="h-6 w-6" />
    </Button>
  );
};