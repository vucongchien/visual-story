import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({className,placeholder, label,...props }) => {
  const [isFocused,setIsFocused]= React.useState(false);

  return (
    <div className="w-full text-lg">
      {label && <label className=" mb-1">{label}</label>}
      <input
        className={
          `"w-full px-4 py-3 rounded-lg text-[var(--color1)] placeholder-[var(--color1)]
          border-2 border-[var(--color1)] bg-white focus:outline-none
          transition-all duration-200

          ${isFocused ? " shadow-md" : ""}
          ${className?? ""}`
        }
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
    </div>
  );
}; 