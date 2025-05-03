import React from "react";
import cltx from "clsx";
import { LoadingDots } from "./LoadingDots";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof VARIANT_STYLES;
  loading?: boolean;
}

const VARIANT_STYLES = {
  primary:
    " rounded-full bg-[var(--button-bg)] text-[var(--button-text)]  border-2 border-[var(--button-border)] focus:outline-none hover:bg-[var(--button-bg-hover)] hover:text-[var(--button-text-hover)] min-h-[50px]" ,
  secondary: "bg-gray-500 hover:bg-gray-600",
  choosen_answer: "bg-green-500 hover:bg-green-600",
  circle:
    " rounded-full w-12 h-12 p-0 flex items-center justify-center border border-[var(--color3)] bg-[var(--color1)] text-[var(--color4)] hover:bg-[var(--color2)]",
  story_button:"relative p-2 rounded-xl bg-[var(--button-bg)] text-[var(--button-text)] min-h-[50px] focus:outline-none  button-inner-border transform transition-transform duration-300 ease-in-out hover:scale-105 hover:z-30 hover:-translate-y-10 shadow-lg "
} as const;

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className,
  loading = false,
  ...props
}) => {
  const baseStyles =
    "px-4 transition duration-200 cursor-pointer  disabled:cursor-not-allowed disabled:opacity-50";

  const variantStyles = VARIANT_STYLES[variant] || VARIANT_STYLES.primary;
  return (
    <button className={cltx(baseStyles, variantStyles, className)} {...props}>
      {loading ? <LoadingDots /> : children}
    </button>
  );
};
