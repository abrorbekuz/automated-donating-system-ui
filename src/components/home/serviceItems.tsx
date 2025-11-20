import React, { useEffect, useState, useCallback } from 'react'
import { useQuery } from '@apollo/client'
import { ServicesResponse } from 'src/types/serviceKindType'
import { GET_SERVICES } from 'src/api/queries/serviceQueries'
import { Link } from '@tanstack/react-router'
import { Badge } from '../ui/badge'

const PAGE_SIZE = 16

const ServiceItems: React.FC<{ service?: string; tag?: string }> = ({ service, tag }) => {
  const { data, loading, error, fetchMore } = useQuery<ServicesResponse>(GET_SERVICES, {
    variables: { first: PAGE_SIZE, service, tag, after: null },
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  })

  const [isFetchingMore, setIsFetchingMore] = useState(false)

  const loadMoreServices = useCallback(async () => {
    if (!data || !data.services.pageInfo.hasNextPage || isFetchingMore) return

    setIsFetchingMore(true)

    try {
      await fetchMore({
        variables: {
          first: PAGE_SIZE,
          service,
          tag,
          after: data.services.pageInfo.endCursor,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return previousResult
          return {
            services: {
              ...fetchMoreResult.services,
              edges: [...previousResult.services.edges, ...fetchMoreResult.services.edges],
            },
          }
        },
      })
    } finally {
      setIsFetchingMore(false)
    }
  }, [data, fetchMore, isFetchingMore, service, tag])

  const handleScroll = useCallback(() => {
    const scrollPosition = window.innerHeight + document.documentElement.scrollTop
    const threshold = document.documentElement.offsetHeight - 500

    if (scrollPosition >= threshold) {
      loadMoreServices()
    }
  }, [loadMoreServices])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  if (loading && !data) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <>
      <section className="relative px-4 lg:px-0">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data?.services.edges.map(({ node }) => (
            <div key={node.id} className="flex w-full flex-col gap-3">
              <Link to={`/product/${node.slug}`} className="z-0 mb-2 flex h-full flex-col justify-between ">
                <div className="group relative mb-2">
                  <img
                    src={node.images?.[0] || '/fallback-image.jpg'}
                    className="aspect-video h-full w-full rounded-lg border-2 object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <div className="text-xl font-bold text-red-500">
                    {node.priceTag?.price} {node.priceTag?.currency}
                  </div>
                  <h2 className="overflow-hidden whitespace-nowrap text-lg font-normal md:whitespace-normal">
                    {node.title}
                  </h2>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="flex justify-center">
        <Badge className="text-md px-5 py-3" variant="outline">
          {isFetchingMore ? 'Loading more...' : 'All caught up'}
        </Badge>
      </section>
    </>
  )
}

export { ServiceItems }
