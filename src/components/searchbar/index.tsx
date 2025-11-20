import React, { useCallback, useEffect } from 'react'
import { SearchIcon } from 'lucide-react'
import { debounce } from 'lodash'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import SearchBarChips from './serchbarchips'
import SearchBarResults from './searchbarresults'

export function SearchBar({ iconOnly }: { iconOnly?: boolean }) {
  const [open, setOpen] = React.useState(false)

  const [query, setQuery] = React.useState<string>('')
  const [slug, setSlug] = React.useState<string>('all')

  const toggleOpen = React.useCallback(() => {
    setOpen((open) => !open)
  }, [])

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

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        toggleOpen()
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [toggleOpen])

  useEffect(() => {
    document.body.classList.toggle('overflow-y-hidden', open)
  }, [open])

  return (
    <>
      {iconOnly ? (
        <SearchIcon onClick={toggleOpen} />
      ) : (
        <div className="flex-1 md:mx-4">
          <div className="relative select-none" onClick={toggleOpen}>
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 transform text-muted-foreground" />
            <div className="flex h-10 w-full items-end rounded-full border border-input bg-background px-3 py-2 pl-10 pr-4 text-sm text-muted-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
              Search products...
            </div>
          </div>
        </div>
      )}
      {open && (
        <>
          <div className="fixed inset-0 z-50 h-full w-full border-b bg-background md:h-half" style={{ margin: 0 }}>
            <div className="container flex h-full flex-col space-y-2 p-0 pt-2 md:space-y-4">
              <div className="flex items-center gap-2 p-2">
                <div className="relative grow">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 transform text-muted-foreground" />
                  <Input
                    className="w-full rounded-md py-2 pl-10 pr-4"
                    onChange={handleOnChange}
                    type="text"
                    placeholder="Search products..."
                  />
                </div>
                <Button className="md:hidden" variant="secondary" onClick={toggleOpen}>
                  Cancel
                </Button>
              </div>

              <SearchBarChips slug={slug} setSlug={setSlug} />
              <SearchBarResults query={query} slug={slug} setOpen={setOpen} />
            </div>
          </div>
          <div className="fixed inset-0 z-40 h-full w-full bg-background/30" onClick={toggleOpen} />
        </>
      )}
    </>
  )
}
