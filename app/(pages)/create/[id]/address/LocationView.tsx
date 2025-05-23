'use client'

import { useLocation } from './useLocation'
import { LocationForm } from './components/LocationForm'
import CreateBottomBar from '@/shared/components/general/createBottomBar'
import { createLocation } from './actions'

type LocationViewProps = {
  id: string
}

export const LocationView = ({ id }: LocationViewProps) => {
  const { locationValue, setLocationValue, countries } = useLocation()

  return (
    <>
      <div className="w-3/5 mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors mb-10">
          Where is your Home located?
        </h2>
      </div>
      
      <LocationForm
        id={id}
        locationValue={locationValue}
        setLocationValue={setLocationValue}
        countries={countries}
        onSubmit={createLocation}
      />

      <CreateBottomBar />
    </>
  )
} 