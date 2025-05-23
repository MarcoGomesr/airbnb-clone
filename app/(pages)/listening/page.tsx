import { redirect } from 'next/navigation'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import ListeningView from './ListeningView'
import ListeningService from './getListening'


export default async function Listening() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user) {
    redirect('/')
  }

  interface Home {
    id: string;
    title: string | null;
    description: string | null;
    guests: string | null;
    bedrooms: string | null;
    bathrooms: string | null;
    country: string | null;
    photo: string | null;
    price: number | null;
    userId: string | null;
    Favorite: {
      id: string;
      createdAt: Date;
      userId: string | null;
      updatedAt: Date;
      homeId: string | null;
    }[];
  }

  const listing = await ListeningService.getHomes(user.id)
  return (
    <ListeningView listing={listing} user={user} />
  )
}
