import React from 'react';
import { LoadingDots } from '../components/LoadingDots';
import logo from '../assets/logo.png';

export const LoadingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-[var(--color2)]">
      <LoadingDots />
      <p className="mt-4 text-lg font-semibold">Đang tải thông tin...</p>
    </div>
  );
};