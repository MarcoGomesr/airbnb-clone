'use server'

import { redirect } from 'next/navigation'

import HomeDetailsService from './homeDetailService'

export async function createReservation(formData: FormData) {
  const userId = formData.get('userId') as string
  const homeId = formData.get('homeId') as string

  const startDate = formData.get('startDate') as string
  const endDate = formData.get('endDate') as string

  await HomeDetailsService.createReservation({
    userId,
    homeId,
    startDate,
    endDate
  })

  return redirect('/')
}
