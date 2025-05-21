import { prisma } from '@/lib/prisma'
import { ListeningCards } from '../ListeningCards'
import NoItems from '../NoItems'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'

async function getReservation(userId: string) {
  const data = await prisma.reservation.findMany({
    where: {
      userId
    },
    select: {
      Home: {
        select: {
          id: true,
          country: true,
          photo: true,
          description: true,
          price: true,
          Favorite: {
            where: {
              userId
            }
          }
        }
      }
    }
  })
  return data
}

export default async function ReservationPage() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user.id) return redirect('/')

  const reservations = await getReservation(user.id)
  return (
    <section className="container mx-auto px-5 lg:px-10 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight">
        Your Reservation
      </h2>
      {reservations.length === 0 ? (
        <NoItems title="No Reservations" description="Add some Reservations" />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-8 mt-8">
          {reservations.map((reservation) => (
            <ListeningCards
              key={reservation.Home.id}
              description={reservation.Home.description as string}
              imagePath={reservation.Home.photo as string}
              location={reservation.Home.country as string}
              price={reservation.Home.price as number}
              userId={user?.id as string}
              isInFavoriteList={
                (reservation.Home?.Favorite.length as number) > 0 ? true : false
              }
              favoriteId={reservation.Home?.Favorite[0].id as string}
              homeId={reservation.Home.id}
              pathName="favorites"
            />
          ))}
        </div>
      )}
    </section>
  )
}
