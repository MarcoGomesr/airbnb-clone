'use server'

import { redirect } from 'next/navigation'

import { UpdateLocationUseCase } from './updateLocation'

export async function createLocation(formData: FormData) {
  const homeId = formData.get('id') as string
  const country = formData.get('country') as string

  const updateLocationUseCase = new UpdateLocationUseCase()
  await updateLocationUseCase.execute({ homeId, country })

  return redirect('/')
}
