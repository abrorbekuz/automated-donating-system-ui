import React, { ReactNode, RefObject, useEffect, useState } from 'react'
import { cn } from 'src/lib/utils'

const Hider: React.FC<{
  targetRef: RefObject<HTMLElement>
  condition?: boolean
  className?: string
  children: ReactNode
}> = ({ targetRef, condition, className, children }) => {
  const [isHidden, setIsHidden] = useState(true)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHidden(entry.isIntersecting)
      },
      { threshold: 0.1 }, // Adjust threshold to your needs
    )

    const currentElement = targetRef.current
    if (currentElement) {
      observer.observe(currentElement)
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isHidden || !condition) return

  return <div className={cn(className)}>{children}</div>
}

export default Hider
