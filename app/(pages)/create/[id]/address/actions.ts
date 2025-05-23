'use server'

import { redirect } from 'next/navigation'

import locationService from './locationService'

export async function createLocation(formData: FormData) {
  const homeId = formData.get('id') as string
  const country = formData.get('country') as string

  await locationService.updateLocation(homeId, country)

  return redirect('/')
}
