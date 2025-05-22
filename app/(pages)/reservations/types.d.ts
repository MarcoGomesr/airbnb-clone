import { Reservation, Home, Favorite, User } from '@prisma/client'

// This gives you the complete Reservation type with all fields and relations
type FullReservation = Reservation & {
  Home: Home & {
    Favorite: Favorite[]
    User: User | null
  }
  User: User | null
}
