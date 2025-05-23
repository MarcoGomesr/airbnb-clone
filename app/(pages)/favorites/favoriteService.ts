import { prisma } from '@/shared/lib/prisma'

const favoriteService = {
  async create(homeId: string, userId: string) {
    return await prisma.favorite.create({
      data: {
        homeId,
        userId
      }
    })
  },

  async delete(favoriteId: string, userId: string) {
    if (!favoriteId || !userId) {
      throw new Error('Missing required fields')
    }

    return await prisma.favorite.delete({
      where: {
        id: favoriteId,
        userId: userId
      }
    })
  }
}

export default favoriteService
