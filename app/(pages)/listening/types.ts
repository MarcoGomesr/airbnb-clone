export type HomeWithFavorite = {
  id: string
  description: string | null
  country: string | null
  photo: string | null
  price: number | null
  Favorite: {
    userId: string | null
    id: string
    createdAt: Date
    updatedAt: Date
    homeId: string | null
  }[]
}
