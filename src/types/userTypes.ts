interface User {
  user: {
    id: number
    username: string
    email: string
    firstName: string
    lastName: string
  }
  image: string
  starPoints: number
  verified: boolean
}

export { User }
