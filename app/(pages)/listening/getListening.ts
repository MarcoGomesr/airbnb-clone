import { prisma } from '@/shared/lib/prisma'

const ListeningService = {
  async getHomes(userId: string) {
    return await prisma.home.findMany({
      where: {
        userId,
        addedCategory: true,
        addedLocation: true,
        addedDescription: true
      },
      select: {
        id: true,
        country: true,
        photo: true,
        description: true,
        price: true,
        Favorite: {
          where: {
            userId
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }
}

export default ListeningService
