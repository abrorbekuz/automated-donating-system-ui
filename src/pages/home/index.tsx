import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { Carousel, CarouselContent, CarouselItem } from 'src/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { Services } from 'src/components/home/services'
import { TopItems } from 'src/components/home/topItems'
import { HomeFooter } from 'src/components/home/homeFooter'
import useMediaQuery from 'src/hooks/use-media-query'
import { Header } from 'src/components/header'

export default function Home() {
  const { t } = useTranslation('translation')
  const isDesktop = useMediaQuery('(min-width: 768px)')

  return (
    <>
      {!isDesktop && <Header />}

      <main className="container mx-auto mb-8 space-y-4">
        <Helmet>
          <title>Unlimited Possibility</title>
        </Helmet>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="mt-42 col-span-3">
            <Carousel
              opts={{
                align: 'start',
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 5000,
                }),
              ]}
            >
              <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem key={index} className="">
                    <div className="p-1">
                      <img
                        src="https://kupikod.com/gold/_ipx/_/assets/slip/slider-gold-main-2.webp"
                        className="hidden object-cover md:block"
                      />
                      <img
                        src="https://kupikod.com/gold/_ipx/_/assets/slip/slider-gold-main-2-mini.webp"
                        className="object-cover md:hidden"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
          {/* <Card className="mt-5 hidden lg:block">
            <CardContent>hhi</CardContent>
          </Card> */}
        </div>
        <Services />
        <TopItems />
      </main>
      <HomeFooter />
    </>
  )
}
