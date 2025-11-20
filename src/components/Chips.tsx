import React, { useState, createContext, useContext, useMemo } from 'react'
import { cn } from 'src/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { useNavigate, useSearch } from '@tanstack/react-router'

// Define variant styling using cva
const chipItemVariants = cva(
  'rounded-full px-4 py-2 inline-flex items-center font-semibold transition-colors focus:outline-none focus:ring-2 whitespace-nowrap focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/80 capitalize',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 capitalize',
        outline: 'border border-foreground text-foreground hover:bg-muted/50 capitalize',
      },
      size: {
        default: 'px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

// Chip Context for managing state between group and items
const ChipContext = createContext<{
  tag: string
  setTag: (value: string) => void
} | null>(null)

const useChipContext = () => {
  const context = useContext(ChipContext)
  if (!context) throw new Error('useChipContext must be used within a ChipProvider')
  return context
}

// ChipGroup component (Manages state and passes it down via context)
const ChipGroup: React.FC<{
  children: React.ReactNode
  className?: string
  listenToTag?: string
  default?: string
  onTagChange?: (newTag: string) => void
}> = ({ className, children, listenToTag = 'tag', default: defaultTag = 'all', onTagChange }) => {
  const navigate = useNavigate()

  // ✅ FIXED: useSearch returns the search params object directly
  const searchParams = useSearch({ from: '' })

  // ✅ FIXED: Access the property directly, not with .get()
  const [tag, setTag] = useState(searchParams[listenToTag] || defaultTag)

  const handleOrderChange = (newTag: string) => {
    setTag(newTag)

    // ✅ FIXED: Pass an object to navigate with the updated search params
    navigate({
      search: {
        ...searchParams,
        [listenToTag]: newTag,
      },
    })

    // Call the onTagChange callback if provided
    if (onTagChange) {
      onTagChange(newTag)
    }
  }

  // Memoize context value to prevent unnecessary renders
  const providerValue = useMemo(() => ({ tag: tag || defaultTag, setTag: handleOrderChange }), [tag, defaultTag])

  return (
    <ChipContext.Provider value={providerValue}>
      <div className={cn('flex flex-wrap gap-2', className)}>{children}</div>
    </ChipContext.Provider>
  )
}

// ChipItem component (accepts any dynamic props)
export interface ChipItemProps extends React.HTMLAttributes<HTMLButtonElement>, VariantProps<typeof chipItemVariants> {
  value: string
  isActivex?: boolean
}

const ChipItem: React.FC<ChipItemProps> = ({ value, variant, size, className, isActivex, ...props }) => {
  const { tag, setTag } = useChipContext()
  const isActive = typeof isActivex !== 'undefined' ? isActivex : tag === value

  return (
    <button
      className={cn(chipItemVariants({ variant, size }), isActive && 'ring-2 ring-offset-2', className)}
      onClick={() => setTag(value)}
      {...props}
    >
      {props.children}
    </button>
  )
}

export { ChipItem, ChipGroup }
