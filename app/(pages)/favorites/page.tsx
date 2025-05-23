import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import FavoritesView from './FavoritesView'
import getFavorites from './getFavorites'

export default async function Favorites() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  const favorites = await getFavorites(user?.id as string)

  return <FavoritesView favorites={favorites} userId={user?.id as string} />
}
