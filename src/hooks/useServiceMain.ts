import { useQuery } from '@apollo/client'
import { GET_SERVICE_MAIN } from 'src/api/queries/serviceMainQueries'
import { ServiceMainType } from 'src/types/serviceKindType'

export const useServiceMain = (slug: string) => {
  const { loading, error, data } = useQuery<{ serviceType: ServiceMainType }>(GET_SERVICE_MAIN, {
    variables: { slug }, // Pass the slug variable dynamically
  })

  return { loading, error, service: data?.serviceType }
}
