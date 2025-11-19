import { useTranslation } from 'react-i18next'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'src/components/ui/select'
import { useEffect } from 'react'

export default function LanguageSelector() {
  const { t, i18n } = useTranslation()

  useEffect(() => {
    // Load saved language preference from localStorage
    const savedLang = localStorage.getItem('language')
    if (savedLang) {
      i18n.changeLanguage(savedLang)
    }
  }, [i18n])

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
    // Save language preference to localStorage
    localStorage.setItem('language', lng)
  }

  return (
    <div className="w-48">
      <Select onValueChange={changeLanguage} defaultValue={i18n.language}>
        <SelectTrigger>
          <SelectValue placeholder={t('selectLanguage')} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="uz">{t('uzbek')}</SelectItem>
          <SelectItem value="en">{t('english')}</SelectItem>
          <SelectItem value="ru">{t('russian')}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
