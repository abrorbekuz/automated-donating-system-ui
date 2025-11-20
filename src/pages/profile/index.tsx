import { useState } from 'react'
import { Link } from '@tanstack/react-router'

import { ChevronRightIcon, CopyIcon, HelpCircleIcon, MenuIcon, SettingsIcon, UserIcon, XIcon } from 'lucide-react'

import { ChipsContent, ChipsGroup, ChipsList, ChipsTrigger } from 'src/components/ChipContent'
import UserAvatar from 'src/components/header/UserAvatar'
import { Button } from 'src/components/ui/button'
import { Card } from 'src/components/ui/card'
import { useMeContext } from 'src/hooks/MeContext'
import useMediaQuery from 'src/hooks/use-media-query'
import Products from './components/products'
import Transactions from './components/transactions'

export default function Profile() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [isNavOpen, setIsNavOpen] = useState(false)

  const { me } = useMeContext(true)

  const navItems = [
    { icon: UserIcon, label: 'Profile', link: '/profile' },
    { icon: SettingsIcon, label: 'Settings', link: '/profile/settings' },
    { icon: HelpCircleIcon, label: 'Help', link: '/profile/help' },
  ]

  const NavContent = () => (
    <>
      {navItems.map((item, index) => (
        <Link key={index} to={item.link}>
          <Button
            variant="ghost"
            className={`w-full justify-start px-4 py-6 text-lg hover:bg-secondary ${
              item.link === window.location.pathname && 'border bg-secondary'
            }`}
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.label}
          </Button>
        </Link>
      ))}
    </>
  )

  // Skeleton Components
  const ProfileSkeleton = () => (
    <div className="flex flex-col gap-4 p-4">
      {/* Wallet Card Skeleton */}
      <Card className="flex items-center justify-between p-3">
        <div className="flex items-center gap-4">
          <div className="aspect-square h-8 w-8 animate-pulse rounded-full bg-gray-600/40" />
          <div className="h-6 w-20 animate-pulse rounded bg-gray-600/40"></div>
        </div>
        <div className="h-4 w-4 animate-pulse rounded bg-gray-600/40" />
      </Card>

      {/* User Info Skeleton */}
      <div className="flex gap-6 py-4">
        <div className="h-16 w-16 animate-pulse rounded-full bg-gray-600/40" />
        <div className="flex flex-col justify-between gap-2">
          <div className="h-6 w-32 animate-pulse rounded bg-gray-600/40"></div>
          <div className="h-4 w-20 animate-pulse rounded bg-gray-600/40"></div>
        </div>
      </div>

      {/* Chips Skeleton */}
      <div className="flex gap-2">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="h-10 w-24 animate-pulse rounded-full bg-gray-600/40" />
        ))}
      </div>

      {/* Content Skeleton */}
      <div className="space-y-3">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex gap-3">
            <div className="aspect-square h-16 w-16 animate-pulse rounded-lg bg-gray-600/40" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 animate-pulse rounded bg-gray-600/40"></div>
              <div className="h-4 w-1/2 animate-pulse rounded bg-gray-600/40"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const DesktopProfileSkeleton = () => (
    <div className="container relative flex justify-center">
      <nav className="absolute left-0 hidden w-56 justify-between xl:block xl:w-64">
        <div className="max-w-none space-y-16 xl:max-w-[200px] 2xl:max-w-none">
          <div className="flex flex-col gap-2">
            {navItems.map((_, index) => (
              <div key={index} className="h-12 w-full animate-pulse rounded bg-gray-600/40" />
            ))}
          </div>
          <Card className="flex items-center justify-between p-3">
            <div className="flex items-center gap-4">
              <div className="aspect-square h-8 w-8 animate-pulse rounded-full bg-gray-600/40" />
              <div className="h-6 w-20 animate-pulse rounded bg-gray-600/40"></div>
            </div>
            <div className="h-4 w-4 animate-pulse rounded bg-gray-600/40" />
          </Card>
        </div>
      </nav>
      <main className="w-full max-w-3xl flex-1 items-center justify-center space-y-4">
        {/* Profile Card Skeleton */}
        <Card className="flex flex-col items-center gap-6 py-9">
          <div className="h-20 w-20 animate-pulse rounded-full bg-gray-600/40" />
          <div className="flex gap-4">
            <div className="h-7 w-32 animate-pulse rounded bg-gray-600/40"></div>
            <div className="h-6 w-6 animate-pulse rounded bg-gray-600/40"></div>
          </div>
          <div className="h-4 w-16 animate-pulse rounded bg-gray-600/40"></div>
        </Card>

        {/* Chips Skeleton */}
        <div className="flex gap-2">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="h-10 w-24 animate-pulse rounded-full bg-gray-600/40" />
          ))}
        </div>

        {/* Content Skeleton */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="space-y-3">
              <div className="aspect-square w-full animate-pulse rounded-lg bg-gray-600/40" />
              <div className="h-4 w-3/4 animate-pulse rounded bg-gray-600/40"></div>
              <div className="h-4 w-1/2 animate-pulse rounded bg-gray-600/40"></div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )

  if (!me) {
    return isMobile ? <ProfileSkeleton /> : <DesktopProfileSkeleton />
  }

  return isMobile ? (
    <div>
      <nav className="flex items-center justify-between bg-background p-4">
        <Button variant="ghost" size="icon" onClick={() => setIsNavOpen(!isNavOpen)}>
          {isNavOpen ? <XIcon /> : <MenuIcon />}
        </Button>
        <CopyIcon />
      </nav>
      {isNavOpen && (
        <div className="bg-background p-4">
          <NavContent />
        </div>
      )}
      <main className="flex flex-col gap-4 p-4">
        <Card className="flex items-center justify-between p-3">
          <div className="flex items-center gap-4">
            <img src="https://playerok.com/images/Icons/Wallet.png" className="aspect-square h-8 w-8 object-cover" />
            <div className="text-lg font-semibold">0 SO&apos;M</div>
          </div>
          <ChevronRightIcon />
        </Card>
        <div className="flex gap-6 py-4">
          <UserAvatar className="h-16 w-16" />
          <div className="flex flex-col justify-between">
            <div className="text-xl font-medium">
              {me?.user.firstName || 'Anonymous'} #{me?.user.lastName}
            </div>
            <div className="text-md">since 2024</div>
          </div>
        </div>
        <ChipsGroup defaultValue="products">
          <ChipsList>
            <ChipsTrigger value="products">My Products</ChipsTrigger>
            <ChipsTrigger value="transactions">Transactions</ChipsTrigger>
            <ChipsTrigger value="sell">Profit</ChipsTrigger>
          </ChipsList>
          <ChipsContent value="products">
            <Products />
          </ChipsContent>
          <ChipsContent value="transactions">
            <Transactions />
          </ChipsContent>
          <ChipsContent value="sell">This field is only for verified merchants</ChipsContent>
        </ChipsGroup>
      </main>
    </div>
  ) : (
    <div className="container relative flex justify-center">
      <nav className="absolute left-0 hidden w-56 justify-between xl:block xl:w-64">
        <div className="max-w-none space-y-16 xl:max-w-[200px] 2xl:max-w-none">
          <div className="flex flex-col gap-2">
            <NavContent />
          </div>
          <Card className="flex items-center justify-between p-3">
            <div className="flex items-center gap-4">
              <img src="https://playerok.com/images/Icons/Wallet.png" className="aspect-square h-8 w-8 object-cover" />
              <div className="text-lg font-semibold">0 SO&apos;M</div>
            </div>
            <ChevronRightIcon />
          </Card>
        </div>
      </nav>
      <main className="w-full max-w-3xl flex-1 items-center justify-center space-y-4">
        <Card className="flex flex-col items-center gap-6 py-9">
          <UserAvatar className="h-20 w-20" />
          <div className="flex gap-4  text-2xl font-bold">
            {me?.user.firstName || 'Anonymous'} #{me?.user.lastName} <CopyIcon className="cursor-pointer" />
          </div>
          <div className="text-md">since 2024</div>
        </Card>

        <ChipsGroup defaultValue="products">
          <ChipsList>
            <ChipsTrigger value="products">My Products</ChipsTrigger>
            <ChipsTrigger value="transactions">Transactions</ChipsTrigger>
            <ChipsTrigger value="sell">Profit</ChipsTrigger>
          </ChipsList>
          <ChipsContent value="products">
            <Products />
          </ChipsContent>
          <ChipsContent value="transactions">
            <Transactions />
          </ChipsContent>
          <ChipsContent value="sell">This field is only for verified merchants</ChipsContent>
        </ChipsGroup>
      </main>
    </div>
  )
}
