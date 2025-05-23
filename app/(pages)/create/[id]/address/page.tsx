import { use } from 'react'
import { LocationView } from './components/LocationView'

export default function AddressPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)

  return <LocationView id={id} />
}
