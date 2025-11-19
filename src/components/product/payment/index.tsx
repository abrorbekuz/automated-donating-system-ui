import React, { useEffect, useRef, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog'
import useMediaQuery from 'src/hooks/use-media-query'
import { Button } from '../../ui/button'
import { DrawerTrigger, DrawerContent, Drawer } from '../../ui/drawer'
import { CREATE_TRANSACTION } from 'src/api/queries/transactionQueries'
import { CreateTransaction, CreateTransactionResponse } from 'src/types/transactionType'
import { useMutation } from '@apollo/client'
import { ProductType } from 'src/types/productType'
import { Textarea } from 'src/components/ui/textarea'
import Cheque from 'src/components/cheque'
import { ObtainingMethodType } from 'src/types/serviceKindType'
import { CartObtainingMethod } from '../CartObtainingMethod'
import { MultiStep, MultiStepContent, MultiStepNavigation, MultiStepProgress } from 'src/components/ui/multi-step'
import { Card, CardContent, CardFooter } from 'src/components/ui/card'
import { CreditCard, Share2, ShoppingCartIcon } from 'lucide-react'
import { useToast } from 'src/hooks/use-toast'
import { cn } from 'src/lib/utils'
import { useTranslation } from 'react-i18next'

interface PaymentDialogProps {
  service: string
  obtainingMethod: ObtainingMethodType | undefined
  products: ProductType[]
  total: number
  stars?: number
  disabled: boolean
  className?: string
}

interface PaymentButtonProps {
  method: string
  label: string
}

const paymentMethods = [
  { method: 'PAYME', label: 'PayMe', icon: 'payme' },
  { method: 'CLICK', label: 'Click', icon: 'credit-card' },
  // { method: 'CARD', label: 'Karta', icon: 'credit-card' },
]

const PaymentDialog: React.FC<PaymentDialogProps> = ({
  service,
  obtainingMethod,
  products,
  total,

  // currently 0 so it wont effect the patch
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  stars,
  disabled,

  className,
}) => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  // default ones
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const { toast } = useToast()

  // used for payment form validation and data
  const [formData, setFormData] = useState<{ [key: string]: string }>({})
  const [comment, setComment] = useState<string>('')
  const [paymentMethod, setPaymentMethod] = useState<string>('PAYME')

  const [errorCount, setErrorCount] = useState<number>(1)
  // console.log(service, products, total, errorCount, formData, paymentMethod)

  // transaction params
  const [createTransaction, { data, loading, error }] = useMutation<CreateTransactionResponse, CreateTransaction>(
    CREATE_TRANSACTION,
  )

  const handlePaymentClick = async () => {
    if (!service) {
      console.error('Service is required')
      return
    }

    if (products.length === 0) {
      console.error('At least one product ID is required')
      return
    }

    if (total <= 0) {
      console.error('Total amount must be greater than zero')
      return
    }

    if (errorCount > 0) {
      console.error('Error count must be greater than zero')
      return
    }

    const transactionData: CreateTransaction = {
      serviceSlug: service,
      productsIds: products.map((item) => item.id),
      amount: total,
      inputs: JSON.stringify(formData),
      currency: 'UZS',

      // stars will be updated near future
      starsUsed: 0,

      paymentMethod: paymentMethod,
    }

    try {
      await createTransaction({ variables: transactionData })
    } catch (err) {
      console.error('Error creating transaction')
    }
  }

  // to resize drawer on mobile devices because it stuck sometimes
  const formContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleResize = () => {
      if (formContainerRef.current) {
        formContainerRef.current.style.setProperty('bottom', `env(safe-area-inset-bottom)`)
      }
    }

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize)
      handleResize() // Initial call in case the keyboard is already open
    }

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleResize)
      }
    }
  }, [])

  const PaymentButton: React.FC<PaymentButtonProps> = ({ method, label }) => {
    // const { me } = useMeContext()

    // useEffect(() => {
    //   // redirect to login page
    //   if (!me) {
    //     window.location.href = '/auth/'
    //     return
    //   }
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])

    return (
      <div className="flex w-full gap-2">
        <Button
          onClick={() => setPaymentMethod(method)}
          variant={paymentMethod == method ? 'default' : 'outline'}
          className={`text-md h-12 w-full font-semibold`}
        >
          {label}
        </Button>
      </div>
    )
  }

  const renderPaymentButtons = () => (
    <div className="flex flex-col">
      <div className="grid grid-cols-2 gap-4 sm:p-0 md:grid-cols-3">
        {paymentMethods.map((method) => (
          <PaymentButton key={method.method} method={method.method} label={method.label} />
        ))}
      </div>
    </div>
  )

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            className={cn('py-8 text-lg font-bold hover:text-secondary', className)}
            onClick={() => setOpen(true)}
            disabled={disabled}
          >
            {t('buy')}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-lg">
          <MultiStep className="mt-4">
            <MultiStepProgress steps={2} className="mb-8" />

            <MultiStepContent step={1}>
              <DialogHeader>
                <DialogTitle>Payments</DialogTitle>
                <DialogDescription className="hidden"></DialogDescription>
              </DialogHeader>

              <div className="w-full">
                <div className="grid gap-3">
                  <div className="text-lg">You will receive after the payment</div>
                  <CartObtainingMethod
                    obtainingMethod={obtainingMethod}
                    setFormData={setFormData}
                    setErrorCount={setErrorCount}
                  />
                  <Cheque products={products} total={total} />
                </div>
              </div>

              {renderPaymentButtons()}
              <Textarea onChange={(e) => setComment(e.target.value)} placeholder="Comment for seller" value={comment} />
              <MultiStepNavigation canGoPrevious={false} canGoNext={errorCount <= 0} onNext={handlePaymentClick} />
            </MultiStepContent>

            <MultiStepContent step={2}>
              <Card className="mx-auto w-full max-w-md">
                <CardContent className="p-6">
                  <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold">{data?.createTransaction.transaction.outputs}</h2>
                  </div>

                  <div className="mb-6 flex justify-center">
                    <div className="rounded-lg p-2">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?data=${document.location.origin}/payments/${data?.createTransaction.transactionId}/&amp;size=200x200&margin=10`}
                        className="aspect-square h-[200px] w-[200px] rounded-lg object-contain"
                      />
                    </div>
                  </div>

                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Amount Due</p>
                      <p className="text-2xl font-bold">
                        {data?.createTransaction.transaction.amount} {data?.createTransaction.transaction.currency}
                      </p>
                    </div>
                    <div>
                      {/* <p className="text-sm text-muted-foreground">Due Date</p>
                      <p className="text-lg">15 Jul 2023</p> */}
                    </div>
                  </div>

                  <MultiStepNavigation canGoPrevious={false} lastPage={true}>
                    <div
                      onClick={() =>
                        (window.location.href = `${document.location.origin}/payments/${data?.createTransaction.transactionId}/`)
                      }
                      className="flex w-full items-center justify-center"
                    >
                      <CreditCard className="mr-2 h-4 w-4" /> Pay Now
                    </div>
                  </MultiStepNavigation>
                </CardContent>

                <CardFooter className="flex justify-between rounded-lg bg-muted p-4">
                  <div className="flex items-center">
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span className="text-sm">{data?.createTransaction.transaction.paymentMethod}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${document.location.origin}/payments/${data?.createTransaction.transactionId}/`,
                      )
                      toast({
                        title: 'Copied to clipboard',
                      })
                    }}
                  >
                    <Share2 className="mr-2 h-4 w-4" /> Share
                  </Button>
                </CardFooter>
              </Card>
              <Card className="rounded-lg bg-secondary-foreground/10 p-4 text-sm opacity-80">
                <h4 className="mb-2 font-semibold">Note:</h4>
                <p>Product will be delivered after payment has been processed</p>
              </Card>
            </MultiStepContent>
          </MultiStep>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {products.length > 0 ? (
          <Button
            className={cn(
              'py-6 text-lg font-bold transition-all duration-1000 ease-in-out hover:text-secondary',
              className,
            )}
            onClick={() => setOpen(true)}
            disabled={disabled}
          >
            <ShoppingCartIcon />
          </Button>
        ) : (
          <Button
            className={cn('py-8 text-lg font-bold hover:text-secondary', className)}
            onClick={() => setOpen(true)}
            disabled={disabled}
          >
            {t('buy')}
          </Button>
        )}
      </DrawerTrigger>
      <DrawerContent ref={formContainerRef} className="min-h-[70vh]">
        <MultiStep className="p-4">
          <MultiStepProgress steps={2} />

          <MultiStepContent step={1}>
            <div className="flex w-full flex-col gap-4">
              <div className="grid gap-3">
                <div className="mt-4 text-lg font-semibold">Payments</div>
                <div className="text-lg">You will receive after the payment</div>
                <CartObtainingMethod
                  obtainingMethod={obtainingMethod}
                  setFormData={setFormData}
                  setErrorCount={setErrorCount}
                />
                <Cheque products={products} total={total} />
              </div>
              <Textarea onChange={(e) => setComment(e.target.value)} placeholder="Comment for seller" value={comment} />
              {renderPaymentButtons()}
            </div>

            <MultiStepNavigation canGoPrevious={false} canGoNext={errorCount <= 0} onNext={handlePaymentClick} />
            <div className="h-12" />
          </MultiStepContent>

          <MultiStepContent step={2}>
            <Card className="mx-auto w-full max-w-md">
              <CardContent className="p-6">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold">{data?.createTransaction.transaction.outputs}</h2>
                  <div className="flex items-center">
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span className="text-sm">{data?.createTransaction.transaction.paymentMethod}</span>
                  </div>
                </div>

                <div className="mb-6 flex justify-center">
                  <div className="rounded-lg p-2">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?data=${document.location.origin}/payments/${data?.createTransaction.transactionId}/&amp;size=200x200&margin=10`}
                      className="aspect-square h-[200px] w-[200px] rounded-lg object-contain"
                    />
                  </div>
                </div>

                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Amount Due</p>
                    <p className="text-2xl font-bold">
                      {data?.createTransaction.transaction.amount} {data?.createTransaction.transaction.currency}
                    </p>
                  </div>
                  <div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `${document.location.origin}/payments/${data?.createTransaction.transactionId}/`,
                        )
                        toast({
                          title: 'Copied to clipboard',
                        })
                      }}
                    >
                      <Share2 className="mr-2 h-4 w-4" /> Share
                    </Button>
                  </div>
                </div>

                <MultiStepNavigation canGoPrevious={false} lastPage={true}>
                  <div
                    onClick={() =>
                      (window.location.href = `${document.location.origin}/payments/${data?.createTransaction.transactionId}/`)
                    }
                    className="flex w-full items-center justify-center"
                  >
                    <CreditCard className="mr-2 h-4 w-4" /> Pay Now
                  </div>
                </MultiStepNavigation>
              </CardContent>
            </Card>
            <Card className="rounded-lg bg-secondary-foreground/10 p-4 text-sm opacity-80">
              <h4 className="mb-2 font-semibold">Note:</h4>
              <p>Product will be delivered after payment has been processed</p>
            </Card>
          </MultiStepContent>
        </MultiStep>
      </DrawerContent>
    </Drawer>
  )
}

export default PaymentDialog
