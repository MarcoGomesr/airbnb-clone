import { Suspense } from 'react'
import { unstable_noStore as noStore } from 'next/cache'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

import { prisma } from '@/shared/lib/prisma'

import MapFilterItem from '@/shared/components/general/MapFilterItem'
import NoItems from './NoItems'
import SkeletonCard from './components/SkeletonCard'
import { ListeningCards } from './ListeningCards'

async function getHomes({
  searchParams,
  userId
}: {
  searchParams?: {
    filter?: string
    country?: string
    guests?: string
    bedrooms?: string
    bathrooms?: string
  }
  userId: string | undefined
}) {
  noStore()
  const data = await prisma.home.findMany({
    where: {
      addedCategory: true,
      addedLocation: true,
      addedDescription: true,
      categoryName: searchParams?.filter ?? undefined,
      country: searchParams?.country ?? undefined,
      guests: searchParams?.guests ?? undefined,
      bedrooms: searchParams?.bedrooms ?? undefined,
      bathrooms: searchParams?.bathrooms ?? undefined
    },
    select: {
      id: true,
      description: true,
      price: true,
      country: true,
      photo: true,
      Favorite: {
        where: {
          userId: userId ?? undefined
        }
      }
    }
  })
  return data
}

export default function Home({
  searchParams
}: {
  searchParams?: { filter?: string }
}) {
  return (
    <div className="container mx-auto px-5 lg:px-10">
      <MapFilterItem />

      <Suspense key={searchParams?.filter} fallback={<SkeletonLoading />}>
        <ShowItems searchParams={searchParams ?? {}} />
      </Suspense>
    </div>
  )
}

async function ShowItems({
  searchParams
}: {
  searchParams: {
    filter?: string
    country?: string
    guests?: string
    bedrooms?: string
    bathrooms?: string
  }
}) {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  const homes = await getHomes({ searchParams: searchParams, userId: user?.id })

  return (
    <>
      {homes.length === 0 ? (
        <NoItems
          title="Sorry no listings for this category found..."
          description=" Please check other category or create your own listing!"
        />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-3 gap-8 mt-8">
          {homes.map((home) => (
            <ListeningCards
              key={home.id}
              imagePath={home.photo as string}
              description={home.description as string}
              price={home.price as number}
              location={home.country as string}
              userId={user?.id}
              favoriteId={home.Favorite[0]?.id}
              isInFavoriteList={home.Favorite.length > 0 ? true : false}
              homeId={home.id}
              pathName="/"
            />
          ))}
        </div>
      )}
    </>
  )
}

function SkeletonLoading() {
  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  )
}
