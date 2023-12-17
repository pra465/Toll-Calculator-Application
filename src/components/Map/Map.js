import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './Map.css';
import L from 'leaflet';
import useCurrentLocation from '../../customHooks/useCurrentLocation';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from 'react-leaflet';
import { useDispatch } from 'react-redux';
import { addDestinationCordinates } from '../../features/locationCordinatesSlice';
import polyline from 'polyline';
import { addTollCost } from '../../features/tollCostSlice';
const redMarker = new L.Icon({
  iconUrl:
    'https://cdn0.iconfinder.com/data/icons/staff-management-4/60/map__location__pin__user__marker-1024.png',
  iconSize: [70, 70],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowAnchor: [41, 41],
});

const Map = () => {
  const [overpassData, setOverpassData] = useState(null);
  const [routePolyline, setRoutePolyline] = useState('');
  const { userLatitude, userLongitude } = useCurrentLocation();
  const position = [userLatitude, userLongitude];
  const searchbyTextValue = useSelector(
    (state) => state.overpassData.locationData
  );
  const dispatch = useDispatch();

  // const routePolyline1 = 'uigcDmeqmMNKsBuHwNcq@kC{IcA_AmJuDbBgHxGfB^w@R_B';

  const decodedCoordinates = polyline.decode(routePolyline);

  const handleMarkerClick = async (e) => {
    dispatch(addDestinationCordinates([e.latlng.lat, e.latlng.lng]));
    osrmApi(userLatitude, userLongitude, e.latlng.lat, e.latlng.lng);
    tollGuguApi(routePolyline);
  };

  // OSRM API TESTING

  useEffect(() => {
    const overpassApi = async () => {
      const overpassQuery = `[out:json];
    (
      node["amenity"=${searchbyTextValue}](around:10000, USER_LATITUDE, USER_LONGITUDE);
    );
    out center;`;

      // replace USER_LATITUDE and USER_LONGITUDE in the query with actual data;

      const queryWithUserLocation = overpassQuery
        .replace('USER_LATITUDE', userLatitude)
        .replace('USER_LONGITUDE', userLongitude);

      // encode the query

      const encodedQuery = encodeURIComponent(queryWithUserLocation);

      // Construct the overpass API call using fetch
      const overpassUrl = `https://overpass-api.de/api/interpreter?data=${encodedQuery}`;

      // Make the Overpass API call using fetch

      const response = await fetch(overpassUrl);
      const data = await response.json();
      setOverpassData(data);
    };

    if (userLatitude !== null || userLongitude !== null) {
      overpassApi();
    }
  }, [userLatitude, userLongitude, searchbyTextValue]);

  const osrmApi = async (
    userLatitude,
    userLongitude,
    destinantionLatitude,
    destinationLongitude
  ) => {
    const response = await fetch(
      `https://router.project-osrm.org/route/v1/car/${userLongitude},${userLatitude};${destinationLongitude},${destinantionLatitude}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch route');
    }

    const data = await response.json();
    const polyline = data.routes[0].geometry;
    setRoutePolyline(polyline);

    return polyline;
  };
  // Toll Guru Api
  const tollGuguApi = (routePolyline) => {
    const osrmPolyline = routePolyline; // Replace with your OSRM polyline
    const tollGuruApiKey = 'J8Tp4L6hB9gf7r8FdQD2tb4JQtPTfJbR';
    console.log(osrmPolyline);

    const tollGuruUrl = `https://apis.tollguru.com/toll/v2/complete-polyline-from-mapping-service`;
    fetch(tollGuruUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': tollGuruApiKey,
      },
      body: JSON.stringify({
        polyline: osrmPolyline,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle TollGuru API response (contains TollGuru-compatible polyline)
        dispatch(addTollCost(data.route));
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching TollGuru-compatible polyline:', error);
      });
  };

  if (userLatitude === null || userLongitude === null) {
    return <div>Loading..........</div>;
  }
  return (
    <div id="leafletMapContainer">
      <MapContainer center={position} zoom={15} id="mapContainer">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* Marker for current location  */}
        <Marker position={[userLatitude, userLongitude]} icon={redMarker}>
          <Popup>My current location 📍</Popup>
        </Marker>
        {overpassData &&
          overpassData.elements &&
          overpassData.elements.map((ele) => {
            const destination = [ele.lat, ele.lon];
            return (
              <Marker
                key={ele.id}
                position={destination}
                eventHandlers={{ click: (e) => handleMarkerClick(e) }}
              >
                <Popup>Your destination 🚗</Popup>
              </Marker>
            );
          })}
        {routePolyline && (
          <Polyline
            pathOptions={{ color: 'blue' }}
            positions={decodedCoordinates}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
