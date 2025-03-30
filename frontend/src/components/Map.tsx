import { useEffect, useRef, useState, memo } from 'react';
//import { Location } from '@/types';
import LocationMarker from './LocationMarker';
import { toast } from 'sonner';
import MapFilterBar, { FilterOptions } from './MapFilterBar';

import { GoogleMap, LoadScript } from '@react-google-maps/api';

interface MapViewProps {
  locations: Location[];
}

// Separate this as a constant outside the component to avoid re-creation
const containerStyle = {
  width: '100%',
  height: '500px',
  borderRadius: '0.5rem'
};

const center = {
  lat: 49.2606,
  lng: -123.2460
};

const key = import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY;

async function nearbySearch(map: any) {
    //@ts-ignore
    const { Place, SearchNearbyRankPreference } = await google.maps.importLibrary('places') as google.maps.PlacesLibrary;

    const request = {
        // required parameters
        fields: ['displayName', 'location', 'businessStatus'],
        locationRestriction: {
            center: center,
            radius: 500, 
        },
        // optional parameters
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
          let busy;
          if (col == '#4CAF50') {
            noise = "Quiet";
            busy = "Not busy - lots of space";
          } else if (col == '#FFC107') {
            noise = "Moderate noise";
            busy = "Somewhat busy";
          } else {
            noise = "Noisy";
            busy = "Very busy - no more open spots";
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
          <h2>${place.displayName}</h2>
          <p>Noise Level: ${noise}</p>
          <p>${busy}</p>
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



// const MapView = ({ locations }: MapViewProps) => {
//   const [googleApiKey, setGoogleApiKey] = useState<string>('');
//   const [keyInput, setKeyInput] = useState<string>('');
//   const [mapLoaded, setMapLoaded] = useState<boolean>(false);
//   const [filteredLocations, setFilteredLocations] = useState<Location[]>(locations);
//   const [filters, setFilters] = useState<FilterOptions>({
//     maxNoise: 100,
//     type: 'all',
//     isOpenNow: false,
//   });
//   const mapRef = useRef<google.maps.Map | null>(null);
//   const scriptRef = useRef<HTMLScriptElement | null>(null);
  
//   // Load the API key on component mount
//   useEffect(() => {
//     const savedKey = localStorage.getItem('google_maps_key');
//     if (savedKey) {
//       setGoogleApiKey(savedKey);
//     }
//   }, []);

//   useEffect(() => {
//     // Apply filters to locations
//     let result = [...locations];
    
//     // Filter by noise level (using averageQuietness in the location data)
//     if (filters.maxNoise < 100) {
//       result = result.filter(loc => 
//         loc.rating ? loc.rating * 10 <= filters.maxNoise : true
//       );
//     }
    
//     // Filter by type
//     if (filters.type !== 'all') {
//       result = result.filter(loc => 
//         loc.category === filters.type
//       );
//     }
    
//     // Filter by open status (simplified example)
//     if (filters.isOpenNow) {
//       // This is a simplified example - you'd need more logic based on your data structure
//       // For now, we'll assume all locations are open
//       result = result;
//     }
    
//     setFilteredLocations(result);
//   }, [filters, locations]);

//   // Load Google Maps script
//   useEffect(() => {
//     if (!googleApiKey) {
//       setMapLoaded(false);
//       return;
//     }

//     // Cleanup previous script if it exists
//     if (scriptRef.current) {
//       document.head.removeChild(scriptRef.current);
//       scriptRef.current = null;
//       // Reset any global Google Maps state
//       window.google = undefined;
//     }

//     // Create new script element
//     const script = document.createElement('script');
//     script.id = 'google-maps-script';
//     script.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places`;
//     script.async = true;
//     script.defer = true;
    
//     script.onload = () => {
//       setMapLoaded(true);
//       initializeMap();
//     };
    
//     script.onerror = () => {
//       toast.error('Failed to load Google Maps. Please check your API key.');
//       setMapLoaded(false);
//     };
    
//     document.head.appendChild(script);
//     scriptRef.current = script;
    
//     return () => {
//       if (scriptRef.current) {
//         document.head.removeChild(scriptRef.current);
//       }
//     };
//   }, [googleApiKey]);

//   const initializeMap = () => {
//     if (!window.google || !window.google.maps) {
//       return;
//     }
    
//     const mapDiv = document.getElementById('map-container');
//     if (!mapDiv) return;
    
//     mapRef.current = new window.google.maps.Map(mapDiv, {
//       center: UBC_CENTER,
//       zoom: 15,
//       mapTypeControl: true,
//       streetViewControl: true,
//       fullscreenControl: true,
//       zoomControl: true,
//     });
//   };

//   const handleKeySubmit = () => {
//     if (!keyInput.trim()) {
//       toast.error('Please enter a valid Google Maps API key');
//       return;
//     }
    
//     // Save key to localStorage
//     localStorage.setItem('google_maps_key', keyInput);
    
//     // Update state with the new key
//     setGoogleApiKey(keyInput);
//     setMapLoaded(false); // Reset the map loaded state
//     toast.success('Google Maps API key saved successfully!');
//   };

//   const handleResetKey = () => {
//     localStorage.removeItem('google_maps_key');
//     setGoogleApiKey('');
//     setMapLoaded(false);
//   };

//   const handleFocusUBC = () => {
//     if (mapRef.current) {
//       mapRef.current.panTo(UBC_CENTER);
//       mapRef.current.setZoom(15);
//     }
//   };

//   const handleFilterChange = (newFilters: FilterOptions) => {
//     setFilters(newFilters);
//   };

//   // Render the API Key input form if no key is provided
//   if (!googleApiKey) {
//     return (
//       <div className="map-container flex flex-col items-center justify-center bg-gray-50 p-6 rounded-lg border">
//         <h3 className="text-lg font-semibold mb-4">Google Maps API Key Required</h3>
//         <p className="text-sm text-gray-500 mb-4 text-center max-w-md">
//           To use the map feature, please enter your Google Maps API key. You can get one from the{' '}
//           <a 
//             href="https://console.cloud.google.com/google/maps-apis/credentials" 
//             target="_blank" 
//             rel="noopener noreferrer" 
//             className="text-quiet-500 hover:underline"
//           >
//             Google Cloud Console
//           </a>.
//         </p>
        
//         <div className="flex w-full max-w-md gap-2">
//           <input
//             type="text"
//             value={keyInput}
//             onChange={(e) => setKeyInput(e.target.value)}
//             placeholder="Enter your Google Maps API key"
//             className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-quiet-400"
//           />
//           <button
//             onClick={handleKeySubmit}
//             className="px-4 py-2 bg-quiet-400 text-white rounded-md hover:bg-quiet-500 transition-colors"
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Add the Google Maps script to the document
//   return (
//     <>
//       <MapFilterBar onFilterChange={handleFilterChange} />
      
//       {!mapLoaded && (
//         <div className="flex items-center justify-center h-[500px] bg-gray-100 rounded-lg">
//           <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-quiet-500"></div>
//         </div>
//       )}
      
//       {mapLoaded && window.google && (
//         <div className="map-container relative">
//           <div id="map-container" style={mapContainerStyle}>
//             {/* Map renders here */}
//           </div>
          
//           {/* Render markers after map has loaded */}
//           {mapRef.current && filteredLocations.map(location => (
//             <LocationMarker 
//               key={location._id} 
//               location={location} 
//               map={mapRef.current}
//             />
//           ))}
          
//           <div className="absolute bottom-4 right-4 flex gap-2">
//             <button
//               onClick={handleFocusUBC}
//               className="bg-white px-3 py-2 rounded-md shadow-md text-sm font-medium text-quiet-600 hover:bg-gray-50 transition-colors z-10"
//             >
//               Focus on UBC
//             </button>
            
//             <button
//               onClick={handleResetKey}
//               className="bg-white px-3 py-2 rounded-md shadow-md text-sm font-medium text-red-600 hover:bg-gray-50 transition-colors z-10"
//             >
//               Reset API Key
//             </button>
//           </div>
//         </div>
//       )}
      
//       {mapLoaded && !window.google && (
//         <div className="map-container flex flex-col items-center justify-center bg-red-50 p-6 rounded-lg border border-red-200">
//           <h3 className="text-lg font-semibold text-red-600 mb-4">Error Loading Google Maps</h3>
//           <p className="text-sm text-red-500 mb-4 text-center">
//             There was an error loading Google Maps. Please check your API key and try again.
//           </p>
//           <button
//             onClick={handleResetKey}
//             className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
//           >
//             Reset API Key
//           </button>
//         </div>
//       )}
//     </>
//   );
// };

const MapView: React.FC = () => {
  const mapRef = useRef<google.maps.Map | null>(null); // Reference to map object
  const [isMapLoaded, setIsMapLoaded] = useState(false); // State to track if map is loaded

  // const { isLoaded } = useJsApiLoader({
  //   googleMapsApiKey: key, // Your API Key
  // });

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
    <LoadScript googleMapsApiKey={key}>
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

export default MapView;
