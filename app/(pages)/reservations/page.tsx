import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'

import ReservationsView from './ReservationsView'
import getUserReservations from './getReservations'

export default async function ReservationPage() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user.id) return redirect('/')

  const reservations = await getUserReservations(user.id)
  return <ReservationsView reservations={reservations} userId={user.id} />
}
