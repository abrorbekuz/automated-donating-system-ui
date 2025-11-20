import React from 'react'
import { ArrowLeftIcon, LucideShare2 } from 'lucide-react'
import { ServiceType } from 'src/types/serviceKindType'
import { useToast } from 'src/hooks/use-toast'
import { Link } from '@tanstack/react-router'
import { Button } from '../ui/button'

interface ProductHeaderProps {
  service: ServiceType | undefined
}

export const ProductHeader: React.FC<ProductHeaderProps> = ({ service }) => {
  const { toast } = useToast()
  return (
    <div className="flex items-center justify-between p-4 md:py-2">
      <div className="flex items-center gap-4">
        <Link to="..">
          <ArrowLeftIcon />
        </Link>
        <Link
          to={`/${service?.serviceType.category}/${service?.serviceType.slug}?tag=${service?.tag}`}
          className="flex items-center gap-4"
        >
          <div className="flex gap-2">
            <img
              src={service?.serviceType.icon}
              className="aspect-square h-9 w-9 rounded-sm object-cover"
              alt="Service icon"
            />
            <div className="flex flex-col justify-between">
              <span className="text-sm font-semibold">{service?.serviceType.title}</span>
              <span className="text-sm capitalize">{service?.tag}</span>
            </div>
          </div>
        </Link>
      </div>

      <Button
        variant={'secondary'}
        onClick={() => {
          navigator.clipboard.writeText(`${document.location.origin}/product/${service?.slug}`)
          toast({
            title: 'Link copied',
          })
        }}
        className="flex items-center gap-2"
      >
        <LucideShare2 size={16} />
        Share
      </Button>
    </div>
  )
}
