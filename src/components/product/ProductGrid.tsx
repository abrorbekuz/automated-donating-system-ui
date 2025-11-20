import React from 'react'
import { Card, CardContent } from 'src/components/ui/card'
import { Badge } from 'src/components/ui/badge'
import regroupProductsByTag, { getTag } from 'src/lib/products'
import { ProductType } from 'src/types/productType'
import { ServiceType } from 'src/types/serviceKindType'
import { useTranslation } from 'react-i18next'

import { useLocation } from '@tanstack/react-router'
import { Separator } from '../ui/separator'

interface ProductGridProps {
  service: ServiceType | undefined
  handleCart: ({ item, plus }: { item: ProductType; plus: boolean }) => void
  cart: ProductType[]
}

export type ProductProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string
  ca: boolean
  product: ProductType
  cart: ProductType[]
}

function ProductMini({ className, product, cart, ca, ...props }: ProductProps) {
  const { t } = useTranslation()
  return (
    <div className={`flex flex-col gap-2 ${className}`} {...props}>
      <Card
        className={`flex select-none flex-col border-background bg-secondary ${
          cart.some((iterator) => iterator.title === product.title) ? 'border-2 border-primary bg-primary/40' : ''
        }`}
      >
        <div className="flex items-center gap-4 px-4 py-3">
          <img
            src={product.image}
            className={`h-7 w-7 rounded-md bg-white/10 object-cover md:block md:h-9 md:w-9`}
            alt={product.title}
          />
          <p className="text-wrap text-base font-semibold">{product.title}</p>
        </div>

        <div>
          <Separator className="bg-background" />
          {ca ? (
            <div className="flex flex-wrap gap-2 p-3">
              <div className="text-md font-semibold line-through opacity-60">{product.price}</div>
              <div className="text-md font-semibold">
                {product.discountedPrice} {t(product.currency)}
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2 p-3">
              <div className="text-md font-semibold">{product.price} UZS</div>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

function ProductDefault({ className, product, ca, cart, ...props }: ProductProps) {
  return (
    <div className={`mb-2 flex w-fit cursor-pointer select-none flex-col gap-1 rounded-lg ${className}`} {...props}>
      <img
        src={product.image}
        className={`rounded-md bg-white/10 ${
          cart.some((iterator) => iterator.title === product.title) ? 'border-2 border-lime-400' : ''
        }`}
        width={200}
        height={200}
        alt={product.title}
      />
      {ca ? (
        <div className="flex flex-col gap-2">
          <div className="flex gap-4">
            <div className="text-md font-semibold">{product.title}</div>
            <div className="text-md flex gap-2 font-semibold line-through opacity-60">{product.price} UZS</div>
          </div>
          <div className="text-md flex gap-2 font-semibold">
            <Badge className="bg-yellow-400">{product.discountedPrice / 1000}*</Badge>
            {product.discountedPrice} UZS
          </div>
        </div>
      ) : (
        <div>
          <p className="text-md font-semibold">{product.title}</p>
          <div className="text-md flex gap-2 font-semibold">
            <Badge className="bg-yellow-400">{product.price / 1000}*</Badge>
            {product.price} UZS
          </div>
        </div>
      )}
    </div>
  )
}

export const ProductGrid: React.FC<ProductGridProps> = ({ service, handleCart, cart }) => {
  const { search } = useLocation()

  const isTg = new URLSearchParams(search).get('tg') === 'true'

  return (
    <Card className="rounded-none md:rounded-2xl">
      <CardContent className="flex flex-col gap-8 p-3 md:p-6">
        {regroupProductsByTag(service?.products || [], getTag).map((product, index) => (
          <div key={index} className="flex w-full flex-col gap-4">
            <div className="text-lg font-semibold capitalize">{product.tag}</div>
            <div className="3xl:grid-cols-5 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 2xl:grid-cols-4">
              {product.items.map((item, i) =>
                service?.iconScale === 0 ? (
                  <ProductMini
                    key={i}
                    product={item}
                    ca={service?.couponActivated || false}
                    cart={cart}
                    onClick={() => handleCart({ item, plus: false })}
                  />
                ) : (
                  <ProductDefault
                    key={i}
                    product={item}
                    ca={service?.couponActivated || false}
                    cart={cart}
                    onClick={() => handleCart({ item, plus: false })}
                  />
                ),
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
