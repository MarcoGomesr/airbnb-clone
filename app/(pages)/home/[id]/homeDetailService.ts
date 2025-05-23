import { prisma } from '@/shared/lib/prisma'

const HomeDetailsService = {
  async getHome(homeId: string) {
    return await prisma.home.findUnique({
      where: {
        id: homeId
      },
      select: {
        photo: true,
        description: true,
        guests: true,
        bedrooms: true,
        bathrooms: true,
        title: true,
        price: true,
        categoryName: true,
        country: true,
        Reservation: {
          where: {
            homeId: homeId
          },
          select: {
            startDate: true,
            endDate: true
          }
        },
        User: {
          select: {
            profilePicture: true,
            firstName: true,
            lastName: true
          }
        }
      }
    })
  },

  async createReservation(
    data: {
      userId: string
      homeId: string
      startDate: string
      endDate: string
    }
  ) {
    return await prisma.reservation.create({
      data: {
        userId: data.userId,
        homeId: data.homeId,
        startDate: data.startDate,
        endDate: data.endDate
      }
    })
  }
}

export default HomeDetailsService
