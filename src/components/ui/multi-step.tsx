import * as React from 'react'
import { cn } from 'src/lib/utils'
import { Button } from './button'
import { Loader } from 'lucide-react'

const MultiStepContext = React.createContext<{
  currentStep: number
  setCurrentStep: (step: number) => void
  data: Record<string, any>
  setData: (data: Record<string, any>) => void
  isChangingStep: boolean
} | null>(null)

const MultiStep = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    defaultStep?: number
    onStepChange?: (step: number) => void
  }
>(({ className, defaultStep = 1, onStepChange, ...props }, ref) => {
  const [currentStep, setCurrentStep] = React.useState(defaultStep)
  const [data, setData] = React.useState<Record<string, any>>({})
  const [isChangingStep, setIsChangingStep] = React.useState(false)

  const handleStepChange = async (step: number) => {
    setIsChangingStep(true)
    // Add a small delay to show the loading animation
    await new Promise((resolve) => setTimeout(resolve, 300))
    setCurrentStep(step)
    onStepChange?.(step)
    setIsChangingStep(false)
  }

  return (
    <MultiStepContext.Provider
      value={{
        currentStep,
        setCurrentStep: handleStepChange,
        data,
        setData,
        isChangingStep,
      }}
    >
      <div ref={ref} className={cn('space-y-4', className)} {...props} />
    </MultiStepContext.Provider>
  )
})
MultiStep.displayName = 'MultiStep'

const MultiStepContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    step: number
  }
>(({ className, step, children, ...props }, ref) => {
  const { currentStep, isChangingStep } = useMultiStep()

  if (currentStep !== step) return null

  return (
    <div ref={ref} className={cn('relative space-y-4', className)} {...props}>
      {isChangingStep ? (
        <div className="inset-0 flex items-center justify-center">
          <Loader className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        children
      )}
    </div>
  )
})
MultiStepContent.displayName = 'MultiStepContent'

const MultiStepNavigation = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    onNext?: () => void
    onPrevious?: () => void
    canGoNext?: boolean
    canGoPrevious?: boolean
    lastPage?: boolean
  }
>(
  (
    { className, onNext, onPrevious, canGoNext = true, canGoPrevious = true, lastPage = false, children, ...props },
    ref,
  ) => {
    const { currentStep, setCurrentStep, isChangingStep } = useMultiStep()

    const handleNext = () => {
      onNext?.()
      setCurrentStep(currentStep + 1)
    }

    const handlePrevious = () => {
      onPrevious?.()
      setCurrentStep(currentStep - 1)
    }

    return (
      <div ref={ref} className={cn('mt-4 flex justify-between gap-4', className)} {...props}>
        {canGoPrevious && (
          <Button variant="outline" onClick={handlePrevious} className="text-md h-12 w-full" disabled={isChangingStep}>
            Previous
          </Button>
        )}

        <Button onClick={handleNext} disabled={!canGoNext || isChangingStep} className="text-md h-12 w-full">
          {isChangingStep ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : null}
          {children ? children : lastPage ? 'Complete' : 'Continue'}
        </Button>
      </div>
    )
  },
)
MultiStepNavigation.displayName = 'MultiStepNavigation'

// Other components remain the same...
const MultiStepProgress = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    steps: number
    orientation?: 'horizontal' | 'vertical'
  }
>(({ className, steps, orientation = 'horizontal', ...props }, ref) => {
  const { currentStep } = useMultiStep()

  return (
    <div
      ref={ref}
      className={cn('flex w-full', orientation === 'vertical' ? 'flex-col space-y-4' : 'space-x-4', className)}
      {...props}
    >
      {Array.from({ length: steps }, (_, i) => i + 1).map((step) => (
        <div key={step} className={cn('flex items-center', orientation === 'horizontal' && 'flex-1')}>
          <div
            className={cn(
              'flex h-2 w-full items-center justify-center rounded-full transition-colors',
              step <= currentStep ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground',
            )}
          />
        </div>
      ))}
    </div>
  )
})
MultiStepProgress.displayName = 'MultiStepProgress'

const MultiStepTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    step: number
  }
>(({ className, step, ...props }, ref) => {
  const { setCurrentStep } = useMultiStep()

  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        className,
      )}
      onClick={() => setCurrentStep(step)}
      {...props}
    />
  )
})
MultiStepTrigger.displayName = 'MultiStepTrigger'

const useMultiStep = () => {
  const context = React.useContext(MultiStepContext)
  if (!context) {
    throw new Error('useMultiStep must be used within a MultiStep component')
  }
  return context
}

export { MultiStep, MultiStepProgress, MultiStepContent, MultiStepTrigger, MultiStepNavigation, useMultiStep }
