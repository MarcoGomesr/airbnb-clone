import { Favorite } from '@prisma/client'

export type SearchParams = {
  filter?: string
  country?: string
  guests?: string
  bedrooms?: string
  bathrooms?: string
}

export type Home = {
  id: string
  photo: string | null
  description: string | null
  price: number | null
  country: string | null
  Favorite: Favorite[]
}
