import reservationService from './reservationService'

export default async function getUserReservations(userId: string) {
  return reservationService.getUserReservations(userId)
}
