// src/api/queries/userQueries.ts
import { gql } from '@apollo/client'

export const GET_CATEGORIES = gql`
  {
    categories {
      title
      icon
      slug
      availableTags
      services {
        title
        icon
        slug
      }
    }
  }
`

export const GET_CATEGORY = gql`
  {
    categories {
      title
      icon
      slug
      availableTags
      services {
        title
        icon
        slug
      }
    }
  }
`
