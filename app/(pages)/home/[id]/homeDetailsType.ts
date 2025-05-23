export type HomeDetails = {
  photo: string | null
  description: string | null
  guests: string | null
  bedrooms: string | null
  bathrooms: string | null
  title: string | null
  price: number | null
  categoryName: string | null
  country: string | null
  Reservation: {
    startDate: Date
    endDate: Date
  }[]
  User: {
    profilePicture: string | null
    firstName: string
    lastName: string
  } | null
}

export type User = {
  id: string
  email: string
  given_name: string
  family_name: string
  picture?: string
}

export type Country =
  | {
      value: string
      label: string
      flag: string
      latlng: [number, number]
      region: string
    }
  | undefined
