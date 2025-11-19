// src/api/queries/userQueries.ts
import { gql } from '@apollo/client'

export const GET_TRANSACTIONS = gql`
  query GetTransactions($first: Int!, $after: String, $user: String) {
    transactions(first: $first, after: $after, user: $user) {
      edges {
        node {
          service {
            slug
            title
            images
          }

          products {
            title
          }

          amount
          currency
          status
          outputs
          starsUsed
          paymentLink
          paymentMethod
          createdAt
          updatedAt
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`

// export const GET_PRODUCT = gql`
//   query GetService($slug: String!) {
//     service(slug: $slug) {
//       title
//       slug
//       location
//       availability
//       images
//       tag
//       description
//       iconScale
//       serviceType {
//         title
//         icon
//         slug
//         category
//       }
//       author {
//         user {
//           username
//           email
//           firstName
//         }
//         image
//         verified
//       }

//       serverUrl {
//         name
//         url
//         verified
//       }

//       products {
//         title
//         tag
//         icon
//         price
//         currency
//         discount
//         discountType
//         quantityCap
//         oneTime
//         createdAt
//         updatedAt
//         published
//       }
//     }
//   }
// `

export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction(
    $serviceSlug: String!
    $productsIds: [ID!]!
    $amount: Int!
    $inputs: JSONString!
    $currency: String!
    $starsUsed: Int!
    $paymentMethod: String!
  ) {
    createTransaction(
      serviceSlug: $serviceSlug
      productsIds: $productsIds
      amount: $amount
      inputs: $inputs
      currency: $currency
      starsUsed: $starsUsed
      paymentMethod: $paymentMethod
    ) {
      transaction {
        id
        outputs
        amount
        currency
        paymentMethod
      }
      updatedStarPoints
      transactionId
    }
  }
`
