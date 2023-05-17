import {
  Autocomplete,
  GoogleMap,
  Marker,
  useLoadScript,
} from '@react-google-maps/api'
import { useMemo, useState } from 'react'
import { PlacesAutocomplete } from '../components'

export function MapPage() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
    libraries: ['places'],
  })
  const [selected, setSelected] = useState(null)

  const center = useMemo(() => ({ lat: 49.2827291, lng: -123.1207375 }), [])

  if (!isLoaded) return <div>loading...</div>

  const options: google.maps.MapOptions = {
    mapTypeControlOptions: {
      position: google.maps.ControlPosition.BOTTOM_LEFT,
    },
  }
  return (
    <div className="h-screen relative">
      <PlacesAutocomplete setSelected={setSelected} />
      <GoogleMap
        options={options}
        mapContainerClassName="w-full h-full"
        center={selected ?? center}
        zoom={selected ? 15 : 10}
      >
        {selected && <Marker position={selected} />}
      </GoogleMap>
    </div>
  )
}
