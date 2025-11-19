import React from 'react'
import { ChipGroup, ChipItem } from '../Chips'
import { useCategory } from 'src/hooks/useCategory'

interface SearchBarChipsProps {
  slug: string
  setSlug: (slug: string) => void
}

function SearchBarChips({ slug, setSlug }: SearchBarChipsProps) {
  const { loading, error, categories } = useCategory()
  return (
    <ChipGroup className="px-2">
      {categories?.map((category) =>
        category.services?.map((service, index) => (
          <ChipItem
            key={index}
            value={service.slug}
            isActivex={slug === service.slug}
            onClick={() => setSlug(service.slug)}
          >
            {service.title}
          </ChipItem>
        )),
      )}
    </ChipGroup>
  )
}

export default SearchBarChips
