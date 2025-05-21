import { useCountries } from '@/lib/getCountries'
import {
  AddToFavoritesButton,
  RemoveFromFavoritesButton
} from '@/components/SubmitButton'
import Image from 'next/image'
import Link from 'next/link'
import { addToFavorites, deleteFavorite } from './favorites/actions'

type ListeningCardsProps = {
  imagePath: string
  description: string
  price: number
  location: string
  userId: string | undefined
  isInFavoriteList: boolean
  favoriteId: string | undefined
  homeId: string
  pathName: string
}

export function ListeningCards({
  imagePath,
  description,
  price,
  location,
  userId,
  isInFavoriteList,
  favoriteId,
  homeId,
  pathName
}: ListeningCardsProps) {
  const { getCountryByValue } = useCountries()

  const country = getCountryByValue(location)

  return (
    <div className="flex flex-col">
      <div className="relative h-72">
        <Image
          src={`https://smhfxsesicpuwwivadui.supabase.co/storage/v1/object/public/images/${imagePath}`}
          alt={description}
          fill
          sizes="288px"
          className="object-cover rounded-lg h-full"
        />
        {userId && (
          <div className="z-10 absolute top-2 right-2">
            {isInFavoriteList ? (
              <form action={deleteFavorite}>
                <input type="hidden" name="favoriteId" value={favoriteId} />
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="pathName" value={pathName} />
                <RemoveFromFavoritesButton />
              </form>
            ) : (
              <form action={addToFavorites}>
                <input type="hidden" name="homeId" value={homeId} />
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="pathName" value={pathName} />

                <AddToFavoritesButton />
              </form>
            )}
          </div>
        )}
      </div>

      <Link href={`/home/${homeId}`} className="mt-2">
        <h3 className="font-medium text-base">
          {country?.flag} {country?.label} / {country?.region}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {description}
        </p>
        <p className="text-muted-foreground">
          <span className="font-medium text-black">${price}</span> / night
        </p>
      </Link>
    </div>
  )
}
