import Link from 'next/link'
import { categoryItems } from '@/lib/categoriItems'
import Image from 'next/image'

export default function MapfilterItem() {
  return (
    <div>
      {categoryItems.map((item) => (
        <Link key={item.id} href={`/category/${item.name}`}>
          <div className="relative w-6 h-6">
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              className="object-cover"
            />
          </div>
        </Link>
      ))}
    </div>
  )
}
