import React from 'react';
import clsx from 'clsx';
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({className,placeholder, label,...props }) => {
  const [isFocused,setIsFocused]= React.useState(false);

  return (
    <div className="w-full text-lg flex items-center justify-center">
      {label && <label className=" mb-1">{label}</label>}
      <input
        className={clsx(
          " px-4 py-3 rounded-2xl text-[var(--input-text)] text-center placeholder-[var(--input-text)]" ,
          
          "border-2 border-[var(--input-border)] bg-[var(--input-bg)] ",

          "focus:outline-none transition-all duration-200 ",

          "autofill:bg-[var(--input-bg)] autofill:text-[var(--input-text)]",
          "[-webkit-text-fill-color:var(--input-text)]", // Quan trọng: giữ màu chữ
          "[box-shadow:0_0_0px_1000px_var(--input-bg)_inset]", // Đè màu nền
          "[:autofill:box-shadow:0_0_0px_1000px_var(--input-bg)_inset]", // Cho Firefox

          isFocused ? "shadow-md" : "",
          className
        )}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
    </div>
  );
}; 