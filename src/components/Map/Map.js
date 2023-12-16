import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './Map.css';
import L from 'leaflet';
import useCurrentLocation from '../../customHooks/useCurrentLocation';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

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
  const { userLatitude, userLongitude } = useCurrentLocation();
  const position = [userLatitude, userLongitude];
  const searchbyTextValue = useSelector(
    (state) => state.overpassData.locationData
  );

  useEffect(() => {
    const overpassApi = async () => {
      const overpassQuery = `[out:json];
    (
      node["amenity"=${searchbyTextValue}](around:10000, USER_LATITUDE, USER_LONGITUDE);
    );
    out center;`;

      console.log(searchbyTextValue);

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
      console.log(userLatitude, userLongitude);
      console.log(data);
    };

    if (userLatitude !== null || userLongitude !== null) {
      overpassApi();
    }
  }, [userLatitude, userLongitude, searchbyTextValue]);

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
              <Marker key={ele.id} position={destination}>
                <Popup>
                  A sample Popup. <br /> Easily customizable.{' '}
                </Popup>
              </Marker>
            );
          })}
      </MapContainer>
    </div>
  );
};

export default Map;
