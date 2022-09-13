import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    HStack,
    IconButton,
    Input,
    ChakraProvider,
    Text,
  } from '@chakra-ui/react'
  import { FaAccessibleIcon, FaAddressCard, FaLocationArrow, FaTimes } from 'react-icons/fa'
  
  import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    Autocomplete,
    DirectionsRenderer,
  } from '@react-google-maps/api'
  import { useRef, useState, useMemo } from 'react'
  import usePlacesAutocomplete , {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete" ;
  
  // const center = useMemo(() => ({ lat: 69, lng: 69 }), [])
  
  const center = { lat: 69, lng: 69 }
  
  const libraries = ['places']
  
  function TESTMAP() {
    const { isLoaded } = useJsApiLoader({
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
      libraries
    })
  
    const [map, setMap] = useState(/** @type google.maps.Map */ (null))
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')
    const [selected, setSelected] = useState(null)
    const [markerlatLng, setMarker] = useState({})
    const [setlat, setLat] = useState('')
  
    /** @type React.MutableRefObject<HTMLInputElement> */
    const originRef = useRef()
    /** @type React.MutableRefObject<HTMLInputElement> */
    const destiantionRef = useRef()
    /** @type React.MutableRefObject<HTMLInputElement> */
    const markerRef = useRef()
  
    if (!isLoaded) {
      return <div>Loading...</div>
    }
  
    function locationSelect() {
      // console.log(markerlatLng)
      console.log(markerlatLng)
    }
  
    async function Geocode() {
      if (markerRef.current.value === '') {
        return
      }
      console.log(markerRef.current.value)
      const address = markerRef.current.value
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      setSelected({ lat, lng });
    }
  
    function clearGeocode() {
      markerRef.current.value = ''
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
  
    function onMarkerDragEnd(coord, index) {
  
    }
  
    return (
      <ChakraProvider>
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
            {selected && <Marker position={selected} draggable={true} onDrag={(event) => {setMarker({lat: event.latLng.lat(), lng: event.latLng.lng()})}}/>}
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
              <Button colorScheme='green' type='submit' onClick={calculateRoute}>
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
              <Autocomplete>
                <Input type='text' placeholder='Origin' ref={markerRef} />
              </Autocomplete>
              <Button colorScheme='green' type='submit' onClick={Geocode} >
              Search
              </Button>
              <Text>Lat: {markerlatLng.lat}</Text>
              <Text>Lat: {markerlatLng.lng}</Text>
              <IconButton
                aria-label='center back'
                icon={<FaTimes />}
                onClick={clearGeocode}
              />
              <IconButton
                aria-label='center back'
                icon={<FaAccessibleIcon />}
                onClick={locationSelect}
              />
              <IconButton
              aria-label='center back'
              icon={<FaLocationArrow />}
              isRound
              onClick={() => {
                map.panTo(selected)
                map.setZoom(15)
              }}
            />
          </HStack>
        </Box>
      </Flex>
      </ChakraProvider>
    )
  }
  
  export default TESTMAP