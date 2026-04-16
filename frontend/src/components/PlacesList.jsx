import React from 'react';

const PlacesList = ({ title, places, type }) => {
  if (!places || places.length === 0) return null;

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>{title}</h3>
      <div style={styles.grid}>
        {places.map((place, idx) => (
          <div key={idx} className="glass-panel" style={styles.card}>
            {place.image && (
              <img src={place.image} alt={place.name} style={styles.image} />
            )}
            <div style={styles.content}>
              <h4 style={styles.name}>{place.name}</h4>
              {place.description && (
                <p style={styles.description}>
                  {place.description.substring(0, 100)}...
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    marginBottom: '40px'
  },
  title: {
    marginBottom: '15px',
    color: 'var(--color-primary)',
    borderBottom: '2px solid var(--color-primary-light)',
    display: 'inline-block',
    paddingBottom: '5px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px'
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    transition: 'transform 0.3s ease',
    cursor: 'pointer',
  },
  image: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderTopLeftRadius: '16px',
    borderTopRightRadius: '16px'
  },
  content: {
    padding: '15px'
  },
  name: {
    fontSize: '1.1rem',
    marginBottom: '8px',
    color: 'var(--color-text)'
  },
  description: {
    fontSize: '0.9rem',
    color: 'var(--color-text-light)'
  }
};

export default PlacesList;
