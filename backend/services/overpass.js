const axios = require('axios');
const wikipediaService = require('./wikipedia');

const OVERPASS_URL = 'https://overpass-api.de/api/interpreter';

// Fetches POIs using Overpass query
const fetchPOI = async (lat, lon, tag, radius = 5000) => {
  const query = `
    [out:json][timeout:25];
    (
      node[${tag}](around:${radius},${lat},${lon});
      way[${tag}](around:${radius},${lat},${lon});
      relation[${tag}](around:${radius},${lat},${lon});
    );
    out center limit 20;
  `;

  try {
    const response = await axios.post(OVERPASS_URL, `data=${encodeURIComponent(query)}`, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    if (response.data && response.data.elements) {
      return response.data.elements
        .filter(el => el.tags && el.tags.name)
        .map(el => ({
          id: el.id,
          name: el.tags.name,
          lat: el.lat || el.center.lat,
          lon: el.lon || el.center.lon,
          type: Object.keys(el.tags).find(k => k === 'tourism' || k === 'amenity'),
          tags: el.tags
        }));
    }
    return [];
  } catch (error) {
    console.error('Overpass API Error:', error.message);
    return [];
  }
};

exports.getNearbyPlaces = async (lat, lon) => {
  const places = await fetchPOI(lat, lon, '"tourism"="attraction"', 10000); // 10km radius for attractions
  
  // Try to enrich with Wikipedia
  const enrichedPlaces = await Promise.all(places.map(async (place) => {
    try {
      const wikiQuery = place.tags.wikipedia || place.name;
      const parsedWikiName = wikiQuery.includes(':') ? wikiQuery.split(':')[1] : wikiQuery;
      const wikiData = await wikipediaService.getSummary(parsedWikiName);
      
      return {
        ...place,
        description: wikiData ? wikiData.extract : null,
        image: wikiData ? wikiData.image : null
      };
    } catch (err) {
      return place;
    }
  }));

  return enrichedPlaces;
};

exports.getHotels = async (lat, lon) => {
  return await fetchPOI(lat, lon, '"tourism"="hotel"', 5000);
};

exports.getRestaurants = async (lat, lon) => {
  return await fetchPOI(lat, lon, '"amenity"="restaurant"', 5000);
};
