import { createFileRoute } from '@tanstack/react-router'

import Category from 'src/pages/category'

export const Route = createFileRoute('/$category/$name')({
  component: Category,
})
