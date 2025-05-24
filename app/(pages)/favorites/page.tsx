import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import FavoriteView from './FavoriteView'
import getFavorites from './getFavorites'

export default async function Favorites() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  const favorites = await getFavorites(user?.id as string)

  return <FavoriteView favorites={favorites} userId={user?.id as string} />
}
