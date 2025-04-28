import React, { useEffect, useState } from 'react'
import { SunIcon,MoonIcon } from '@heroicons/react/24/outline'
import { Button } from './Button'

/**
 * Component nút chuyển theme (sáng / tối) sử dụng style của Button với variant "circle"
 */
export const ToggleThemeButton: React.FC = () => {
  // State lưu trạng thái dark mode
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Khi mount, kiểm tra localStorage hoặc class trên <html> để set ban đầu
  useEffect(() => {
    const stored = localStorage.getItem('theme')
    if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
      setIsDarkMode(true)
    } else {
      document.documentElement.classList.remove('dark')
      setIsDarkMode(false)
    }
  }, [])

  // Hàm toggle
  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
      setIsDarkMode(false)
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
      setIsDarkMode(true)
    }
  }

  return (
    <Button
      variant="circle"
      aria-label={isDarkMode ? 'Chuyển sang light mode' : 'Chuyển sang dark mode'}
      onClick={toggleTheme}
    >
      {isDarkMode ? <SunIcon  /> : <MoonIcon  />}
    </Button>
  )
}
