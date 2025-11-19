import React, { useState, useEffect } from 'react'
import { ObtainingMethodType } from 'src/types/serviceKindType'
import { Card } from '../ui/card'
import { PackageIcon } from 'lucide-react'
import { Input } from '../ui/input'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'

export const CartObtainingMethod = (props: {
  obtainingMethod: ObtainingMethodType | undefined
  setFormData: (callback: (prevData: { [key: string]: string }) => { [key: string]: string }) => void
  setErrorCount: (errorCount: number) => void
}) => {
  const { obtainingMethod, setFormData, setErrorCount } = props
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({})

  // Initialize errors on mount
  useEffect(() => {
    if (obtainingMethod) {
      const initialErrors: { [key: string]: boolean } = {}

      obtainingMethod.dataFields?.forEach((field) => {
        if (field.regexp) {
          initialErrors[field.name] = true // Assume invalid initially
        }
      })

      setErrors(initialErrors)
      setErrorCount(Object.values(initialErrors).filter((error) => error).length)
    }
  }, [obtainingMethod, setErrorCount])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, regex?: string) => {
    const { name, value } = e.target
    let isValid = true

    // Validate if regex is provided
    if (regex && !new RegExp(regex).test(value)) {
      isValid = false
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: !isValid,
    }))

    // Update error count
    const newErrorCount = Object.values(errors).filter((error) => error).length + (!isValid ? 1 : -1)
    setErrorCount(newErrorCount)

    if (isValid) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }))
    }
  }

  return (
    obtainingMethod && (
      <>
        <Card className="flex flex-col gap-2 p-4 text-sm opacity-80">
          <h4 className="text-md flex gap-2 font-semibold">
            <PackageIcon /> Obtaining Method:{' '}
            <span className="text-md flex gap-2 font-semibold">{obtainingMethod.title}</span>
          </h4>
          <p>{obtainingMethod.description}</p>
        </Card>

        {obtainingMethod.dataFields?.map((field) => (
          <HoverCard key={field.id}>
            <HoverCardTrigger>
              <Input
                onChange={(e) => handleChange(e, field.regexp)}
                type={field.type}
                name={field.name}
                required={field.required}
                placeholder={field.label}
                className={errors[field.name] ? 'border-red-500' : ''}
              />
            </HoverCardTrigger>
            <HoverCardContent align="start" className="hidden">
              {errors[field.name] ? 'Invalid input' : 'Demo. Will be updated near future'}
            </HoverCardContent>
          </HoverCard>
        ))}
      </>
    )
  )
}
