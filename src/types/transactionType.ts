import { ProductType } from './productType'
import { ServiceType } from './serviceKindType'
import { PageInfo } from './wrapperPager'

interface TransactionType {
  user: {
    id: number
    username: string
    email: string
    firstName: string
    lastName: string
  }

  starsUsed: number
  amount: number
  currency: string

  products: ProductType[]

  status: string
  service: ServiceType
  outputs: string
  paymentLink: string
  paymentMethod: string

  createdAt: string
  updatedAt: string
}

interface CreateTransaction {
  serviceSlug: string
  productsIds: number[]
  amount: number
  inputs: string
  currency: string
  starsUsed: number
  paymentMethod: string
}

interface CreateTransactionResponse {
  createTransaction: {
    transaction: {
      id: string
      amount: number
      currency: string
      paymentMethod: string
      outputs: string
      status: string
    }
    updatedStarPoints: number
    transactionId: number
  }
}

type TransactionResponse = {
  transactions: {
    edges: { node: TransactionType }[]
    pageInfo: PageInfo
  }
}

export { TransactionResponse, TransactionType, CreateTransaction, CreateTransactionResponse }
