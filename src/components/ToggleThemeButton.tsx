import React, { useEffect, useState } from 'react'
import { SunIcon,MoonIcon } from '@heroicons/react/24/outline'
import { Button } from './Button'
import { useTheme } from '../contexts/ThemeContext'
import { Theme } from '../constants/theme'

export const ToggleThemeButton: React.FC = () => {
  const {theme,toggleTheme}=useTheme()


  return (
    <Button
      variant="circle"
      aria-label={theme===Theme.LIGHT ? 'Chuyển sang light mode' : 'Chuyển sang dark mode'}
      onClick={toggleTheme}
    >
      {theme===Theme.LIGHT ? <SunIcon  /> : <MoonIcon  />}
    </Button>
  )
}
