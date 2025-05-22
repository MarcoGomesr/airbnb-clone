import NoItems from '../../NoItems'
import { ListeningCards } from '../../ListeningCards'
import { ReservationWithHome } from './types'

type ReservationsViewProps = {
  reservations: ReservationWithHome[]
}

export default function ReservationsView({
  reservations
}: ReservationsViewProps) {
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
