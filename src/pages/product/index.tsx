import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { useLocation, useParams } from 'react-router-dom'
import { useService } from 'src/hooks/useService'
import { ProductType } from 'src/types/productType'

import { ProductHeader } from 'src/components/product/ProductHeader'
import { ProductGrid } from 'src/components/product/ProductGrid'
import { ProductDescription } from 'src/components/product/ProductDescription'
import { ProductCart } from 'src/components/product/ProductCart'
import ProductCarousel from 'src/components/product/ProductCarousel'
import { ServiceItems } from 'src/components/home/serviceItems'

export default function Product() {
  const { t } = useTranslation('translation')
  const { search } = useLocation()
  const [cart, setCart] = useState<ProductType[]>([])
  const { name } = useParams<{ name: string }>()

  const isHeaderShown = new URLSearchParams(search).get('tg') !== 'true'
  const contentCreator = new URLSearchParams(search).get('cc') || ''

  const { loading, error, service } = useService(name ?? '', contentCreator as string)

  const handleCart = ({ item, plus = false }: { item: ProductType; plus: boolean }) => {
    const existingItem = cart.find((iterator) => iterator.title === item.title)
    if (existingItem && !plus) {
      const updatedCart = cart.filter((iterator) => iterator.title !== item.title)
      setCart(updatedCart)
    } else if (!existingItem || plus) {
      setCart([...cart, item])
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <main className="relative mx-auto mb-8 space-y-6 md:container">
      <Helmet>
        <title>{service?.title}</title>
      </Helmet>

      <div>
        {isHeaderShown && <ProductHeader service={service} />}

        <div className="grid md:gap-4 lg:grid-cols-5 xl:grid-cols-3 xl:gap-16">
          <div className="relative col-span-3 flex flex-col gap-4 xl:col-span-2">
            <ProductCarousel images={service?.images || []} />
            <ProductGrid service={service} handleCart={handleCart} cart={cart} />
            <ProductDescription service={service} />
          </div>

          <ProductCart
            cart={cart}
            contentCreator={service?.couponActivated ? contentCreator : ''}
            handleCart={handleCart}
            service={service}
            className="hidden md:block"
          />
        </div>

        <div className="my-8">
          <h2 className="mb-4 px-4 text-2xl font-semibold md:px-0">Similar Products</h2>
          <ServiceItems service={service?.slug} tag={service?.tag} />
        </div>
      </div>
    </main>
  )
}
