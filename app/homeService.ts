import { prisma } from '@/shared/lib/prisma'
import { Home, SearchParams } from './home.types'

const homeService = {
  async getHomeService(
    searchParams: SearchParams,
    userId: string | undefined
  ): Promise<Home[]> {
    return await prisma.home.findMany({
      where: {
        addedCategory: true,
        addedLocation: true,
        addedDescription: true,
        categoryName: searchParams?.filter ?? undefined,
        country: searchParams?.country ?? undefined,
        guests: searchParams?.guests ?? undefined,
        bedrooms: searchParams?.bedrooms ?? undefined,
        bathrooms: searchParams?.bathrooms ?? undefined
      },
      select: {
        id: true,
        description: true,
        price: true,
        country: true,
        photo: true,
        Favorite: {
          where: {
            userId: userId ?? undefined
          }
        }
      }
    })
  }
}

export default homeService
