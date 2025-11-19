import React, { useState, createContext, useContext, useMemo, ReactNode } from 'react'
import { cn } from 'src/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

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
  activeTag: string
  setActiveTag: (value: string) => void
} | null>(null)

const useChipContext = () => {
  const context = useContext(ChipContext)
  if (!context) throw new Error('useChipContext must be used within a ChipProvider')
  return context
}

// Chips component (Parent container)
const ChipsGroup: React.FC<{
  children: ReactNode
  defaultValue?: string
}> = ({ children, defaultValue = 'all' }) => {
  const [activeTag, setActiveTag] = useState(defaultValue)

  // Memoize context value to prevent unnecessary renders
  const providerValue = useMemo(() => ({ activeTag, setActiveTag }), [activeTag])

  return <ChipContext.Provider value={providerValue}>{children}</ChipContext.Provider>
}

// ChipsList component (Container for triggers)
const ChipsList: React.FC<{
  children: ReactNode
  className?: string
}> = ({ children, className }) => (
  <div className={cn('no-scrollbar flex select-none flex-wrap overflow-x-auto', className)}>
    <div className="flex space-x-2">{children}</div>
  </div>
)

// ChipsTrigger component (Each selectable item)
interface ChipsTriggerProps extends VariantProps<typeof chipItemVariants> {
  value: string
  children: ReactNode
}

const ChipsTrigger: React.FC<ChipsTriggerProps> = ({ value, variant, size, children, ...props }) => {
  const { activeTag, setActiveTag } = useChipContext()
  const isActive = activeTag === value

  return (
    <button
      className={cn(
        chipItemVariants({
          variant: isActive ? 'default' : variant || 'secondary',
          size,
        }),
      )}
      onClick={() => setActiveTag(value)}
      {...props}
    >
      {children}
    </button>
  )
}

// ChipsContent component (Displays content based on active tag)
const ChipsContent: React.FC<{ value: string; children: ReactNode }> = ({ value, children }) => {
  const { activeTag } = useChipContext()

  // Display content only if the activeTag matches the content's value
  if (activeTag !== value) return null

  return <div>{children}</div>
}

export { ChipsGroup, ChipsList, ChipsTrigger, ChipsContent }
