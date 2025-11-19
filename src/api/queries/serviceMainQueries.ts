// src/api/queries/userQueries.ts
import { gql } from '@apollo/client'

export const GET_SERVICE_MAINS = gql`
  query GetServiceMains($first: Int!, $after: String, $title: String, $category: String) {
    serviceTypes(first: $first, after: $after, title: $title, category: $category) {
      edges {
        node {
          title
          category
          icon
          banner
          slug
          tags
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`

export const GET_SERVICE_MAIN = gql`
  query GetServiceMain($slug: String!) {
    serviceType(slug: $slug) {
      title
      category
      icon
      banner
      slug
      tags
    }
  }
`
