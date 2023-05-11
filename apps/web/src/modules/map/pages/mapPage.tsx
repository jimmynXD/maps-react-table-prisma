import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'
import { useMemo, useState } from 'react'
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete'

export function MapPage() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey:
      process.env.GOOGLE_MAPS_API_KEY ??
      'AIzaSyAQe4q2QbqCVCzqfUqyVbvLaZ1TyaDPpiE',
    libraries: ['places'],
  })
  const [selected, setSelected] = useState(null)

  const center = useMemo(() => ({ lat: 44, lng: -80 }), [])

  if (!isLoaded) return <div>loading...</div>

  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="z-10 fixed top-4 left-1/2 -translate-x-1/2">
        <PlacesAutocomplete setSelected={setSelected} />
      </div>
      <GoogleMap
        mapContainerClassName="w-full h-full flex-1"
        center={selected ?? center}
        zoom={10}
      >
        {selected && <Marker position={selected} />}
      </GoogleMap>
    </div>
  )
}

interface PlacesAutocompleteProps {
  setSelected: React.Dispatch<React.SetStateAction<any>>
}
const PlacesAutocomplete = ({ setSelected }: PlacesAutocompleteProps) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  })
  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value)
  }

  const handleSelect =
    ({ description }) =>
    () => {
      // When user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false)
      clearSuggestions()

      // Get latitude and longitude via utility functions
      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0])
        setSelected({ lat, lng })
      })
    }
  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion

      return (
        <li key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      )
    })
  return (
    // <ComboBox
    //   placeholder="Search a restaurant"
    //   defaultItems={status === 'OK' ? data : []}
    //   inputValue={value}
    //   onSelectionChange={(item) => {
    //     console.log(item)
    //   }}
    //   onInputChange={(e: string) => setValue(e)}
    // >
    //   {data.map(({ place_id, description }) => (
    //     <Item key={place_id}>
    //       {place_id}
    //       {description}
    //     </Item>
    //   ))}
    // </ComboBox>
    <div className="bg-white">
      <input
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Where are you going?"
      />
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      <ul>{renderSuggestions()}</ul>
    </div>
  )
}
