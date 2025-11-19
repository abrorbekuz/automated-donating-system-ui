import { useQuery } from '@apollo/client'
import { GET_SERVICE, GET_SERVICES } from 'src/api/queries/serviceQueries'
import { ServiceType, ServicesResponse } from 'src/types/serviceKindType'

export const useService = (slug: string, cc: string) => {
  const { loading, error, data } = useQuery<{ service: ServiceType }>(GET_SERVICE, {
    variables: { slug, cc }, // Pass the slug variable dynamically
  })

  return { loading, error, service: data?.service }
}

export const useServices = (first?: number, cursor?: string) => {
  const { loading, error, data } = useQuery<{ services: ServicesResponse }>(GET_SERVICES, {
    variables: { first, cursor }, // Pass the optional variables dynamically
    fetchPolicy: 'cache-and-network', // Fetch data from cache first, then from the server if not available in cache
    notifyOnNetworkStatusChange: true, // notify on connection
  })

  return { loading, error, service: data?.services }
}
