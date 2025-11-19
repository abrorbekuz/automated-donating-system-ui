import * as React from 'react'
import { cn } from 'src/lib/utils'

const ExpandableContext = React.createContext<{
  open?: boolean
  onOpenChange?: (open: boolean) => void
  contentId?: string
  triggerId?: string
}>({})

const Expandable = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    defaultOpen?: boolean
    open?: boolean
    onOpenChange?: (open: boolean) => void
  }
>(({ defaultOpen = false, open, onOpenChange, className, children, ...props }, ref) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const isControlled = open !== undefined
  const isOpen = isControlled ? open : uncontrolledOpen
  const id = React.useId()

  const handleOpenChange = React.useCallback(
    (value: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(value)
      }
      onOpenChange?.(value)
    },
    [isControlled, onOpenChange],
  )

  return (
    <ExpandableContext.Provider
      value={{
        open: isOpen,
        onOpenChange: handleOpenChange,
        contentId: `expandable-content-${id}`,
        triggerId: `expandable-trigger-${id}`,
      }}
    >
      <div ref={ref} className={cn('relative', className)} {...props}>
        {children}
      </div>
    </ExpandableContext.Provider>
  )
})
Expandable.displayName = 'Expandable'

const ExpandableTrigger = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode }
>(({ children, ...props }, ref) => {
  const { open, onOpenChange, contentId, triggerId } = React.useContext(ExpandableContext)

  return (
    <div
      ref={ref}
      id={triggerId}
      aria-expanded={open}
      aria-controls={contentId}
      onClick={() => onOpenChange?.(!open)}
      {...props}
    >
      {children}
    </div>
  )
})
ExpandableTrigger.displayName = 'ExpandableTrigger'

const ExpandableContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    collapsedHeight?: string
  }
>(({ className, collapsedHeight = '0px', children, ...props }, ref) => {
  const { open, contentId, triggerId } = React.useContext(ExpandableContext)
  const [height, setHeight] = React.useState<number | string>(collapsedHeight)
  const contentRef = React.useRef<HTMLDivElement>(null)
  const transitionRef = React.useRef<NodeJS.Timeout>()

  React.useEffect(() => {
    if (!contentRef.current) return

    const contentHeight = contentRef.current.scrollHeight

    // Clear any existing transition timeout
    if (transitionRef.current) {
      clearTimeout(transitionRef.current)
    }

    if (open) {
      // Opening animation
      setHeight(contentHeight)
      transitionRef.current = setTimeout(() => {
        setHeight('auto')
      }, 200)
    } else {
      // Closing animation
      if (height === 'auto') {
        setHeight(contentRef.current.offsetHeight)
        requestAnimationFrame(() => {
          setHeight(collapsedHeight)
        })
      } else {
        setHeight(collapsedHeight)
      }
    }

    return () => {
      if (transitionRef.current) {
        clearTimeout(transitionRef.current)
      }
    }
  }, [open, collapsedHeight, height])

  return (
    <div
      ref={ref}
      id={contentId}
      role="region"
      aria-labelledby={triggerId}
      className={cn(`overflow-hidden opacity-80 transition-all duration-200 ${open && 'opacity-100'}`, className)}
      style={{ height }}
      {...props}
    >
      <div ref={contentRef}>{children}</div>
    </div>
  )
})
ExpandableContent.displayName = 'ExpandableContent'

export { Expandable, ExpandableTrigger, ExpandableContent }
