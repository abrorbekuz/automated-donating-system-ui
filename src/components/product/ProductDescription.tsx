import React from 'react'
import { Card, CardContent } from 'src/components/ui/card'
import { ServiceType } from 'src/types/serviceKindType'
import { Expandable, ExpandableContent, ExpandableTrigger } from '../expandable'
import { Button } from '../ui/button'

interface ProductDescriptionProps {
  service: ServiceType | undefined
}

export const ProductDescription: React.FC<ProductDescriptionProps> = ({ service }) => {
  return (
    <div className="flex items-center pb-4 md:px-0">
      <Card className="w-full rounded-none md:rounded-2xl">
        <CardContent className="flex flex-col gap-8 p-3 md:p-6">
          <div className="flex w-full flex-col gap-4">
            <div className="text-xl font-semibold">Description</div>
            <div className="relative">
              <Expandable>
                <ExpandableContent collapsedHeight="110px">
                  <div className="font-poppins whitespace-pre-wrap text-lg">{service?.description}</div>
                </ExpandableContent>
                <ExpandableTrigger className="flex w-full justify-end">
                  <Button variant="secondary">Show / Hide</Button>
                </ExpandableTrigger>
              </Expandable>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
