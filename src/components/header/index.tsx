import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from '@tanstack/react-router'

import { Star, ShoppingBag } from 'lucide-react'
import { Button } from 'src/components/ui/button'
import { useTheme } from 'src/components/themeprovider'
import { SearchBar } from '../searchbar'
import { ThemeSwitch } from '../themeswitch'

import UserAvatar from './UserAvatar'

export function Header() {
  const { t } = useTranslation()
  const { theme, setTheme } = useTheme()

  const isDarkMode = theme === 'dark'
  const isNotHome = window.location.pathname !== '/home'

  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header
      className={`top-0 z-50 ${isNotHome && 'hidden'} bg-background py-2 md:sticky md:block ${
        isScrolled ? 'border-b border-primary' : 'border-none'
      }`}
    >
      <div className="container mx-auto flex flex-col gap-4 px-4 py-2">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <Link to="/home" className="flex gap-4 text-2xl font-bold">
              UP
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-400" />
                <span className="text text-sm font-medium">4.8 (23 reviews)</span>
              </div>
            </Link>
          </div>
          <div className="flex">
            <ThemeSwitch
              checked={isDarkMode}
              onCheckedChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="mr-2"
            />
          </div>

          <div className="hidden flex-1 items-center space-x-4 md:flex">
            <SearchBar />

            <Link to={'/sell'} className="text">
              <Button variant="outline">
                <ShoppingBag className="mr-2 h-5 w-5" />
                {t('sell')}
              </Button>
            </Link>

            <UserAvatar usernameOnly />
          </div>
        </div>
        <div className="flex-1 md:hidden">
          <SearchBar />
        </div>
      </div>
    </header>
  )
}
