// page.tsx
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import homeService from './homeService'
import { SearchParams } from './homeTypes'
import NoItems from './components/NoItems';
import MapFilterItems from '@/shared/components/general/MapFilterItem';
import ListeningCard from '@/shared/components/general/ListeningCard';
import { Suspense } from 'react';
import SkeletonLoading from './components/SkeletonLoading';

export default async function HomePage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const searchParamsResult = await searchParams
  return (
    <div className="container mx-auto px-5 lg:px-10">
    <MapFilterItems />

    <Suspense key={searchParamsResult?.filter} fallback={<SkeletonLoading />}>
      <ShowItems searchParams={searchParamsResult} />
    </Suspense>
</div>)
}

async function ShowItems({ searchParams }: { searchParams: SearchParams}) {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  const homes = await homeService.getHomeService(searchParams, user?.id)

  return (
    <>
      {homes.length === 0 ? (
        <NoItems
          description="Please check a other category or create your own listing!"
          title="Sorry no listings found for this category..."
        />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
          {homes.map((item) => (
            <ListeningCard
              key={item.id}
              description={item.description as string}
              imagePath={item.photo as string}
              location={item.country as string}
              price={item.price as number}
              userId={user?.id}
              favoriteId={item.Favorite[0]?.id}
              isInFavoriteList={item.Favorite.length > 0 ? true : false}
              homeId={item.id}
              pathName="/"
            />
          ))}
        </div>
      )}
    </>
  );
}