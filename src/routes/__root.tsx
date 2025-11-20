import { createRootRoute, Outlet, useLocation } from '@tanstack/react-router'
import { ErrorPage } from 'src/components/error-page'
import { Header } from 'src/components/header'
import { MobileNav } from 'src/components/mobile-nav'
import useMediaQuery from 'src/hooks/use-media-query'

const RootComponent = () => {
  const location = useLocation()
  const isDesktop = useMediaQuery('(min-width: 768px)')
  if (location.pathname === '/') {
    return <Outlet />
  }

  if (!isDesktop) {
    return (
      <>
        <Outlet />
        <MobileNav />
      </>
    )
  }

  return (
    <>
      <Header />
      <Outlet />
      <MobileNav />
    </>
  )
}

export const Route = createRootRoute({
  component: () => <RootComponent />,
  errorComponent: ErrorPage,
})
