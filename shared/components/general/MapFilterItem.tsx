'use client'

import Link from 'next/link'
import { categoryItems } from '@/shared/data/categoryItems'
import Image from 'next/image'
import { usePathname, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { cn } from '@/shared/lib/utils'

export default function MapFilterItem() {
  const searchParams = useSearchParams()
  const search = searchParams.get('filter')

  const pathname = usePathname()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
      return params.toString()
    },
    [searchParams]
  )

  return (
    <div className="flex gap-x-10 mt-5 w-full overflow-x-scroll no-scrollbar ">
      {categoryItems.map((item) => (
        <Link
          key={item.id}
          href={pathname + '?' + createQueryString('filter', item.name)}
          className={cn(
            'flex flex-col items-center gap-y-2',
            search === item.name
              ? 'border-b-2 border-black pb-2 flex-shrink-0'
              : 'opacity-70 flex-shrink-0',
            'flex flex-col gap-y-3 items-center'
          )}
        >
          <div className="relative w-6 h-6">
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              sizes="24px"
              className="object-cover"
            />
          </div>
          <p className="text-xs font-medium">{item.title}</p>
        </Link>
      ))}
    </div>
  )
}
