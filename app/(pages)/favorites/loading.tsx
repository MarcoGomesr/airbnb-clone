import SkeletonCard from '@/shared/components/general/SkeletonCard'

export default function FavoritesLoading() {
  return (
    <div className="container mx-auto px-5 lg:px-10 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight">Your Favorites</h2>
      <div className="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-8 mt-8">
        <SkeletonCard />
      </div>
    </div>
  )
}
