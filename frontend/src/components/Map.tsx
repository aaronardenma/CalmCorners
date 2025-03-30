import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap, LoadScript, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '80vw',
  height: '80vh',
};

const center = {
  lat: 49.266757915974424, lng: -123.25493253691926
};

async function nearbySearch(map: any) {
    //@ts-ignore
    const { Place, SearchNearbyRankPreference } = await google.maps.importLibrary('places') as google.maps.PlacesLibrary;
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

    // Restrict within the map viewport.
    //let center = new google.maps.LatLng(52.369358, 4.889258);

    const request = {
        // required parameters
        fields: ['displayName', 'location', 'businessStatus'],
        locationRestriction: {
            center: center,
            radius: 500, 
        },
        // optional parameters
        //includedPrimaryTypes: ['restaurant'],
        //maxResultCount: 5,
        rankPreference: SearchNearbyRankPreference.POPULARITY,
        language: 'en-US',
        region: 'us',
    };

    //@ts-ignore
    const { places } = await Place.searchNearby(request);

    if (places.length) {
        console.log(places);

        const { LatLngBounds } = await google.maps.importLibrary("core") as google.maps.CoreLibrary;
        const bounds = new LatLngBounds();

        // Loop through and get all the results.
        places.forEach((place) => {
          const col = chooseColour();
          let noise;
          if (col == '#4CAF50') {
            noise = "Quiet";
          } else if (col == '#FFC107') {
            noise = "Moderate noise";
          } else {
            noise = "Noisy";
          }
            const markerView = new google.maps.Marker({
                map,
                position: place.location,
                title: place.displayName,
                icon: {
                  path: window.google.maps.SymbolPath.CIRCLE,
                  fillColor: col,
                  fillOpacity: 0.6,
                  strokeWeight: 1,
                  strokeColor: '#ffffff',
                  scale: 10,
      },
            });
    // Add an info window for additional details
    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div style='color: black;'>
          <h5>${place.displayName}</h5>
          <p>Noise Level: ${noise}</p>
        </div>
      `,
    });
            markerView.addListener('click', () => {
                  infoWindow.open({
      anchor: markerView,
      map,
    });
            });
            bounds.extend(place.location as google.maps.LatLng);
            console.log(place);
        });

        map.fitBounds(bounds);

    } else {
        console.log("No results");
    }
}

const Map: React.FC = () => {
  const mapRef = useRef<google.maps.Map | null>(null); // Reference to map object
  const [isMapLoaded, setIsMapLoaded] = useState(false); // State to track if map is loaded

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCscwVhEPKGgJEtkCPZdisklrUaom9hPw8", // Your API Key
  });

  // Wait for the map to load
  const onMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;  // Set the map reference once map is loaded
    setIsMapLoaded(true);   // Set state to indicate map is loaded
  };

  useEffect(() => {
    if (isMapLoaded && mapRef.current) {
      const map = mapRef.current;

      // Create a marker only after the map is loaded
      const marker = new google.maps.Marker({
        position: center,  // Position of the marker
        map: map,          // Attach the marker to the map
        title: 'Center Marker',  // Optional title for the marker
      });

      // Optionally, you can add event listeners to the marker
      marker.addListener('click', () => {
        alert('Marker clicked!');
      });

      nearbySearch(map);
    }
  }, [isMapLoaded]);  // This effect runs once when map is loaded

  return (
    <LoadScript googleMapsApiKey="AIzaSyCscwVhEPKGgJEtkCPZdisklrUaom9hPw8">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={17}
        onLoad={onMapLoad}  // Set map reference when map is loaded
      />
    </LoadScript>
  );
};

function chooseColour() {
  const num = getRandomInt(3);
  if (num === 1) {
    return '#4CAF50';
  } else if (num === 2) {
    return '#FFC107';
  } else {
    return '#F44336';
  }
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}
export default Map;
