import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { LoaderIcon } from 'lucide-react'
import { GET_SERVICE_MAINS } from 'src/api/queries/serviceMainQueries'
import { ServiceMainsResponse } from 'src/types/serviceKindType'
import { Link } from 'react-router-dom'

interface SellProductProps {
  query: string
  category: string
}

const PAGE_SIZE = 16

const SellResults = ({ query, category }: SellProductProps) => {
  const { data, loading, error, fetchMore } = useQuery<ServiceMainsResponse>(GET_SERVICE_MAINS, {
    variables: { first: PAGE_SIZE, title: query, category: category, after: null },
    fetchPolicy: 'cache-and-network', // Fetch data from cache first, then from the server if not available in cache
    notifyOnNetworkStatusChange: true,
  })

  const [isFetchingMore, setIsFetchingMore] = useState(false)

  // Trigger fetching more when the user scrolls to the bottom
  const handleScroll = () => {
    if (isFetchingMore || !data || !data.serviceTypes.pageInfo.hasNextPage) return

    const scrollPosition = window.innerHeight + document.documentElement.scrollTop
    const threshold = document.documentElement.offsetHeight - 500

    if (scrollPosition >= threshold) {
      setIsFetchingMore(true)
      fetchMore({
        variables: {
          first: PAGE_SIZE,
          after: data.serviceTypes.pageInfo.endCursor,
        },
      }).finally(() => setIsFetchingMore(false))
    }
  }

  // Attach scroll listener on component mount
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll) // Cleanup
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isFetchingMore])

  if (loading && !data) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <>
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-7 lg:grid-cols-9 xl:grid-cols-12">
        {data?.serviceTypes.edges.map(({ node }) => (
          <Link key={node.slug} to={`/${node.slug}/${node.slug}`} className="mb-2 flex flex-col">
            <div className="group relative mb-2">
              <img src={node.icon} className="aspect-square h-full w-full rounded-lg border object-cover" />
            </div>
            <h2 className="overflow-hidden whitespace-nowrap text-xl font-bold md:text-base">{node.title}</h2>
          </Link>
        ))}
      </div>

      {loading && isFetchingMore && (
        <section className="flex justify-center">
          <LoaderIcon />
        </section>
      )}
    </>
  )
}

export default SellResults
