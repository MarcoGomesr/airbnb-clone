import { prisma } from '@/shared/lib/prisma'

const locationService = {
  async updateLocation(homeId: string, country: string) {
    if (!homeId || !country) {
      throw new Error('Missing required fields')
    }

    return await prisma.home.update({
      where: {
        id: homeId
      },
      data: {
        country,
        addedLocation: true
      }
    })
  }
}

export default locationService
