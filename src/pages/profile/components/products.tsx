import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { ServicesResponse } from 'src/types/serviceKindType'
import { GET_SERVICES } from 'src/api/queries/serviceQueries'
import { Link, NavLink } from 'react-router-dom'
import { Badge } from 'src/components/ui/badge'
import { Button } from 'src/components/ui/button'
import { Card } from 'src/components/ui/card'
import { Loader2Icon } from 'lucide-react'

const PAGE_SIZE = 16

const EmptyState = () => (
  <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
    <div className="flex flex-col items-center gap-1 py-8 text-center">
      <h3 className="font-bold tracking-tight md:text-2xl">You have no products</h3>
      <p className="text-sm text-muted-foreground">You can start selling as soon as you add a product.</p>
      <NavLink to={'/sell'}>
        <Button className="mt-4">Add Product</Button>
      </NavLink>
    </div>
  </div>
)

function Products() {
  const { data, loading, error, fetchMore } = useQuery<ServicesResponse>(GET_SERVICES, {
    variables: { first: PAGE_SIZE, author: 'me', after: null },
    fetchPolicy: 'cache-and-network', // Fetch data from cache first, then from the server if not available in cache
    notifyOnNetworkStatusChange: true,
  })

  const [isFetchingMore, setIsFetchingMore] = useState(false)

  // Trigger fetching more when the user scrolls to the bottom
  const handleScroll = () => {
    if (isFetchingMore || !data || !data.services.pageInfo.hasNextPage) return

    const scrollPosition = window.innerHeight + document.documentElement.scrollTop
    const threshold = document.documentElement.offsetHeight - 500

    if (scrollPosition >= threshold) {
      setIsFetchingMore(true)
      fetchMore({
        variables: {
          first: PAGE_SIZE,
          after: data.services.pageInfo.endCursor,
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
      <section>
        <div className="flex flex-col gap-4">
          {data &&
            (data?.services.edges.length > 0 ? (
              data?.services.edges.map(({ node }) => (
                <Card key={node.id} className="flex gap-3 p-1 md:p-2">
                  <Link to={`/product/${node.slug}`} className="flex h-full justify-between gap-2">
                    <div className="group relative h-[70px] md:h-[100px]">
                      <img
                        src={node.images[0]}
                        className="aspect-video h-full w-full rounded-lg border-2 object-cover"
                      />
                    </div>
                    <h2 className="overflow-hidden text-lg font-normal md:whitespace-normal">{node.title}</h2>
                  </Link>
                </Card>
              ))
            ) : (
              <EmptyState />
            ))}
        </div>
      </section>
      {(loading || isFetchingMore) && (
        <section className="mt-4 flex justify-center">
          <Badge className="p-1" variant="outline">
            <Loader2Icon className="h-4 w-4" />
          </Badge>
        </section>
      )}
    </>
  )
}

export default Products
