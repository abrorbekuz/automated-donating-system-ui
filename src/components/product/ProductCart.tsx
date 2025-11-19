// src/components/ProductCart.tsx
import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import { Card } from 'src/components/ui/card'
import { ProductType } from 'src/types/productType'
import { ServiceType } from 'src/types/serviceKindType'
import { useMeContext } from 'src/hooks/MeContext'
import PaymentDialog from './payment'
import { Badge } from '../ui/badge'
import { cn } from 'src/lib/utils'
import { usePortal } from '../portal'

interface ProductCartProps extends React.HTMLAttributes<HTMLDivElement> {
  cart: ProductType[]
  contentCreator: string
  handleCart: ({ item, plus }: { item: ProductType; plus: boolean }) => void
  service: ServiceType | undefined
  className?: string
}

export const ProductCart: React.FC<ProductCartProps> = ({
  cart,
  contentCreator,
  handleCart,
  service,
  className,
  ...props
}) => {
  const { me } = useMeContext(true)
  const { setContent } = usePortal()

  const [star, setStar] = useState<number>(0)
  const [useStar, setUseStar] = useState<boolean>(false)

  const shoppingCart = useRef() as MutableRefObject<HTMLDivElement>

  const baseSum = cart.reduce((sum, item) => {
    const price = service?.couponActivated ? item.discountedPrice : item.price
    return sum + Math.round(price * 100)
  }, 0)

  const starDeduction = star * 1000 * (useStar ? 1 : 0) * 100

  const total = Math.max((baseSum - starDeduction) / 100, 0)

  const countItems = (items: ProductType[]): { [key: string]: number } =>
    items.reduce((acc, item) => {
      acc[item.title] = (acc[item.title] || 0) + 1
      return acc
    }, {} as { [key: string]: number })

  useEffect(() => {
    setContent((prevContent) => ({
      ...prevContent,
      'mobile-nav': cart.length > 0 && (
        <div className="flex items-center justify-between gap-8 p-2">
          <div
            className={`whitespace-nowrap p-3 text-2xl font-semibold text-orange-700 ${cart.length < 1 && 'hidden'}`}
          >
            {total} sum.
          </div>
          <PaymentDialog
            service={service?.slug ?? ''}
            obtainingMethod={service?.obtainingMethod}
            total={total}
            products={cart}
            disabled={!cart.length}
            className={cart.length > 0 ? 'w-fit' : 'w-full'}
          />
        </div>
      ),
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service, cart])

  useEffect(() => {
    setStar(me?.starPoints || 0)
  }, [me])

  return (
    <div className="col-span-3 ml-0 flex flex-col gap-3 md:ml-auto lg:col-span-2 lg:gap-4 xl:col-span-1 xl:gap-4">
      <div className="flex flex-col justify-between gap-4 p-4 md:p-0">
        <div className="text-lg font-bold capitalize md:text-2xl">{service?.title}</div>
        {service?.slug !== service?.serviceType.slug && service?.author.user.username}
      </div>
      <Card
        className={cn('sticky top-[100px]  h-fit space-y-4 rounded-none p-2 md:rounded-2xl md:p-4 ', className)}
        ref={shoppingCart}
        {...props}
      >
        <div className="p-3 text-4xl font-semibold text-orange-700">
          {total} sum. {useStar && `~${star * (useStar ? 1 : 0)} being used`}
        </div>

        <div className="flex w-full flex-col gap-4">
          <div className="flex flex-wrap gap-4">
            {Object.entries(countItems(cart)).map(([name, count]) => {
              const item = cart.find((iterator) => iterator.title === name)
              if (!item) return null
              return (
                <div
                  key={name}
                  className="group flex w-fit select-none rounded-lg border border-green-400 bg-white/5 font-semibold backdrop-blur-lg"
                >
                  <div className="flex items-center px-2">
                    <p className="p-2 text-lg">{name}</p>
                    {item.icon}
                    <p className="p-2">{count !== 1 && `${count}x`}</p>
                  </div>
                  <div
                    className="hidden w-8 items-center justify-center rounded-r-lg bg-green-400/70 group-hover:flex"
                    onClick={() => handleCart({ item, plus: false })}
                  >
                    <b className="pointer-events-none">-</b>
                  </div>
                </div>
              )
            })}
          </div>

          {contentCreator && (
            <Badge className="text-md w-fit" variant={'secondary'}>
              {contentCreator}
            </Badge>
          )}

          <PaymentDialog
            service={service?.slug ?? ''}
            obtainingMethod={service?.obtainingMethod}
            total={total}
            stars={useStar ? star : 0}
            products={cart}
            disabled={!cart.length}
          />

          {/* <div className="flex justify-between px-2">
            <div className="text-md font-semibold">Enable star points</div>
            <Switch onCheckedChange={(checked) => setUseStar(checked)} />
          </div> */}
        </div>

        <Card className="rounded-lg bg-secondary-foreground/10 p-4 text-sm opacity-80">
          <h4 className="mb-2 font-semibold">Note:</h4>
          <p>
            Your purchase will be instantly credited to your account. Please make sure you have entered the correct Game
            ID before making a purchase. For any issues, please contact our support team.
          </p>
        </Card>
      </Card>
    </div>
  )
}
