import Image from 'next/image'
import { categoryItems } from '@/shared/data/categoryItems'

export function CategoryShowcase({ categoryName }: { categoryName: string }) {
  const category = categoryItems.find((item) => item.name === categoryName)

  if (!category) return null
  return (
    <div className="flex items-center">
      <Image
        src={category.imageUrl as string}
        alt={category.name as string}
        width={44}
        height={44}
      />
      <div className="flex flex-col ml-4">
        <h3 className="font-medium">{category.title}</h3>
        <p className="text-sm text-muted-foreground">{category.description}</p>
      </div>
    </div>
  )
}
