import React, { useCallback } from 'react'
import { Input } from '../ui/input'
import { SearchIcon, XIcon } from 'lucide-react'
import SellChips from './sellchips'
import SellResults from './sellresults'
import { debounce } from 'lodash'
import { NavLink } from 'react-router-dom'

const SellProduct = () => {
  const [query, setQuery] = React.useState<string>('')
  const [category, setCategory] = React.useState<string>('all')

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetQuery = useCallback(
    debounce((value: string) => {
      setQuery(value)
    }, 2000), // Delay of 500ms
    [],
  )

  const handleOnChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      debouncedSetQuery(e.target.value)
    },
    [debouncedSetQuery],
  )

  return (
    <main className="mx-auto space-y-4 p-4 md:container md:px-4">
      <nav className="flex items-center justify-between bg-background">
        <div className="text text-lg font-medium capitalize">choose service</div>
        <NavLink to={-1}>
          <XIcon className="md:hidden" />
        </NavLink>
      </nav>
      <div className="flex flex-col gap-4">
        <div className="relative max-w-[768px]">
          <SearchIcon className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg bg-background pl-8"
            onChange={handleOnChange}
          />
        </div>
      </div>

      <SellChips setCategory={setCategory} />
      <SellResults query={query} category={category} />
    </main>
  )
}

export default SellProduct
