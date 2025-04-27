import React from 'react';
import cltx from 'clsx'
import { LoadingDots } from './LoadingDots';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof VARIANT_STYLES;
  loading?:boolean
}

const VARIANT_STYLES={
  primary: ' rounded-lg bg-[var(--color1)] text-[var(--color4)]  border-1 border-[var(--color2)] focus:outline-none hover:bg-[var(--color2)] ',
  secondary: 'bg-gray-500 hover:bg-gray-600',
  choosen_answer: 'bg-green-500 hover:bg-green-600',
  circle: ' rounded-full w-12 h-12 p-0 flex items-center justify-center border border-[var(--color3)] bg-[var(--color1)] text-[var(--color4)] hover:bg-[var(--color2)]',


} as const;

export const Button: React.FC<ButtonProps> = ({ 
  children,
  variant = 'primary',
  className,
  loading=false,
  ...props
}) => {
  const baseStyles = 'px-4 py-2 font-semibold transition duration-200 cursor-pointer  disabled:cursor-not-allowed disabled:opacity-50';
  const variantStyles = VARIANT_STYLES[variant] || VARIANT_STYLES.primary;
  return <button
  className={cltx(baseStyles,variantStyles,className)}
   {...props}>
     {loading ? <LoadingDots /> : children}
    </button>;
}; 