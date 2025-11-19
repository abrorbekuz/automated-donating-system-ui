import React, { RefObject, useEffect, useCallback } from 'react'
import { Card } from 'src/components/ui/card'
import { ShoppingCartIcon } from 'lucide-react'
import { cn } from 'src/lib/utils'

interface CartScrollProps {
  cart: RefObject<HTMLElement>
  open: boolean
  setOpen: (open: boolean) => void
  className?: string
  animate?: boolean
}

const CartScroll = ({ cart, open, setOpen, className, animate = true }: CartScrollProps) => {
  const scroll2ShoppingCart = useCallback(() => {
    if (cart.current) {
      cart.current.scrollIntoView({
        behavior: animate ? 'smooth' : 'auto',
        block: 'start',
      })
    }
  }, [cart, animate])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setOpen(entry.isIntersecting)
        })
      },
      {
        threshold: 0.9,
        rootMargin: '0px',
      },
    )

    const currentCart = cart.current
    if (currentCart) {
      observer.observe(currentCart)
    }

    return () => {
      if (currentCart) {
        observer.unobserve(currentCart)
      }
      observer.disconnect()
    }
  }, [cart, setOpen])

  return (
    <Card
      onClick={scroll2ShoppingCart}
      className={cn(
        'fixed transition-all duration-300 ease-in-out',
        'bottom-20 right-4 lg:bottom-8 lg:right-20',
        'select-none rounded-lg p-4 shadow-lg',
        'hover:scale-110 hover:bg-primary',
        'translate-y-full opacity-0',
        !open && 'translate-y-0 opacity-100',
        className,
      )}
    >
      <ShoppingCartIcon className="text-primary transition-colors duration-300 group-hover:text-secondary" size={24} />
    </Card>
  )
}

export default CartScroll
