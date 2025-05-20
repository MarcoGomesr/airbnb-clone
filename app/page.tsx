import { Suspense } from 'react'
import MapFilterItem from '@/components/MapFilterItem'
import { prisma } from '@/lib/prisma'
import { ListeningCards } from './ListeningCards'
import SkeletonCard from './SkeletonCard'
import NoItems from './NoItems'

async function getHomes({
  searchParams
}: {
  searchParams?: { filter?: string }
}) {
  const data = await prisma.home.findMany({
    where: {
      addedCategory: true,
      addedLocation: true,
      addedDescription: true,
      categoryName: searchParams?.filter ?? undefined
    },
    select: {
      id: true,
      description: true,
      price: true,
      country: true,
      photo: true
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
  searchParams: { filter?: string }
}) {
  const homes = await getHomes({ searchParams: searchParams })

  return (
    <>
      {homes.length === 0 ? (
        <NoItems />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-3 gap-8 mt-8">
          {homes.map((home) => (
            <ListeningCards
              key={home.id}
              imagePath={home.photo as string}
              description={home.description as string}
              price={home.price as number}
              location={home.country as string}
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
    </div>
  )
}
