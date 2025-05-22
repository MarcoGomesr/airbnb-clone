import { prisma } from '@/shared/lib/prisma'
import { ReservationWithHome } from './types'

const reservationService = {
  getUserReservations(userId: string): Promise<ReservationWithHome[]> {
    return prisma.reservation.findMany({
      where: { userId },
      select: {
        Home: {
          select: {
            id: true,
            country: true,
            photo: true,
            description: true,
            price: true,
            Favorite: {
              where: { userId }
            }
          }
        }
      }
    })
  }
}

export default reservationService
