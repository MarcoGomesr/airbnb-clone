'use server'

import { prisma } from '@/shared/lib/prisma'
import { redirect } from 'next/navigation'

export async function createReservation(formData: FormData) {
  const userId = formData.get('userId') as string
  const homeId = formData.get('homeId') as string

  const startDate = formData.get('startDate') as string
  const endDate = formData.get('endDate') as string

  const data = await prisma.reservation.create({
    data: {
      userId,
      homeId,
      startDate,
      endDate
    }
  })

  return redirect('/')
}
