const axios = require('axios');

// format ranges: start [lon, lat], end [lon, lat]
exports.getRoute = async (start, end) => {
  try {
    // OSRM requires coordinates in longitude,latitude order
    const coordinatesStr = `${start[0]},${start[1]};${end[0]},${end[1]}`;
    const url = `http://router.project-osrm.org/route/v1/driving/${coordinatesStr}`;
    
    const response = await axios.get(url, {
      params: {
        overview: 'full',
        geometries: 'geojson'
      }
    });

    if (response.data && response.data.routes && response.data.routes.length > 0) {
      const route = response.data.routes[0];
      return {
        distance: route.distance, // in meters
        duration: route.duration, // in seconds
        coordinates: route.geometry.coordinates // GeoJSON: Array of [lon, lat]
      };
    }
    return null;
  } catch (error) {
    console.error('OSRM Route Error:', error.message);
    throw new Error('Failed to get routing info');
  }
};
