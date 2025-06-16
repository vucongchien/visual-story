// src/components/DropBox.tsx
import React, { useState } from 'react';
import { StaggeredList } from './StaggeredList'; // Import component đã tạo
import { useClickOutside } from '../hooks/useClickOutside';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';

type Option = {
    id: string;
    name: string;
};

type DropBoxProps = {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
};

export const DropBox: React.FC<DropBoxProps> = ({
    options,
    value,
    onChange,
    placeholder = 'Select an option',
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const dropdownRef = useClickOutside(() => {
        setIsOpen(false);
    });

    const selectedOption = options.find((option) => option.id === value);

    const handleSelect = (optionId: string) => {
        onChange(optionId);
        setIsOpen(false);
    };

    return (
        <div className="relative w-full" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-4 py-2 text-left text-[var(--button-text)]"
            >
                <span className={clsx(!selectedOption && 'text-[var(--button-text)]')}>
                    {selectedOption ? selectedOption.name : placeholder}
                </span>
                <ChevronDownIcon
                    className={clsx('h-5 w-5  transition-transform text-[var(--button-text)]', {
                        'transform rotate-180': isOpen,
                    })}
                />
            </button>

            <StaggeredList
                isOpen={isOpen}
                className={clsx(
                    'absolute z-10 mt-1 w-full p-1  ] ',
                    // Thêm scroll khi danh sách quá dài
                    'max-h-60 overflow-y-auto' 
                )}
                variant='fast'
            >
                {options.map((option) => (
                    <button
                        key={option.id}
                        onClick={() => handleSelect(option.id)}
                        className="w-full text-left px-4 py-2 rounded-md  text-[var(--button-text)] bg-[var(--button-bg)] hover:bg-[var(--button-bg-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--button-bg-hover)] transition-colors border-1 border-[var(--button-border)"
                    >
                        {option.name}
                    </button>
                ))}
            </StaggeredList>
        </div>
    );
};