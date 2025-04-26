import React, { useState } from 'react'
import { Button } from './Button';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface DropBoxProps {
  options: { id: string; name: string }[]
  value: string
  placeholder?: string
  onChange: (value: string) => void
}

export const DropBox: React.FC<DropBoxProps> = ({ options, value, placeholder = 'Chọn...', onChange }) => {
  const [isOpen, setIsOpen] = useState(false)

  const selected = options.find(opt => opt.id === value)

  const toggleDropdown = () => setIsOpen(prev => !prev)
  const handleSelect = (id: string) => {
    onChange(id)
    setIsOpen(false)
  }

  return (
    <div className="relative w-full">
      <Button
      className="w-full flex justify-between items-center"
        onClick={toggleDropdown}
      >
        {selected?.name || placeholder}
        <ChevronDownIcon className="w-4 h-4" />

      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border rounded shadow-md z-10 max-h-60 overflow-y-auto mt-1">
          {options.map((opt) => (
            <div
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${
                opt.id === value ? 'bg-blue-50 font-medium' : ''
              }`}
            >
              {opt.name}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
