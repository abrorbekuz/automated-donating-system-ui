import React from 'react'
import { ChipGroup, ChipItem } from '../Chips'
import { useCategory } from 'src/hooks/useCategory'

interface SellChipsProps {
  setCategory: (category: string) => void
}

function SellChips({ setCategory }: SellChipsProps) {
  const { loading, error, categories } = useCategory()
  return (
    <ChipGroup onTagChange={(newCat) => setCategory(newCat)}>
      {categories?.map((category) => (
        <ChipItem key={category.slug} value={category.slug}>
          {category.title}
        </ChipItem>
      ))}
    </ChipGroup>
  )
}

export default SellChips
