import { StructureView } from './StructureView'

export default async function StructurePage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return <StructureView id={id} />
}
