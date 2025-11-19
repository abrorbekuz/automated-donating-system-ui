import { useTranslation } from 'react-i18next'
import { useCallback, useMemo } from 'react'
import { cn } from 'src/lib/utils'
import { LANGUAGES } from 'src/i18n/config'
import { Languages } from 'lucide-react'
import i18next from 'i18next'
import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '../ui/dropdown-menu'

const getLocaleDisplayName = (locale: string, displayLocale?: string) => {
  const displayName = new Intl.DisplayNames([displayLocale || locale], {
    type: 'language',
  }).of(locale)
  if (!displayName) {
    return locale
  }
  return displayName.charAt(0).toLocaleUpperCase() + displayName.slice(1)
}

const LanguageSelector = () => {
  const { i18n } = useTranslation()

  const localesAndNames = useMemo(() => {
    return LANGUAGES.map((locale) => ({
      locale,
      name: getLocaleDisplayName(locale),
    }))
  }, [])

  const languageChanged = useCallback(async (locale: string) => {
    i18next.changeLanguage(locale)
  }, [])

  const { resolvedLanguage: currentLanguage } = i18n

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className="flex items-center gap-1">
        <Languages size={18} />
        {currentLanguage && getLocaleDisplayName(currentLanguage)}
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          {localesAndNames.map(({ locale, name }) => {
            const isSelected = currentLanguage === locale
            return (
              <DropdownMenuItem
                key={locale}
                onClick={() => languageChanged(locale)}
                className={cn(`relative w-auto cursor-pointer select-none px-4 py-2`)}
              >
                <span className={cn(`block truncate`, isSelected && 'font-bold text-primary')}>{name}</span>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  )
}

export { LanguageSelector }
