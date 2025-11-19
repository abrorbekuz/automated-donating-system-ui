// src/api/queries/userQueries.ts
import { gql } from '@apollo/client'

export const GET_SERVICES = gql`
  query GetServices($first: Int!, $after: String, $service: String, $author: String, $tag: String) {
    services(first: $first, after: $after, service: $service, author: $author, tag: $tag) {
      edges {
        node {
          id
          title
          serviceType {
            title
            icon
            slug
            category
          }
          slug
          images
          tag

          priceTag {
            price
            currency
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`

export const GET_SERVICE = gql`
  query GetService($slug: String!, $cc: String) {
    service(slug: $slug, cc: $cc) {
      title
      slug
      location
      availability
      images
      tag
      description
      iconScale
      serviceType {
        title
        icon
        slug
        category
      }
      author {
        user {
          username
          email
          firstName
        }
        image
        verified
      }

      successUrl

      products {
        id
        title
        tag
        icon
        image
        price
        currency
        discountedPrice
        oneTime
        createdAt
        updatedAt
        published
      }

      obtainingMethod {
        id
        title
        description

        dataFields {
          id
          label
          name
          type
          required

          regexp
        }
      }

      couponActivated
    }
  }
`
export const SERVICES_CONFIG = {
  'mobile-legends': {
    query: gql`
      query CheckMobileLegends($userId: String!, $zoneId: String!) {
        checkMobileLegends(userId: $userId, zoneId: $zoneId)
      }
    `,
    inputs: [
      { name: 'userId', title: 'User ID', type: 'text', isRequired: true, minLength: 10, maxLength: 10 },
      { name: 'zoneId', title: 'Zone ID', type: 'text', isRequired: true, minLength: 5, maxLength: 5 },
    ],
    handleResponse: (response: string) => (response !== 'null' ? `Username: ${response}` : 'User not found.'),
  },
  // accountCheck: {
  //   query: gql`
  //     query CheckAccount($email: String!, $phone: String!) {
  //       checkAccount(email: $email, phone: $phone)
  //     }
  //   `,
  //   inputs: [
  //     { name: 'email', title: 'Email', type: 'email', isRequired: true },
  //     { name: 'phone', title: 'Phone', type: 'text', isRequired: true },
  //   ],
  //   handleResponse: (response: string) => (response ? `Account verified: ${response}` : 'Account not found.'),
  // },
}
