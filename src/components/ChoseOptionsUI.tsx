import React, { useState } from 'react'
import cltx from 'clsx'
import { Button } from './Button'

interface ChoseOptionsUIProps {
    options: string[]
    onSelect: (index: number) => Promise<void> | void
    className?: string
    
    }

export const ChoseOptionsUI:React.FC<ChoseOptionsUIProps> = ({options,onSelect,className}) => {
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
        "w-full ",
        options.length === 1 ? "flex justify-center" : "",
        options.length === 2 ? "grid grid-cols-1 sm:grid-cols-2 gap-4" : "",
        options.length >= 3 ? "flex flex-col gap-3 max-h-[40vh] overflow-y-auto pr-1" : "",
        className
      )}
    >
      {options.map((option, index) => (
        <Button
          key={index}
          onClick={() => !isSelecting && handleSelect(index)}
          disabled={isSelecting}
          
        >
          {option}
        </Button>
      ))}
    </div></div>
  )
}
