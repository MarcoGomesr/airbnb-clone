import { Separator } from '@/shared/components/ui/separator'
import { useCountries } from '@/shared/utils/getCountries'
import { prisma } from '@/shared/lib/prisma'
import Image from 'next/image'
import { CategoryShowcase } from './CategoryShowcase'
import { HomeMap } from './HomeMap'
import { SelectCalendar } from './components/SelectCalendar'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { Button } from '@/shared/components/ui/button'
import Link from 'next/link'
import { createReservation } from './actions'
import { unstable_noStore as noStore } from 'next/cache'

async function getHome(homeId: string) {
  const home = await prisma.home.findUnique({
    where: {
      id: homeId
    },
    select: {
      photo: true,
      description: true,
      guests: true,
      bedrooms: true,
      bathrooms: true,
      title: true,
      price: true,
      categoryName: true,
      country: true,
      Reservation: {
        where: {
          homeId: homeId
        },
        select: {
          startDate: true,
          endDate: true
        }
      },
      User: {
        select: {
          profilePicture: true,
          firstName: true,
          lastName: true
        }
      }
    }
  })
  return home
}
export default async function HomePage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  noStore()
  const { id } = await params
  const home = await getHome(id)

  const { getCountryByValue } = useCountries()
  const country = getCountryByValue(home?.country as string)

  const { getUser } = getKindeServerSession()
  const user = await getUser()
  return (
    <div className="w-[75%] mx-auto mt-10 mb-10">
      <h1 className="font-medium text-2xl mb-5">{home?.title}</h1>
      <div className="relative h-[550px]">
        <Image
          src={`https://smhfxsesicpuwwivadui.supabase.co/storage/v1/object/public/images/${home?.photo}`}
          fill
          className="object-cover rounded-lg w-full"
          alt={home?.title as string}
        />
      </div>

      <div className="flex justify-between gap-x-24 mt-8">
        <div className="w-2/3">
          <h3>
            {country?.flag} {country?.label} / {country?.region}
          </h3>
          <div className="flex text-muted-foreground gap-x-2">
            <p>{home?.guests} Guests</p>
            <p>{home?.bedrooms} Bedrooms</p>
            <p>{home?.bathrooms} Bathrooms</p>
          </div>

          <div className="flex items-center mt-6">
            <img
              src={
                home?.User?.profileImage ??
                'https://t4.ftcdn.net/jpg/05/89/93/27/360_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg'
              }
              alt="User Profile"
              className="w-11 h-11 rounded-full"
            />
            <div className="flex flex-col ml-4">
              <h3 className="font-medium">
                By {home?.User?.firstName} {home?.User?.lastName}
              </h3>
              <p className="text-sm text-muted-foreground">Hosted since 2015</p>
            </div>
          </div>

          <Separator className="my-7" />
          <CategoryShowcase categoryName={home?.categoryName as string} />
          <Separator className="my-7" />

          <p className="text-muted-foreground">{home?.description}</p>
          <Separator className="my-7" />

          <HomeMap locationValue={country?.value as string} />
        </div>

        <form action={createReservation}>
          <input type="hidden" name="userId" value={user?.id} />
          <input type="hidden" name="homeId" value={id} />
          <SelectCalendar reservation={home?.Reservation} />

          {user.id ? (
            <Button className="w-full" type="submit">
              Make a reservation
            </Button>
          ) : (
            <Button className="w-full" asChild>
              <Link href="/api/auth/login">Make a reservation</Link>
            </Button>
          )}
        </form>
      </div>
    </div>
  )
}
