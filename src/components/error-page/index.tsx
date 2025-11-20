import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Button } from '../ui/button'

export function ErrorPage({ error }: { error: any }) {
  const { t } = useTranslation('notfound')

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
