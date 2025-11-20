import { createFileRoute } from '@tanstack/react-router'
import Settings from 'src/pages/profile/settings'

export const Route = createFileRoute('/profile/settings')({
  component: Settings,
})
