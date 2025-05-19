'use client'

import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useCountries } from '@/lib/getCountries'
import { icon } from 'leaflet'

const ICON = icon({
  iconUrl: '/marcador-de-posicion.png',
  iconSize: [32, 32]
})

export default function Map({ locationValue }: { locationValue: string }) {
  const { getCountryByValue } = useCountries()
  const latLang = getCountryByValue(locationValue)?.latlng

  return (
    <MapContainer
      center={latLang ?? [51.505, -0.09]}
      zoom={10}
      scrollWheelZoom={false}
      className="h-[50vh] rounded-lg relative z-0"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={latLang ?? [51.505, -0.09]} icon={ICON} />
    </MapContainer>
  )
}
