// import { useMemo } from "react";
// import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api" ;

// const libraries = ["places"];

// export default function TESTMAP() {
//   const { isLoaded } = useJsApiLoader({
//     // googleMapsApiKey: process.env.GOOGLE_API_KEY ,
//     googleMapsApiKey: "AIzaSyD4Q4PCT3p96MNZkKiWkzikGfQYioFeDek",
//     libraries,
//   });

//   if (!isLoaded) return <div>Loading...</div>;
//   return <Map />;
// }

// function Map() {
//   const center = useMemo(() => ({ lat: 69, lng: -69 }), []);

//   return (
//     <GoogleMap zoom={10} center={center} mapContainerClassName ="map-container">
//       <Marker position={center} />
//     </GoogleMap>
//   );
// }

// import { useState, useMemo } from "react";
// import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api" ;
// import usePlacesAutocomplete , {
//   getGeocode,
//   getLatLng,
// } from "use-places-autocomplete" ;
// import {
//   Combobox,
//   ComboboxInput,
//   ComboboxPopover,
//   ComboboxList,
//   ComboboxOption,
// } from "@reach/combobox";
// import "@reach/combobox/styles.css" ;

// const libraries = ["places"];

// export default function TESTMAP() {
//   const { isLoaded } = useJsApiLoader({
//     // googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
//     googleMapsApiKey: "AIzaSyD4Q4PCT3p96MNZkKiWkzikGfQYioFeDek" ,
//     libraries,
//   });


//   if (!isLoaded) return <div>Loading...</div>;
//   return <Map />;
// }

// function Map() {
//   const center = useMemo(() => ({ lat: 43.45, lng: -80.49 }), []);
//   const [selected, setSelected] = useState(null);

//   return (
//     <>
//       <div className="places-container">
//         <PlacesAutocomplete setSelected={setSelected} />
//       </div>

//       <GoogleMap
//         zoom={10}
//         center={center}
//         mapContainerClassName ="map-container"
//       >
//         {selected && <Marker position={selected} />}
//       </GoogleMap>
//     </>
//   );
// }

// const PlacesAutocomplete = ({ setSelected }) => {
//   const {
//     ready,
//     value,
//     setValue,
//     suggestions: { status, data },
//     clearSuggestions,
//   } = usePlacesAutocomplete ();

//   const handleSelect = async (address) => {
//     setValue(address, false);
//     clearSuggestions();

//     const results = await getGeocode({ address });
//     const { lat, lng } = await getLatLng(results[0]);
//     setSelected({ lat, lng });
//   };

//   return (
//     <Combobox onSelect={handleSelect}>
//       <ComboboxInput
//         value={value}
//         onChange={(e) => setValue(e.target.value)}
//         disabled={!ready}
//         className="combobox-input"
//         placeholder="Search an address"
//       />
//       <ComboboxPopover>
//         <ComboboxList>
//           {status === "OK" &&
//             data.map(({ place_id, description }) => (
//               <ComboboxOption key={place_id} value={description} />
//             ))}
//         </ComboboxList>
//       </ComboboxPopover>
//     </Combobox>
//   );
// };

import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  SkeletonText,
  Text,
} from '@chakra-ui/react'
import { FaLocationArrow, FaTimes } from 'react-icons/fa'

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api'
import { useRef, useState } from 'react'

const center = { lat: 69, lng: 69 }

const libraries = ['places']

function TESTMAP() {
  console.log(process.env.REACT_APP_GOOGLE_API_KEY)
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    // googleMapsApiKey: "AIzaSyD4Q4PCT3p96MNZkKiWkzikGfQYioFeDek",
    libraries
  })

  const [map, setMap] = useState(/** @type google.maps.Map */ (null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef()
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef()

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  

  async function calculateRoute() {
    if (originRef.current.value === '' || destiantionRef.current.value === '') {
      return
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
  }

  function clearRoute() {
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    originRef.current.value = ''
    destiantionRef.current.value = ''
  }

  return (
    <Flex
      position='relative'
      flexDirection='column'
      alignItems='center'
      h='100vh'
      w='100vw'
    >
      <Box position='absolute' left={0} top={0} h='100%' w='100%'>
        {/* Google Map Box */}
        <GoogleMap
          center={center}
          zoom={10}
          mapContainerClassName ="map-container"
          onLoad={map => setMap(map)}
        >
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </Box>
      <Box
        p={4}
        borderRadius='lg'
        m={4}
        bgColor='white'
        shadow='base'
        minW='container.md'
        zIndex='1'
      >
        <HStack spacing={2} justifyContent='space-between'>
          <Box flexGrow={1}>
            <Autocomplete>
              <Input type='text' placeholder='Origin' ref={originRef} />
            </Autocomplete>
          </Box>
          <Box flexGrow={1}>
            <Autocomplete>
              <Input
                type='text'
                placeholder='Destination'
                ref={destiantionRef}
              />
            </Autocomplete>
          </Box>

          <ButtonGroup>
            <Button colorScheme='pink' type='submit' onClick={calculateRoute}>
              Calculate Route
            </Button>
            <IconButton
              aria-label='center back'
              icon={<FaTimes />}
              onClick={clearRoute}
            />
          </ButtonGroup>
        </HStack>
        <HStack spacing={4} mt={4} justifyContent='space-between'>
          <Text>Distance: {distance} </Text>
          <Text>Duration: {duration} </Text>
          <IconButton
            aria-label='center back'
            icon={<FaLocationArrow />}
            isRound
            onClick={() => {
              map.panTo(center)
              map.setZoom(15)
            }}
          />
        </HStack>
      </Box>
    </Flex>
  )
}

export default TESTMAP