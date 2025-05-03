import React from 'react';
import clsx from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={clsx('flex justify-center',
        'rounded-lg ',
        className
      )}
    >
      {children}
    </div>
  );
};
