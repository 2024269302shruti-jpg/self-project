import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import RouteCard from '../components/RouteCard';
import MapView from '../components/MapView';
import PlacesList from '../components/PlacesList';

const Results = () => {
  const location = useLocation();
  const { data, source, destination } = location.state || {};

  if (!data) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container fade-in" style={styles.page}>
      <h1 style={styles.heading}>Your Trip Details</h1>
      
      <div style={styles.layout}>
        <div style={styles.leftCol}>
          <RouteCard route={data.route} source={source} destination={destination} />
          <MapView route={data.route} origin={data.route.origin} destination={data.route.destination} />
        </div>
        
        <div style={styles.rightCol}>
          <PlacesList title="Top Attractions" places={data.attractions} type="attraction" />
          <PlacesList title="Recommended Hotels" places={data.hotels} type="hotel" />
          <PlacesList title="Local Restaurants" places={data.restaurants} type="restaurant" />
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    paddingBottom: '50px'
  },
  heading: {
    fontSize: '2.5rem',
    color: 'var(--color-primary)',
    marginBottom: '30px',
    textAlign: 'center'
  },
  layout: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
  },
  leftCol: {
    flex: '1'
  },
  rightCol: {
    flex: '1'
  }
};

export default Results;
