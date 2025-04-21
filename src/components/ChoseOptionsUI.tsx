import React, { useState } from 'react'
import cltx from 'clsx'

interface ChoseOptionsUIProps {
    options: string[]
    onSelect: (index: number) => Promise<void> | void
    }

export const ChoseOptionsUI:React.FC<ChoseOptionsUIProps> = ({options,onSelect}) => {
    const [isSelecting, setIsSelecting] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
    const handleSelect = async (index: number) => {
        setIsSelecting(true)
        setSelectedIndex(index)
    
        try {
          await onSelect(index)
        } finally {
          setIsSelecting(false)
          setSelectedIndex(null)
        }
      }
  return (
    <div>{/* Options */}
    <div
      className={cltx(
        "w-full mt-auto",
        options.length === 1 ? "flex justify-center" : "",
        options.length === 2 ? "grid grid-cols-1 sm:grid-cols-2 gap-4" : "",
        options.length >= 3 ? "flex flex-col gap-3 max-h-[40vh] overflow-y-auto pr-1" : "",
      )}
    >
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => !isSelecting && handleSelect(index)}
          disabled={isSelecting}
          className={cltx(
            "px-6 py-4 rounded-lg text-left border transition-all duration-200",
            "hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400",
            "active:scale-[0.98] text-base md:text-lg",
            isSelecting && selectedIndex !== index ? "opacity-50 cursor-not-allowed" : "",
            selectedIndex === index
              ? "bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600"
              : "border-slate-200 dark:border-slate-700",
          )}
        >
          {option}
        </button>
      ))}
    </div></div>
  )
}
