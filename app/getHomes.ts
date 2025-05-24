import homeService from '@/app/homeService'

import { SearchParams } from './home.types'

export async function getHomes({
  searchParams,
  userId
}: {
  searchParams?: SearchParams
  userId?: string
}) {
  const homes = await homeService.getHomeService(searchParams ?? {}, userId)

  return homes
}
