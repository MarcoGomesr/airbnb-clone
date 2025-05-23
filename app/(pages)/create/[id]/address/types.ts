export type LocationFormData = {
  id: string
  country: string
}

export type Country = {
  value: string
  label: string
  flag: string
  region: string
}

export type UpdateLocationDTO = {
  homeId: string
  country: string
}
