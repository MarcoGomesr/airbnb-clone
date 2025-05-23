import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { unstable_noStore as noStore } from 'next/cache'

import { useCountries } from '@/shared/utils/getCountries'

import HomeDetailsView from './HomeDetailsView'
import { getHomeDetail } from './getHomeDetail'


export default async function HomePage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  noStore()
  const { id } = await params
  const home = await getHomeDetail(id)
  
  const { getCountryByValue } = useCountries()
  const country = getCountryByValue(home?.country as string)
  
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  return (
    <HomeDetailsView home={home} user={user} country={country} id={id}  />
  )
}
