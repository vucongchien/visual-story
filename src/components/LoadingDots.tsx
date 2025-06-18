import React from 'react';
import { HeartIcon } from '@heroicons/react/16/solid';
import clsx from 'clsx';
interface LoadingDotsProps {
  className?: string;
}

export const LoadingDots: React.FC<LoadingDotsProps> = ({ className }) => (
  <div className={clsx("inline-flex items-end justify-center", className)}>
    <HeartIcon className="w-3 h-3 mx-0.5 animate-jump delay-0" />
    <HeartIcon className="w-3 h-3 mx-0.5 animate-jump delay-100" />
    <HeartIcon className="w-3 h-3 mx-0.5 animate-jump delay-200" />
  </div>
);
