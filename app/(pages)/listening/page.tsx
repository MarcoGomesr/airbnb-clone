import { redirect } from 'next/navigation'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import ListeningView from './ListeningView'
import ListeningService from './getListening'
import { type HomeWithFavorite } from './types'

export default async function Listening() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user) {
    redirect('/')
  }

  const listing = await ListeningService.getHomes(user.id)
  return (
    <ListeningView listing={listing as HomeWithFavorite[]} user={user} />
  )
}
