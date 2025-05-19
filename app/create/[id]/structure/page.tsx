import { SelectCategory } from '@/components/SelectCategory'
import { createCategoryPage } from '../actions'
import CreateBottomBar from '../createBottomBar'

export default async function StructurePage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <>
      <div className="w-3/5 mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors">
          Which of these best describes your home?
        </h2>
      </div>
      <form action={createCategoryPage}>
        <input type="hidden" name="id" value={id} />
        <SelectCategory />
        <CreateBottomBar />
      </form>
    </>
  )
}
