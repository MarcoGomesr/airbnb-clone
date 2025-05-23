'use server'

import { redirect } from 'next/navigation'
import createService from './createService'

export async function createAirbnbHome({ userId }: { userId: string }) {
  const data = await createService.findLatestHome(userId)

  if (data === null) {
    const data = await createService.createNewHome(userId)
    return redirect(`/create/${data.id}/structure`)
  } else if (
    !data.addedCategory &&
    !data.addedDescription &&
    !data.addedLocation
  ) {
    return redirect(`/create/${data.id}/structure`)
  } else if (data.addedCategory && !data.addedDescription) {
    return redirect(`/create/${data.id}/description`)
  } else if (
    data.addedCategory &&
    data.addedDescription &&
    !data.addedLocation
  ) {
    return redirect(`/create/${data.id}/address`)
  } else if (
    data.addedCategory &&
    data.addedDescription &&
    data.addedLocation
  ) {
    const data = await createService.createNewHome(userId)
    return redirect(`/create/${data.id}/structure`)
  }
}

export async function createCategoryPage(formData: FormData) {
  const data = await createService.updateCategory(
    formData.get('id') as string,
    formData.get('categoryName') as string
  )

  return redirect(`/create/${data.id}/description`)
}

export async function createDescriptionPage(formData: FormData) {
  const homeId = formData.get('id') as string
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const price = formData.get('price')
  const image = formData.get('image') as File
  const guests = formData.get('guests') as string
  const bedrooms = formData.get('bedrooms') as string
  const bathrooms = formData.get('bathrooms') as string

  // Upload image to Supabase
  const { data: imageData } = await createService.uploadImage(image)

  if (!imageData?.path) {
    throw new Error('Failed to upload image')
  }

  // Update home in database
  const data = await createService.updateDescription(homeId, {
    title,
    description,
    price: Number(price),
    guests,
    bedrooms,
    bathrooms,
    photo: imageData.path
  })

  if (!data) {
    throw new Error('Failed to update home information')
  }

  return redirect(`/create/${homeId}/address`)
}

export async function createLocation(formData: FormData) {
  const homeId = formData.get('id') as string
  const country = formData.get('country') as string

  const data = await createService.updateLocation(homeId, country)

  return redirect('/')
}
