import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { ApolloError, useQuery } from '@apollo/client'
import { GET_CURRENT_USER } from 'src/api/queries/userQueries'
import { User } from 'src/types/userTypes'

interface MeContextType {
  me: User | null
  loading: boolean
  error: ApolloError
  refreshUser: () => void
}

const MeContext = createContext<MeContextType | undefined>(undefined)

const getCurrentUser = (): User | null => {
  const user = localStorage.getItem('currentUser')
  return user ? JSON.parse(user) : null
}

const saveCurrentUser = (user: User) => {
  localStorage.setItem('currentUser', JSON.stringify(user))
}

export const MeProvider = ({ children, useCache = true }: { children: ReactNode; useCache?: boolean }) => {
  const [cachedUser, setCachedUser] = useState<User | null>(useCache ? getCurrentUser() : null)
  const [refresh, setRefresh] = useState(false)

  const { loading, error, data, refetch } = useQuery<{ currentUser: User }>(GET_CURRENT_USER, {
    skip: !!cachedUser && useCache && !refresh,
  })

  useEffect(() => {
    if (data?.currentUser) {
      if (useCache) {
        saveCurrentUser(data.currentUser)
      }
      setCachedUser(data.currentUser)
      setRefresh(false)
    }
  }, [data, useCache])

  const refreshUser = () => {
    setRefresh(true)
    refetch()
  }

  const contextValue = {
    me: cachedUser || data?.currentUser || null,
    loading: !cachedUser && loading,
    error,
    refreshUser,
  }

  return <MeContext.Provider value={contextValue}>{children}</MeContext.Provider>
}

export const useMeContext = (refreshOnMount = false): MeContextType => {
  const context = useContext(MeContext)
  if (context === undefined) {
    throw new Error('useMeContext must be used within a MeProvider')
  }

  useEffect(() => {
    if (refreshOnMount) {
      context.refreshUser()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return context
}
