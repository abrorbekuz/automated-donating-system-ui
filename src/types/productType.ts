import { DocumentNode } from '@apollo/client'
import { ServiceType } from './serviceKindType'
import { PageInfo } from './wrapperPager'

interface ProductType {
  id: number
  title: string
  tag: string
  image: string
  icon: string
  price: number
  currency: string
  discountedPrice: number
  discount: number
  discountType: string
  quantityCap: number
  oneTime: boolean
  createdAt: string
  updatedAt: string
  published: boolean

  service: ServiceType
}

interface ProductTagType {
  tag: string
  items: ProductType[]
}

type ProductsResponse = {
  products: {
    edges: { node: ProductType }[]
    pageInfo: PageInfo
  }
}

interface InputField {
  name: string
  title: string
  type: string
  isRequired: boolean
  minLength?: number
  maxLength?: number
}

interface ServiceConfig {
  query: DocumentNode
  inputs: InputField[]
  handleResponse: (response: Record<string, string>) => string
}

export { ProductType, ProductTagType, ProductsResponse, InputField, ServiceConfig }
