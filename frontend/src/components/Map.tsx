// frontend/src/components/Map.tsx
import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// Type for places returned from the Places API
interface Place {
  name: string;
  location: { lat: number; lng: number };
}

// Set map container styles and initial center coordinates
const containerStyle = {
  width: '100%',
  height: '500px',
};

const center = {
  lat: 49.266757915974424, // Latitude 
  lng: -123.25493253691926, // Longitude
};

const Map: React.FC = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const mapRef = useRef<any>(null);
  const fetchPlaces = () => {
    if (mapRef.current) {
      const google = window.google;

      const map = mapRef.current;
      const service = new google.maps.places.PlacesService(map);

const cafesRequest = {
      location: center,
      radius: 1500,
      type: 'restaurant',  // Searching only for cafes
    };

    // Define the search request for libraries
    const librariesRequest = {
      location: center,
      radius: 1500,
      //type: 'library',  // Searching only for libraries
    };

    // Perform the search for cafes
    service.nearbySearch(cafesRequest, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        const placesData = results.map((place: any) => ({
          name: place.name,
          location: place.geometry.location.toJSON(),
          type: 'cafe', // Mark the place type as 'cafe'
        }));
        setPlaces((prevPlaces) => [...prevPlaces, ...placesData]);
      }
    });

    // Perform the search for libraries
    service.nearbySearch(librariesRequest, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        const placesData = results.map((place: any) => ({
          name: place.name,
          location: place.geometry.location.toJSON(),
          type: 'library', // Mark the place type as 'library'
        }));
        setPlaces((prevPlaces) => [...prevPlaces, ...placesData]);
      }
    });
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, []);
  console.log(places);
  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_MAP_KEY || ''}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={17}
        onLoad={(map) => { mapRef.current = map; }}
      >
        {/* Add markers for each place */}
        {places.map((place, index) => (
          <Marker key={index} position={place.location} label={place.name} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
