import { prisma } from '@/shared/lib/prisma'
import { supabase } from '@/shared/lib/suparbase'

const createService = {
  async findLatestHome(userId: string) {
    return await prisma.home.findFirst({
      where: {
        userId
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  },

  async createNewHome(userId: string) {
    return await prisma.home.create({
      data: {
        userId
      }
    })
  },

  async updateCategory(homeId: string, categoryName: string) {
    return await prisma.home.update({
      where: {
        id: homeId
      },
      data: {
        categoryName,
        addedCategory: true
      }
    })
  },

  async updateDescription(
    homeId: string,
    data: {
      title: string
      description: string
      price: number
      guests: string
      bedrooms: string
      bathrooms: string
      photo: string
    }
  ) {
    return await prisma.home.update({
      where: {
        id: homeId
      },
      data: {
        ...data,
        addedDescription: true
      }
    })
  },

  async updateLocation(homeId: string, country: string) {
    return await prisma.home.update({
      where: {
        id: homeId
      },
      data: {
        country,
        addedLocation: true
      }
    })
  },

  async uploadImage(image: File) {
    return await supabase.storage
      .from('images')
      .upload(`${image.name}-${new Date().getTime()}`, image, {
        cacheControl: '2592000',
        contentType: 'image/png'
      })
  }
}

export default createService
