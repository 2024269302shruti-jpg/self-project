import React from 'react';

const RouteCard = ({ route, source, destination }) => {
  const distanceKm = (route.distance / 1000).toFixed(2);
  
  // duration is in seconds
  const hours = Math.floor(route.duration / 3600);
  const minutes = Math.floor((route.duration % 3600) / 60);

  return (
    <div className="glass-panel" style={styles.card}>
      <h3 style={styles.title}>Trip Overview</h3>
      <div style={styles.details}>
        <div style={styles.row}>
          <span style={styles.label}>From:</span>
          <span style={styles.value}>{source}</span>
        </div>
        <div style={styles.row}>
          <span style={styles.label}>To:</span>
          <span style={styles.value}>{destination}</span>
        </div>
        <div style={styles.stats}>
          <div style={styles.statBox}>
            <span style={styles.statIcon}>📏</span>
            <span style={styles.statValue}>{distanceKm} km</span>
          </div>
          <div style={styles.statBox}>
            <span style={styles.statIcon}>⏱️</span>
            <span style={styles.statValue}>
              {hours > 0 ? `${hours}h ` : ''}{minutes}m
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    padding: '20px',
    marginBottom: '20px',
  },
  title: {
    marginBottom: '15px',
    color: 'var(--color-primary)',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    paddingBottom: '10px'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  row: {
    display: 'flex',
    gap: '10px',
    fontSize: '1.1rem'
  },
  label: {
    fontWeight: 'bold',
    color: 'var(--color-text-light)',
    minWidth: '50px'
  },
  value: {
    fontWeight: '600'
  },
  stats: {
    display: 'flex',
    gap: '20px',
    marginTop: '15px'
  },
  statBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'rgba(255,255,255,0.5)',
    padding: '10px 15px',
    borderRadius: '10px',
    fontWeight: 'bold'
  },
  statIcon: {
    fontSize: '1.2rem'
  }
};

export default RouteCard;
