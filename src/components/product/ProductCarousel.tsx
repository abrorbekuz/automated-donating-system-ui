import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from 'src/components/ui/carousel'
import Guarantee from '../guarantee'
import React from 'react'

interface CarouselComponentProps {
  images: string[]
}

const ProductCarousel: React.FC<CarouselComponentProps> = ({ images }) => {
  const contentRef = React.useRef<HTMLImageElement>(null)

  const handleFullscreen = () => {
    if (contentRef.current) {
      if (contentRef.current.requestFullscreen) {
        contentRef.current.requestFullscreen()
      } else {
        alert('Fullscreen API is not supported in this browser.')
      }
    }
  }

  return (
    <Carousel ref={contentRef} opts={{ align: 'start' }} className="group">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <img
                src={image}
                className="aspect-video h-full w-full object-cover md:rounded-lg"
                onClick={handleFullscreen}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4">
        <Guarantee />
      </div>
      <div className="opacity-0 transition-opacity duration-300 md:group-hover:opacity-100">
        <CarouselPrevious className="absolute left-5 top-[50%] h-10 w-10 bg-secondary" />
        <CarouselNext className="absolute right-5 top-[50%] h-10 w-10 bg-secondary" />
      </div>
    </Carousel>
  )
}

export default ProductCarousel
