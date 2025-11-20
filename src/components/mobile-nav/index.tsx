import React from 'react'
import { useTranslation } from 'react-i18next'
import { SearchIcon, ShellIcon, User2Icon } from 'lucide-react'
import useMediaQuery from 'src/hooks/use-media-query'
import { Link, useRouterState } from '@tanstack/react-router'
import Portal from '../portal'

export function MobileNav() {
  const { t } = useTranslation()

  const isDesktop = useMediaQuery('(min-width: 768px)')
  const { location } = useRouterState()
  const onSellPage = location.pathname === '/sell'

  return (
    !isDesktop &&
    !onSellPage && (
      <>
        <div className="h-[60px]" />
        <div className="fixed bottom-0 z-30 w-full border-t bg-background/80 backdrop-blur-md">
          <Portal areaKey="mobile-nav" className="bg-secondary" />
          <div className="mx-auto grid h-full max-w-lg grid-cols-3 font-medium">
            <Link to="/sell" className="flex w-full items-center justify-center">
              <div className="group inline-flex flex-col items-center justify-center px-5 py-2 hover:bg-gray-50 dark:hover:bg-gray-800">
                <ShellIcon
                  fill="black"
                  className="mb-2 h-5 w-5 text-gray-500 group-hover:text-primary dark:text-gray-400 dark:group-hover:text-primary"
                />
                <span className="text-sm text-gray-500 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-500">
                  {t('sell')}
                </span>
              </div>
            </Link>
            <Link to="/home" className="flex w-full items-center justify-center">
              <div className="group inline-flex h-full flex-col items-center justify-center px-5 py-2 hover:bg-gray-50 dark:hover:bg-gray-800">
                <SearchIcon
                  fill="black"
                  className="mb-2 h-9 w-9 text-gray-500 group-hover:text-primary dark:text-gray-400 dark:group-hover:text-primary"
                />
              </div>
            </Link>
            <Link to="/profile" className="flex w-full items-center justify-center">
              <div className="group inline-flex flex-col items-center justify-center px-5 py-2 hover:bg-gray-50 dark:hover:bg-gray-800">
                <User2Icon className="mb-2 h-5 w-5 text-gray-500 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-500" />
                <span className="text-sm text-gray-500 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-500">
                  {t('profile')}
                </span>
              </div>
            </Link>
          </div>
        </div>
      </>
    )
  )
}
