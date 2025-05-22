'use server'

import { prisma } from '@/shared/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function addToFavorites(formData: FormData) {
  const homeId = formData.get('homeId') as string
  const userId = formData.get('userId') as string
  const pathName = formData.get('pathName') as string

  const data = await prisma.favorite.create({
    data: {
      homeId,
      userId
    }
  })
  revalidatePath(pathName)
}

export async function deleteFavorite(formData: FormData) {
  const favoriteId = formData.get('favoriteId') as string
  const pathName = formData.get('pathName') as string
  const userId = formData.get('userId') as string

  if (!favoriteId || !userId) {
    console.log('favoriteId', favoriteId)
    console.log('userId', userId)
    throw new Error('Missing required fields')
  }

  const data = await prisma.favorite.delete({
    where: {
      id: favoriteId,
      userId: userId
    }
  })

  revalidatePath(pathName)
}
