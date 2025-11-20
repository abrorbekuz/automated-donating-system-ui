import SellProduct from 'src/components/sell'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sell')({
  component: SellProduct,
})
