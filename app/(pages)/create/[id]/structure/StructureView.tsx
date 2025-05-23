'use client'

import { SelectCategory } from '@/shared/components/general/SelectCategory'
import { createCategoryPage } from '../actions'
import CreateBottomBar from '../createBottomBar'

type StructureViewProps = {
  id: string
}

export const StructureView = ({ id }: StructureViewProps) => {
  return (
    <>
      <div className="w-3/5 mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors">
          Which of these best describes your home?
        </h2>
      </div>
      <form action={createCategoryPage} data-testid="structure-form">
        <input type="hidden" name="id" value={id} />
        <SelectCategory />
        <CreateBottomBar />
      </form>
    </>
  )
} 