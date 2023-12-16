import React from 'react';
import './Map.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
const Map = () => {
  // Default cordinates
  const position = [51.505, -0.09];
  return (
    <div id="leafletMapContainer">
      <MapContainer center={position} zoom={13} id="mapContainer">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            A sample Popup. <br /> Easily customizable.{' '}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
