import { prisma } from '@/shared/lib/prisma'

const locationService = {
  async updateLocation(data: { homeId: string; country: string }) {
    return await prisma.home.update({
      where: {
        id: data.homeId
      },
      data: {
        country: data.country,
        addedLocation: true
      }
    })
  }
}

export default locationService
