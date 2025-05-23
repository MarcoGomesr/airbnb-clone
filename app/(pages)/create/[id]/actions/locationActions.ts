'use server'

import { redirect } from 'next/navigation'

import locationService from '../address/locationService'

export async function createLocation(formData: FormData) {
  const homeId = formData.get('id') as string
  const country = formData.get('country') as string

  if (!homeId || !country) {
    throw new Error('Missing required fields')
  }

  await locationService.updateLocation(homeId, country)

  return redirect('/')
}
