import React from 'react'
import { Header } from '../header'
import { MobileNav } from '../mobile-nav'

export const getNoneLayout = (page: React.ReactElement) => page

export const getDefaultLayout = (page: React.ReactElement) => {
  return (
    <>
      <Header />
      {page}
      <MobileNav />
    </>
  )
}
