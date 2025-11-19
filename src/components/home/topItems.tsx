import React, { useEffect, useState, useCallback } from 'react'
import { useQuery } from '@apollo/client'
import { ServicesResponse } from 'src/types/serviceKindType'
import { GET_SERVICES } from 'src/api/queries/serviceQueries'
import { Link } from 'react-router-dom'
import { Badge } from '../ui/badge'

const PAGE_SIZE = 16

const TopItems: React.FC = () => {
  const { data, loading, error, fetchMore } = useQuery<ServicesResponse>(GET_SERVICES, {
    variables: { first: PAGE_SIZE, after: null },
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
  }, [data, fetchMore, isFetchingMore])

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
      <section>
        <h2 className="my-6 text-2xl font-semibold">💯 Popular Nowadays</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data?.services.edges.map(({ node }) => (
            <div key={node.id} className="flex flex-col gap-2">
              <Link to={`/${node.serviceType.category}/${node.serviceType.slug}`} className="flex gap-2">
                <img
                  src={node.serviceType.icon}
                  className="aspect-square h-12 rounded-sm border-2 object-cover lg:h-10"
                />
                <div className="flex flex-col justify-between">
                  <div className="text-lg font-semibold md:text-sm">{node.serviceType.title}</div>
                  <div className="text-sm capitalize">{node.tag}</div>
                </div>
              </Link>
              <Link to={`/product/${node.slug}`} className="mb-2 flex h-full flex-col justify-between">
                <div className="group relative mb-2">
                  <img src={node.images[0]} className="aspect-video h-full w-full rounded-lg border-2 object-cover" />
                </div>
                <div className="text-xl font-bold text-red-500">
                  {node.priceTag?.price} {node.priceTag?.currency}
                </div>
                <h2 className="overflow-hidden whitespace-nowrap text-lg font-normal md:whitespace-normal">
                  {node.title}
                </h2>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {loading && isFetchingMore && (
        <section className="flex justify-center">
          <Badge className="px-5 py-4 text-lg" variant="outline">
            Load More
          </Badge>
        </section>
      )}
    </>
  )
}

export { TopItems }
