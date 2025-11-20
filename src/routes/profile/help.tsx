import { createFileRoute } from '@tanstack/react-router'
import Profile from 'src/pages/profile'

export const Route = createFileRoute('/profile/help')({
  component: Profile,
})
