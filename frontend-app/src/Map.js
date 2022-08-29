// import { useMemo } from "react";
// import { GoogleMap, useJsApiLoader, Marker, useLoadScript, } from "@react-google-maps/api" ;


// export default function TESTMAP() {
//   const { isLoaded } = useJsApiLoader({
//     // googleMapsApiKey: process.env.GOOGLE_API_KEY ,
//     googleMapsApiKey: "AIzaSyD4Q4PCT3p96MNZkKiWkzikGfQYioFeDek",
//     libraries: ["places"],
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

import { useState, useMemo } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api" ;
import usePlacesAutocomplete , {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete" ;
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css" ;

const libraries = ["places"];

export default function TESTMAP() {
  const { isLoaded } = useJsApiLoader({
    // googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    googleMapsApiKey: "AIzaSyD4Q4PCT3p96MNZkKiWkzikGfQYioFeDek" ,
    libraries,
  });


  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

function Map() {
  const center = useMemo(() => ({ lat: 43.45, lng: -80.49 }), []);
  const [selected, setSelected] = useState(null);

  return (
    <>
      <div className="places-container">
        <PlacesAutocomplete setSelected={setSelected} />
      </div>

      <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName ="map-container"
      >
        {selected && <Marker position={selected} />}
      </GoogleMap>
    </>
  );
}

const PlacesAutocomplete = ({ setSelected }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete ();

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="combobox-input"
        placeholder="Search an address"
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};