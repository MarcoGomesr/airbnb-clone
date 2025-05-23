import { prisma } from '@/shared/lib/prisma'

export class UpdateLocationUseCase {
  async execute(data: { homeId: string; country: string }) {
    if (!data.homeId || !data.country) {
      throw new Error('Missing required fields')
    }

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
