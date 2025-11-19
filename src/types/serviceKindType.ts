import { ProductType } from './productType'
import { User } from './userTypes'
import { PageInfo } from './wrapperPager'

interface DataFieldType {
  id: number
  label: string
  name: string
  type: string
  required: boolean
  regexp: string
}

interface ObtainingMethodType {
  id: number
  title: string
  description: string
  dataFields: DataFieldType[]
}

interface ServiceType {
  title: string
  slug: string
  tag: string
  location: string
  availability: number

  author: User
  images: string[]
  iconScale: number

  successUrl: string

  serviceType: ServiceMainType
  obtainingMethod: ObtainingMethodType

  description: string
  products: ProductType[]
  couponActivated: boolean
}

interface ServicesType {
  id: number
  title: string
  slug: string
  tag: string
  location: string
  availability: number

  author: User
  images: string[]

  serviceType: ServiceMainType

  description: string
  priceTag: ProductType
}

type ServicesResponse = {
  services: {
    edges: { node: ServicesType }[]
    pageInfo: PageInfo
  }
}

interface ServiceMainType {
  title: string
  category: string
  icon: string
  banner: string
  slug: string
  tags: string
  services?: ServiceType[]
}

type ServiceMainsResponse = {
  serviceTypes: {
    edges: { node: ServiceMainType }[]
    pageInfo: PageInfo
  }
}

interface ServiceParentType {
  service: ServiceType
}

export {
  ServiceType,
  ServicesType,
  ServiceMainType,
  ServiceParentType,
  ServicesResponse,
  ServiceMainsResponse,
  DataFieldType,
  ObtainingMethodType,
}
