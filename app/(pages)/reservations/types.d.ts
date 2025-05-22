import { Prisma } from '@prisma/client'

type ReservationWithHome = Prisma.ReservationGetPayload<{
  select: {
    Home: {
      select: {
        id: true
        country: true
        photo: true
        description: true
        price: true
        Favorite: {
          where: { userId: string }
        }
      }
    }
  }
}>
