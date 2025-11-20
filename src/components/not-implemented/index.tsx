import { useTranslation } from 'react-i18next'

import { Link } from '@tanstack/react-router'
import { Button } from '../ui/button'

export default function NotImplemented({ error }: { error: any }) {
  const { t } = useTranslation('notimplemeted')

  return (
    <div className="flex h-[700px] w-full flex-col items-center justify-center gap-4 overflow-y-hidden text-left">
      <h1>{t('oops')}</h1>
      <p>{t('title')}</p>
      <p className="font-mono">
        <span className="mr-2">{error?.status}</span>
        <i>{error?.statusText || error?.message}</i>
      </p>
      <Button asChild>
        <Link to="/">{t('backtohomepage')}</Link>
      </Button>
    </div>
  )
}
