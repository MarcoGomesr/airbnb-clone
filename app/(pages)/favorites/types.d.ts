export type FavoritesViewProps = {
  favorites: FavoriteWithHome[]
  userId: string
}

export type FavoriteWithHome = {
  Home: {
    id: string
    photo: string
    Favorite: Favorite[]
    price: number
    country: string
    description: string
  }
}
