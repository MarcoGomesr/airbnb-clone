import { prisma } from '@/shared/lib/prisma'

import { ReservationWithHome } from './ReservationTypes'

const reservationService = {
  async getUserReservations(userId: string): Promise<ReservationWithHome[]> {
    return await prisma.reservation.findMany({
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
