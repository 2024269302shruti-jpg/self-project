const Search = require('../models/Search');

// We will implement these service calls shortly.
const { geocode } = require('../services/nominatim');
const { getRoute } = require('../services/osrm');
const { getNearbyPlaces, getRestaurants, getHotels } = require('../services/overpass');

exports.planTravel = async (req, res) => {
  try {
    const { source, destination } = req.body;
    
    // Convert source and dest to lat, lng
    const sourceData = await geocode(source);
    const destData = await geocode(destination);
    
    if (!sourceData || !destData) {
      return res.status(400).json({ message: 'Invalid source or destination' });
    }

    // Save search if user is authenticated
    if (req.user) {
      await Search.create({
        userId: req.user.id,
        source: sourceData.display_name,
        destination: destData.display_name
      });
    }

    // Get Routing from OSRM
    const route = await getRoute(
      [sourceData.lon, sourceData.lat], // format: [lon, lat]
      [destData.lon, destData.lat]
    );

    // Get nearby tourist places at destination (within ~5km)
    const attractions = await getNearbyPlaces(destData.lat, destData.lon);
    
    // Get hotels and restaurants at destination
    const hotels = await getHotels(destData.lat, destData.lon);
    const restaurants = await getRestaurants(destData.lat, destData.lon);

    res.status(200).json({
      route: {
        distance: route.distance, // stored in meters or strings
        duration: route.duration, // stored in seconds or strings
        coordinates: route.coordinates,
        origin: { lat: sourceData.lat, lng: sourceData.lon },
        destination: { lat: destData.lat, lng: destData.lon }
      },
      attractions,
      hotels,
      restaurants
    });
  } catch (error) {
    console.error('Travel planning error:', error);
    res.status(500).json({ message: 'Error planning travel', error: error.message });
  }
};
