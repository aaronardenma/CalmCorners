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

      // Define the search request for cafes and libraries
      const request = {
        location: center,  // Starting point for searching nearby
        radius: 1000,      // Search within 1 km radius
        type: ['cafe', 'library'],  // Searching for cafes and libraries
      };

      // Perform the search
      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          // Process results and create markers
          const placesData = results.map((place: any) => ({
            name: place.name,
            location: place.geometry.location.toJSON(),
          }));
          setPlaces(placesData);
        }
      });
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ''}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={17}
        onLoad={(map) => (mapRef.current = map)}
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
