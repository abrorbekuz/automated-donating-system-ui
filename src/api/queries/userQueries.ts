// src/api/queries/userQueries.ts
import { gql } from '@apollo/client'

export const GET_CURRENT_USER = gql`
  {
    currentUser {
      user {
        username
        email
        firstName
        lastName
      }
      image
      starPoints
      verified
    }
  }
`
