import { ServiceMainType } from './serviceKindType'

interface Category {
  title: string
  icon: string
  slug: string
  availableTags: string[]
}

interface CategoryWithServiceKind {
  title: string
  icon: string
  slug: string
  availableTags: string[]
  services?: ServiceMainType[]
}

interface Categories {
  categories: Category[]
}

interface CategoriesWithServiceKind {
  categories: CategoryWithServiceKind[]
}

export { Category, Categories, CategoryWithServiceKind, CategoriesWithServiceKind }
