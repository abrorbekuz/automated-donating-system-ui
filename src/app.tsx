import React, { useEffect, useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import { createRouter } from './router'
import { ThemeProvider } from './components/themeprovider'
import { ApolloProvider } from '@apollo/client'
import client from './api/graphqlClient'
import { MeProvider } from './hooks/MeContext'
import SplashScreen from './components/Splash'
import { Toaster } from './components/ui/toaster'
import { PortalProvider } from './components/portal'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const minimumSplashTime = 1000 // Minimum 3 seconds splash duration
    const totalDuration = 2000 // Artificially extend the loading duration for smoothness (4 seconds)
    const start = performance.now()

    // Gradually update the progress every 100ms
    const interval = setInterval(() => {
      const elapsedTime = performance.now() - start

      // Simulate smooth progress over time (maximum at 100%)
      const simulatedProgress = Math.min((elapsedTime / totalDuration) * 100, 100)
      setProgress(Math.floor(simulatedProgress))

      // Once the DOM is fully loaded and we have reached 100% progress, hide the splash screen
      if (document.readyState === 'complete' && simulatedProgress >= 100) {
        clearInterval(interval)
        setTimeout(() => setIsLoading(false), Math.max(0, minimumSplashTime - elapsedTime))
      }
    }, 100) // Update progress every 100ms

    return () => clearInterval(interval)
  }, [])

  return (
    <ApolloProvider client={client}>
      <ThemeProvider>
        <PortalProvider>
          <MeProvider>
            {isLoading ? (
              <SplashScreen
                text="UP"
                fillColor="hsl(var(--primary))"
                outlineColor="hsl(var(--primary))"
                waterLevel={progress}
              />
            ) : (
              <RouterProvider router={createRouter()} />
            )}
            <Toaster />
          </MeProvider>
        </PortalProvider>
      </ThemeProvider>
    </ApolloProvider>
  )
}
