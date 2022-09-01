import { useMemo } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api" ;

const libraries = ["places"];

export default function TESTMAP() {
  const { isLoaded } = useJsApiLoader({
    // googleMapsApiKey: process.env.GOOGLE_API_KEY ,
    googleMapsApiKey: "AIzaSyD4Q4PCT3p96MNZkKiWkzikGfQYioFeDek",
    libraries,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

function Map() {
  const center = useMemo(() => ({ lat: 69, lng: -69 }), []);

  return (
    <GoogleMap zoom={10} center={center} mapContainerClassName ="map-container">
      <Marker position={center} />
    </GoogleMap>
  );
}

