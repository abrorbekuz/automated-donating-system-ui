import React, { useEffect, useState, useCallback } from 'react'
import { useQuery } from '@apollo/client'
import { GET_PRODUCTS } from 'src/api/queries/productQueries'
import { ProductsResponse } from 'src/types/productType'
import { LoaderIcon } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { Badge } from '../ui/badge'

interface SearchBarResultsProps {
  query: string
  slug: string
  setOpen: (open: boolean) => void
}

const PAGE_SIZE = 16

function SearchBarSkeleton() {
  return (
    <div className="h-auto flex-1 overflow-y-auto px-2">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="mb-2 px-2">
          <div className="flex items-start gap-4">
            <div className="aspect-square h-24 w-24 animate-pulse rounded-sm bg-gray-600" />
            <div className="flex h-24 flex-1 flex-col gap-1">
              <div className="h-6 w-3/4 animate-pulse rounded bg-gray-600" />
              <div className="h-6 w-32 animate-pulse rounded bg-gray-600" />
              <div className="mt-auto h-5 w-40 animate-pulse rounded bg-gray-600" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function SearchBarResults({ query, slug, setOpen }: SearchBarResultsProps) {
  const { data, loading, error, fetchMore } = useQuery<ProductsResponse>(GET_PRODUCTS, {
    variables: { first: PAGE_SIZE, title: query, service: slug, after: null },
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  })

  const [isFetchingMore, setIsFetchingMore] = useState(false)

  const loadMoreProducts = useCallback(async () => {
    if (!data || !data.products.pageInfo.hasNextPage || isFetchingMore) return

    setIsFetchingMore(true)

    try {
      await fetchMore({
        variables: {
          first: PAGE_SIZE,
          title: query,
          service: slug,
          after: data.products.pageInfo.endCursor,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return previousResult

          return {
            products: {
              ...previousResult.products,
              edges: [...previousResult.products.edges, ...fetchMoreResult.products.edges],
              pageInfo: fetchMoreResult.products.pageInfo,
            },
          }
        },
      })
    } finally {
      setIsFetchingMore(false)
    }
  }, [data, fetchMore, isFetchingMore, query, slug])

  const handleScroll = useCallback(() => {
    const scrollPosition = window.innerHeight + document.documentElement.scrollTop
    const threshold = document.documentElement.offsetHeight - 500

    if (scrollPosition >= threshold) {
      loadMoreProducts()
    }
  }, [loadMoreProducts])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  if ((loading && !data) || error) return <SearchBarSkeleton />

  return (
    <div className="h-auto flex-1 overflow-y-auto px-2">
      {data?.products.edges.map(({ node }) => (
        <Link onClick={() => setOpen(false)} to={`/product/${node.service.slug}`} key={node.title} className="px-2">
          <div className="flex items-start gap-4">
            <img
              src={node.image}
              className="aspect-square h-24 rounded-sm border-2 bg-white/10 object-cover object-center"
              alt={node.title}
            />
            <div className="flex h-24 flex-1 flex-col gap-1">
              <div className="flex items-center gap-4 text-lg font-bold">{node.title}</div>

              <div className="grow-1 flex gap-2">
                <Badge className="whitespace-nowrap font-semibold">
                  {node.price} {node.currency} ~ {node.price / 1000}
                </Badge>
              </div>
              <div className="flex grow items-end text-sm font-semibold">{node.service.title}</div>
            </div>
          </div>
        </Link>
      ))}

      {loading && isFetchingMore && (
        <section className="flex justify-center py-4">
          <LoaderIcon className="animate-spin text-gray-500" />
        </section>
      )}
    </div>
  )
}

export default SearchBarResults
