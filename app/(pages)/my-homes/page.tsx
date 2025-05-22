import { prisma } from '@/shared/lib/prisma'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'
import NoItems from '../NoItems'
import { ListeningCards } from '../ListeningCards'

async function getHomes(userId: string) {
  const homes = await prisma.home.findMany({
    where: {
      userId,
      addedCategory: true,
      addedLocation: true,
      addedDescription: true
    },
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
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
  return homes
}

export default async function MyHomes() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user) {
    redirect('/')
  }

  const listing = await getHomes(user.id)
  return (
    <section className="container mx-auto px-5 lg:px-10 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight">Your Homes</h2>
      {listing.length === 0 ? (
        <NoItems
          description="Please add a home to your list"
          title="You don't have any homes listed"
        />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-8 mt-8">
          {listing.map((item) => (
            <ListeningCards
              key={item.id}
              imagePath={item.photo as string}
              homeId={item.id}
              price={item.price as number}
              description={item.description as string}
              location={item.country as string}
              userId={user.id}
              isInFavoriteList={item.Favorite.length > 0 ? true : false}
              favoriteId={item.Favorite[0]?.id}
              pathName="/my-homes"
            />
          ))}
        </div>
      )}
    </section>
  )
}
