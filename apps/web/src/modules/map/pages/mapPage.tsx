import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'
import { useMemo, useState } from 'react'

export function MapPage() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
    libraries: ['places'],
  })
  const [selected, setSelected] = useState(null)

  const center = useMemo(() => ({ lat: 44, lng: -80 }), [])

  if (!isLoaded) return <div>loading...</div>

  const options = {
    mapTypeControlOptions: {
      position: google.maps.ControlPosition.BOTTOM_LEFT,
    },
  }
  return (
    <div className="h-screen relative">
      <GoogleMap
        options={options}
        mapContainerClassName="w-full h-full"
        center={selected ?? center}
        zoom={10}
      >
        {selected && <Marker position={selected} />}
      </GoogleMap>
    </div>
  )
}
