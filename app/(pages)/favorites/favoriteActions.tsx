'use server'

import { revalidatePath } from 'next/cache'

import favoriteService from './favoriteService'

export async function addToFavorites(formData: FormData) {
  const homeId = formData.get('homeId') as string
  const userId = formData.get('userId') as string
  const pathName = formData.get('pathName') as string

  await favoriteService.create(homeId, userId)
  revalidatePath(pathName)
}

export async function deleteFavorite(formData: FormData) {
  const favoriteId = formData.get('favoriteId') as string
  const pathName = formData.get('pathName') as string
  const userId = formData.get('userId') as string

  await favoriteService.delete(favoriteId, userId)
  revalidatePath(pathName)
}
