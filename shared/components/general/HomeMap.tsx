'use client'

import { Skeleton } from '@/shared/components/ui/skeleton'
import dynamic from 'next/dynamic'

export function HomeMap({ locationValue }: { locationValue: string }) {
  const LazyMap = dynamic(() => import('@/shared/components/general/Map'), {
    ssr: false,
    loading: () => <Skeleton className="h-[50vh] w-full" />
  })
  return <LazyMap locationValue={locationValue} />
}
