// src/components/ToggleSettingButton.tsx

import React, { useState } from 'react';
import { Button } from './Button';
import { ToggleSoundButton } from './ToggleSoundButton';
import { ToggleThemeButton } from './ToggleThemeButton';
import { Cog6ToothIcon,XMarkIcon } from '@heroicons/react/24/outline';
import { StaggeredList } from './StaggeredList';
import { ToggleProfileButton } from './ToggleProfileButton';

export const ToggleSettingButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='relative'>
            <Button
                variant='circle'
                onClick={toggleOpen}
                aria-label={isOpen ? 'Đóng cài đặt' : 'Mở cài đặt'}
            >
                {isOpen?<XMarkIcon className="h-6 w-6" />:<Cog6ToothIcon className="h-6 w-6" />}
            </Button>

            <StaggeredList
                isOpen={isOpen}
                className="absolute right-0 top-full mt-2 flex flex-col gap-2 p-2"
            >
                <ToggleSoundButton key="sound" />
                <ToggleThemeButton key="theme" />
                <ToggleProfileButton key="profile"/>
                
            </StaggeredList>
        </div>
    );
};