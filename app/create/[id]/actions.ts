'use server'

import { prisma } from '@/lib/prisma'
import { supabase } from '@/lib/suparbase'
import { redirect } from 'next/navigation'

export async function createAirbnbHome({ userId }: { userId: string }) {
  const data = await prisma.home.findFirst({
    where: {
      userId
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  if (data === null) {
    const data = await prisma.home.create({
      data: {
        userId
      }
    })

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
    const data = await prisma.home.create({
      data: {
        userId
      }
    })

    return redirect(`/create/${data.id}/structure`)
  }
}

export async function createCategoryPage(formData: FormData) {
  const data = await prisma.home.update({
    where: {
      id: formData.get('id') as string
    },
    data: {
      categoryName: formData.get('categoryName') as string,
      addedCategory: true
    }
  })

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
  const { data: imageData } = await supabase.storage
    .from('images')
    .upload(`${image.name}-${new Date().getTime()}`, image, {
      cacheControl: '2592000',
      contentType: 'image/png'
    })

  // Update home in database
  const data = await prisma.home.update({
    where: {
      id: homeId
    },
    data: {
      title,
      description,
      price: Number(price),
      guests,
      bedrooms,
      bathrooms,
      photo: imageData?.path,
      addedDescription: true
    }
  })

  if (!data) {
    throw new Error('Failed to update home information')
  }

  return redirect(`/create/${homeId}/address`)
}

export async function createLocation(formData: FormData) {
  const homeId = formData.get('id') as string
  const country = formData.get('country') as string

  const data = await prisma.home.update({
    where: {
      id: homeId
    },
    data: {
      country,
      addedLocation: true
    }
  })

  return redirect('/')
}
