import { prisma } from '@/shared/lib/prisma'
import { FavoriteWithHome } from './types'

const favoriteService = {
  async getFavoriteService(userId: string): Promise<FavoriteWithHome[]> {
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
  }
}

export default favoriteService
