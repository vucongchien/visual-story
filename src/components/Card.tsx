import React from 'react';
import clsx from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={clsx('flex justify-center shadow-2xl shadow-[#af58f3]',
        'rounded-lg ','bg-[var(--color2)] border-[var(--color3)]' ,' p-6 transition border',
        className
      )}
    >
      {children}
    </div>
  );
};
