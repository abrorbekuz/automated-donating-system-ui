import { useQuery } from '@apollo/client'
import { GET_CATEGORIES } from 'src/api/queries/categoryQueries'
import { CategoryWithServiceKind } from 'src/types/categoryTypes'

export const useCategory = () => {
  const { loading, error, data } = useQuery<{ categories: CategoryWithServiceKind[] }>(GET_CATEGORIES, {
    fetchPolicy: 'cache-first', // Tries to load from cache first
  })
  return { loading, error, categories: data?.categories }
}
