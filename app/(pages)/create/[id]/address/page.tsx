'use client'

import { useState, use } from 'react'
import dynamic from 'next/dynamic'
import { useCountries } from '@/shared/utils/getCountries'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/shared/components/ui/select'
import { Skeleton } from '@/shared/components/ui/skeleton'
import CreateBottomBar from '../createBottomBar'
import { createLocation } from '../actions'

export default function AddressPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const [locationValue, setLocationValue] = useState('')

  const { getAllCountries } = useCountries()

  const LazyMap = dynamic(() => import('@/shared/components/general/Map'), {
    ssr: false,
    loading: () => <Skeleton className="h-[50vh] rounded-lg relative z-0" />
  })

  return (
    <>
      <div className="w-3/5 mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors mb-10">
          Where is you Home located?
        </h2>
      </div>
      <form action={createLocation}>
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="country" value={locationValue} />

        <div className="w-3/5 mx-auto">
          <div className="mb-5">
            <Select required onValueChange={setLocationValue}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Countries</SelectLabel>
                  {getAllCountries().map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.flag} {item.label} / {item.region}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <LazyMap locationValue={locationValue} />
        </div>

        <CreateBottomBar />
      </form>
    </>
  )
}
