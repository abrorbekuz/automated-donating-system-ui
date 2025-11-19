import { ChevronRightIcon, CopyIcon, HelpCircleIcon, MenuIcon, SettingsIcon, UserIcon, XIcon } from 'lucide-react'
import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from 'src/components/ui/button'
import { Card } from 'src/components/ui/card'

export default function Settings() {
  const [isMobile, setIsMobile] = useState(false)
  const [isNavOpen, setIsNavOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const navItems = [
    { icon: UserIcon, label: 'Profile', link: '/profile' },
    { icon: SettingsIcon, label: 'Settings', link: '/profile/settings' },
    { icon: HelpCircleIcon, label: 'Help', link: '/profile/help' },
  ]

  const NavContent = () => (
    <>
      {navItems.map((item, index) => (
        <NavLink key={index} to={item.link}>
          <Button
            variant="ghost"
            className={`w-full justify-start px-4 py-6 text-lg hover:bg-secondary ${
              item.link === window.location.pathname && 'border bg-secondary'
            }`}
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.label}
          </Button>
        </NavLink>
      ))}
    </>
  )

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
        <h2 className="font-bold">Auth options</h2>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          <Card className="auth-method auth-method--telegram flex h-[100px] flex-col justify-between rounded-lg p-3 outline outline-2 -outline-offset-2 outline-[#FFFFFF19]">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/2048px-Telegram_logo.svg.png"
              className="h-6 w-6"
            />
            <div className="font-medium">Telegram</div>
          </Card>
        </div>
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
        <h2 className="font-bold">Auth options</h2>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          <Card className="auth-method auth-method--telegram flex h-[100px] flex-col justify-between rounded-lg p-3 outline outline-2 -outline-offset-2 outline-[#FFFFFF19]">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/2048px-Telegram_logo.svg.png"
              className="h-6 w-6"
            />
            <div className="font-medium">Telegram</div>
          </Card>
        </div>
      </main>
    </div>
  )
}
