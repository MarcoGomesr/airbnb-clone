import { prisma } from '@/shared/lib/prisma'

import { FavoriteWithHome } from './favorite.types'

const favoriteService = {
  async getFavoriteService(userId: string): Promise {
    const favorites = await prisma.favorite.findMany({
      where: {
        userId: userId
      },
      select: {
        Home: {
          select: {
            id: true,
            photo: true,
            Favorite: true,
            price: true,
            country: true,
            description: true
          }
        }
      }
    })
    return favorites.filter((f): f is FavoriteWithHome => f.Home !== null)
  },

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
