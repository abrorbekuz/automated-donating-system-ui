import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useCategory } from 'src/hooks/useCategory'

export function Services() {
  const { t } = useTranslation()
  const { loading, error, categories } = useCategory()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <>
      {categories?.map(
        (category, index) =>
          category.services?.length !== 0 && (
            <section key={index}>
              <h2 className="text my-6 text-2xl font-semibold capitalize">
                {category.icon} {category.title}
              </h2>

              <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-7 lg:grid-cols-9 xl:grid-cols-12">
                {category.services?.map((service, index) => (
                  <Link key={index} to={`/${category.slug}/${service.slug}`} className="mb-2 flex flex-col">
                    <div className="group relative mb-2">
                      <img src={service.icon} className="aspect-square h-full w-full rounded-lg border object-cover" />
                    </div>
                    <h2 className="overflow-hidden whitespace-nowrap text-center text-sm font-medium">
                      {service.title}
                    </h2>
                  </Link>
                ))}
              </div>
            </section>
          ),
      )}
    </>
  )
}
