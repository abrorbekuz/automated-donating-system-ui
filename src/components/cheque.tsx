import React, { useState } from 'react'
import { ProductType } from 'src/types/productType'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import { Separator } from './ui/separator'
import { Card } from './ui/card'

interface ChequeProps {
  products: ProductType[]
  total: number
}

const Cheque = ({ products, total }: ChequeProps) => {
  const rawPrice = products.reduce((sum, product) => sum + product.price, 0)
  const [expanded, setExpanded] = useState<boolean>(false)

  return (
    <Card className="flex flex-col gap-2 p-4 text-sm">
      <h4 className="text-md flex gap-2 font-semibold">Cheque</h4>

      {expanded ? (
        <>
          <ul className="grid gap-3">
            {products.map((product, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-muted-foreground">{product.title}</span>
                <span>{product.price}</span>
              </div>
            ))}
          </ul>
          <Separator className="my-2" />
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{rawPrice}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Discount</span>
              <span>- {Math.abs(total - rawPrice)}</span>
            </li>
            <li className="flex items-center justify-between font-semibold">
              <span className="text-muted-foreground">Total</span>
              <span>{total}</span>
            </li>
          </ul>
          <ChevronUpIcon className="w-full" onClick={() => setExpanded(!expanded)} />
        </>
      ) : (
        <>
          <div>
            <li className="flex items-center justify-between font-semibold">
              <span className="text-muted-foreground">Total</span>
              <span>{total}</span>
            </li>
          </div>
          <ChevronDownIcon className="w-full" onClick={() => setExpanded(!expanded)} />
        </>
      )}
    </Card>
  )
}

export default Cheque
