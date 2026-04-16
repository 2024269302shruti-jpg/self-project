import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to auto-fit map bounds to polyline
function MapBounds({ positions }) {
  const map = useMap();
  useEffect(() => {
    if (positions.length > 0) {
      map.fitBounds(positions, { padding: [50, 50] });
    }
  }, [map, positions]);
  return null;
}

const MapView = ({ route, origin, destination }) => {
  if (!route || !route.coordinates) return null;

  // OSRM returns coordinates as [lon, lat], we need [lat, lon] for Leaflet
  const polylinePositions = route.coordinates.map(coord => [coord[1], coord[0]]);

  return (
    <div className="glass-panel" style={styles.mapContainer}>
      <MapContainer 
        center={[origin.lat, origin.lng]} 
        zoom={13} 
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%', borderRadius: '15px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <Marker position={[origin.lat, origin.lng]} />
        <Marker position={[destination.lat, destination.lng]} />
        
        <Polyline positions={polylinePositions} pathOptions={{ color: 'var(--color-primary)', weight: 5 }} />
        
        <MapBounds positions={polylinePositions} />
      </MapContainer>
    </div>
  );
};

const styles = {
  mapContainer: {
    height: '400px',
    width: '100%',
    padding: '10px',
    marginBottom: '20px'
  }
};

export default MapView;
