import { useState } from 'react'
import { ChevronLeftIcon } from 'lucide-react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'

import { ChipGroup, ChipItem } from 'src/components/Chips'
import { ServiceItems } from 'src/components/home/serviceItems'
import { SearchBar } from 'src/components/searchbar'
import { useServiceMain } from 'src/hooks/useServiceMain'
import { Link, useParams } from '@tanstack/react-router'

export default function Category() {
  const { t } = useTranslation('translation')

  const { name } = useParams({ from: '/$category/$name' })

  const [tag, setTag] = useState<string>('all')

  const { loading, error, service } = useServiceMain(name ?? '')

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <>
      <main className="mx-auto mb-8 space-y-6 lg:container">
        <Helmet>
          <title>{service?.title}</title>
        </Helmet>
        <section className="">
          <div className="flex items-center justify-between px-4 py-6 md:hidden">
            <Link to="/home" className="flex items-center gap-4">
              <ChevronLeftIcon />
            </Link>
            <div className="text-md font-bold">{service?.title}</div>
            <SearchBar iconOnly={true} />
          </div>

          <div className="relative flex h-[120px] w-full items-end overflow-hidden bg-secondary p-4 md:h-[240px] lg:rounded-sm">
            <div className="absolute inset-0 z-10 h-full w-full bg-gradient-to-b from-transparent to-black/60" />
            <div className="z-20 flex items-end">
              <div className="flex items-end gap-4">
                <img className="aspect-square h-14 rounded-sm object-cover" src={service?.icon} />
                <h1 className="text-lg font-bold text-white md:text-xl">{service?.title}</h1>
              </div>
            </div>
            <img className="absolute inset-0 h-full w-full object-cover object-center" src={service?.banner} />
          </div>
        </section>
        <ChipGroup onTagChange={(newTag) => setTag(newTag)} className="px-2 lg:px-0">
          <ChipItem value="all">All</ChipItem>
          {service?.tags.split(' ').map((tag, index) => (
            <ChipItem key={index} className="capitalize" value={tag}>
              {tag}
            </ChipItem>
          ))}
        </ChipGroup>

        <ServiceItems service={service?.slug} tag={tag} />
      </main>
    </>
  )
}
