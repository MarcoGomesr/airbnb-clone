import { useCountries } from '@/lib/getCountries'
import Image from 'next/image'
import Link from 'next/link'

type ListeningCardsProps = {
  imagePath: string
  description: string
  price: number
  location: string
}

export function ListeningCards({
  imagePath,
  description,
  price,
  location
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
      </div>

      <Link href={`/`} className="mt-2">
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
