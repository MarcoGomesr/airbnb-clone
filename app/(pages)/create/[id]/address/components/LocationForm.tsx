'use client'

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/shared/components/ui/select'
import { Skeleton } from '@/shared/components/ui/skeleton'
import dynamic from 'next/dynamic'
import { Country } from '../types'

const LazyMap = dynamic(() => import('@/shared/components/general/Map'), {
  ssr: false,
  loading: () => <Skeleton className="h-[50vh] rounded-lg relative z-0" />
})

type LocationFormProps = {
  id: string
  locationValue: string
  setLocationValue: (value: string) => void
  countries: Country[]
  onSubmit: (formData: FormData) => void
}

export const LocationForm = ({
  id,
  locationValue,
  setLocationValue,
  countries,
  onSubmit
}: LocationFormProps) => {
  return (
    <form action={onSubmit}>
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
                {countries.map((item) => (
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
    </form>
  )
} 