import { prisma } from '@/shared/lib/prisma'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import NoItems from '../NoItems'
import { ListeningCards } from '../ListeningCards'

async function getFavorites(userId: string) {
  const favorites = await prisma.favorite.findMany({
    where: {
      userId: userId
    },
    select: {
      Home: {
        select: {
          id: true,
          photo: true,
          Favorite: true,
          price: true,
          country: true,
          description: true
        }
      }
    }
  })

  return favorites
}

export default async function Favorites() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  const favorites = await getFavorites(user?.id as string)
  console.log(favorites)
  return (
    <section className="container mx-auto px-5 lg:px-10 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight">Your Favorites</h2>
      {favorites.length === 0 ? (
        <NoItems
          title="No favorites"
          description="Add some homes to your favorites"
        />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-8 mt-8">
          {favorites.map((favorite) => (
            <ListeningCards
              key={favorite.Home.id}
              description={favorite.Home.description as string}
              imagePath={favorite.Home.photo as string}
              location={favorite.Home.country as string}
              price={favorite.Home.price as number}
              userId={user?.id as string}
              isInFavoriteList={
                (favorite.Home?.Favorite.length as number) > 0 ? true : false
              }
              favoriteId={favorite.Home?.Favorite[0].id as string}
              homeId={favorite.Home.id}
              pathName="favorites"
            />
          ))}
        </div>
      )}
    </section>
  )
}
