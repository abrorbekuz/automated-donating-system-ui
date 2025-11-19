import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Star, ShoppingBag } from 'lucide-react'
import { Button } from 'src/components/ui/button'
import { useTheme } from 'src/components/themeprovider'
import { Link, NavLink } from 'react-router-dom'
import { SearchBar } from '../searchbar'
import { ThemeSwitch } from '../themeswitch'
import { LanguageSelector } from '../language-selector'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
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

            <NavLink to={'/sell'} className="text">
              <Button variant="outline">
                <ShoppingBag className="mr-2 h-5 w-5" />
                {t('sell')}
              </Button>
            </NavLink>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <UserAvatar usernameOnly />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">satnaing</p>
                    <p className="text-xs leading-none text-muted-foreground">satnaingdev@gmail.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    Profile
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Transactions
                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Settings
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <LanguageSelector />
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  Log out
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="flex-1 md:hidden">
          <SearchBar />
        </div>
      </div>
    </header>
  )
}
