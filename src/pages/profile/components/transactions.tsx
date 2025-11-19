import React, { useEffect, useState, useCallback, useRef } from 'react'
import { useQuery } from '@apollo/client'
import { NavLink } from 'react-router-dom'
import { Badge } from 'src/components/ui/badge'
import { Button } from 'src/components/ui/button'
import { DotIcon, Loader2Icon } from 'lucide-react'
import { GET_TRANSACTIONS } from 'src/api/queries/transactionQueries'
import { TransactionResponse } from 'src/types/transactionType'
import TransactionCard from './TransactionCard'

const PAGE_SIZE = 16
const SCROLL_THRESHOLD = 500

const EmptyState = () => (
  <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
    <div className="flex flex-col items-center gap-1 py-8 text-center">
      <h3 className="text-lg font-bold tracking-tight md:text-2xl">You have no transactions yet.</h3>
      <p className="text-sm text-muted-foreground">You can start seeing your transaction as soon as they made.</p>
      <NavLink to="/home">
        <Button className="mt-4">Buy something nice</Button>
      </NavLink>
    </div>
  </div>
)

const LoadingIndicator = () => (
  <section className="mt-4 flex justify-center">
    <Badge className="p-1" variant="outline">
      <Loader2Icon className="h-4 w-4 animate-spin" />
    </Badge>
  </section>
)

const ScrollIndicator = () => (
  <section className="my-4 flex justify-center">
    <Badge className="p-1" variant="outline">
      <DotIcon className="h-4 w-4" />
      <DotIcon className="h-4 w-4" />
      <DotIcon className="h-4 w-4" />
    </Badge>
  </section>
)

const Transactions = () => {
  const [isFetchingMore, setIsFetchingMore] = useState(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout>()

  const { data, loading, error, fetchMore } = useQuery<TransactionResponse>(GET_TRANSACTIONS, {
    variables: {
      first: PAGE_SIZE,
      author: 'me',
      after: null,
    },
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  })

  const loadMoreTransactions = useCallback(async () => {
    if (!data?.transactions.pageInfo.hasNextPage || isFetchingMore) return

    setIsFetchingMore(true)
    try {
      await fetchMore({
        variables: {
          first: PAGE_SIZE,
          after: data.transactions.pageInfo.endCursor,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return previousResult

          // Combine existing edges with the new ones
          return {
            transactions: {
              ...fetchMoreResult.transactions,
              edges: [...previousResult.transactions.edges, ...fetchMoreResult.transactions.edges],
            },
          }
        },
      })
    } finally {
      setIsFetchingMore(false)
    }
  }, [data, fetchMore, isFetchingMore])

  const handleScroll = useCallback(() => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }

    scrollTimeoutRef.current = setTimeout(() => {
      const scrollPosition = window.innerHeight + document.documentElement.scrollTop
      const threshold = document.documentElement.offsetHeight - SCROLL_THRESHOLD

      if (scrollPosition >= threshold) {
        loadMoreTransactions()
      }
    }, 200)
  }, [loadMoreTransactions])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [handleScroll])

  if (loading && !data) {
    return <LoadingIndicator />
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">Error: {error.message}</div>
  }

  const transactions = data?.transactions.edges || []

  return (
    <>
      <section>
        <div className="flex flex-col gap-4">
          {transactions.length ? (
            transactions.map(({ node }, index) => <TransactionCard key={index} node={node} />)
          ) : (
            <EmptyState />
          )}
        </div>
      </section>

      {transactions.length > 0 && <ScrollIndicator />}
      {(loading || isFetchingMore) && <LoadingIndicator />}
    </>
  )
}

export default Transactions
