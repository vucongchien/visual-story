import React from 'react';
import clsx from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={clsx('flex justify-center shadow-2xl shadow-[#ff6fe9]',
        'rounded-lg ',' border-[var(--color2)]' ,' p-6 transition border',
        className
      )}
    >
      {children}
    </div>
  );
};
