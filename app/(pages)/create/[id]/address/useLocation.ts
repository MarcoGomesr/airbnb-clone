import { useCountries } from '@/shared/utils/getCountries'
import { useState } from 'react'

import { Country } from './types'

export const useLocation = () => {
  const [locationValue, setLocationValue] = useState('')
  const { getAllCountries } = useCountries()

  const countries: Country[] = getAllCountries()

  return {
    locationValue,
    setLocationValue,
    countries
  }
}
