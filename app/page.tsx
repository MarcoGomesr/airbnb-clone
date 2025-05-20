import MapFilterItem from '@/components/MapFilterItem'
import { prisma } from '@/lib/prisma'
import { ListeningCards } from './ListeningCards'

async function getHomes() {
  const data = await prisma.home.findMany({
    where: {
      addedCategory: true,
      addedLocation: true,
      addedDescription: true
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

export default async function Home() {
  const homes = await getHomes()
  return (
    <div className="container mx-auto px-5 lg:px-10">
      <MapFilterItem />
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
    </div>
  )
}
