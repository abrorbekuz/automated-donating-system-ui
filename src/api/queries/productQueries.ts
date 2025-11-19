// src/api/queries/userQueries.ts
import { gql } from '@apollo/client'

export const GET_PRODUCTS = gql`
  query GetProducts($first: Int!, $after: String, $service: String, $title: String) {
    products(first: $first, after: $after, service: $service, title: $title) {
      edges {
        node {
          title
          tag
          icon
          image
          price
          service {
            slug
            title
          }
          currency
          discount
          discountType
          quantityCap
          oneTime
          createdAt
          updatedAt
          published
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`

export const GET_PRODUCT = gql`
  query GetService($slug: String!) {
    service(slug: $slug) {
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

      serverUrl {
        name
        url
        verified
      }

      products {
        title
        tag
        icon
        image
        price
        currency
        discount
        discountType
        quantityCap
        oneTime
        createdAt
        updatedAt
        published
      }
    }
  }
`
