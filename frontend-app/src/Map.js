import { useMemo } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api" ;

export default function TESTMAP() {
  const { isLoaded } = useJsApiLoader({
    // googleMapsApiKey: process.env.GOOGLE_API_KEY ,
    googleMapsApiKey: "AIzaSyD4Q4PCT3p96MNZkKiWkzikGfQYioFeDek",
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

function Map() {
  const center = useMemo(() => ({ lat: 44, lng: -80 }), []);

  return (
    <GoogleMap zoom={10} center={center} mapContainerClassName ="map-container">
      <Marker position={center} />
    </GoogleMap>
  );
}