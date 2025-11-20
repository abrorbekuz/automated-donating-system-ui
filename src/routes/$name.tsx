import { createFileRoute } from '@tanstack/react-router'
import Product from 'src/pages/product'

export const Route = createFileRoute('/$name')({
  component: Product,
})
