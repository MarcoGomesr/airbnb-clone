import { DescriptionView } from './DescriptionView'

export default async function DescriptionPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <DescriptionView id={id} />
}