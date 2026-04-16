import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchForm from '../components/SearchForm';
import api from '../services/api';

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (source, destination) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/travel/plan', { source, destination });
      // Pass the data via state to the results route
      navigate('/results', { state: { data: response.data, source, destination } });
    } catch (err) {
      console.error(err);
      setError('Failed to fetch route. Please check the locations and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container fade-in" style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.heading}>Discover your next adventure.</h1>
        <p style={styles.subheading}>Enter your starting point and destination to find the best routes, tourist attractions, and places to stay.</p>
        
        {error && <div style={styles.errorCard}>{error}</div>}
        
        <div style={styles.formWrapper}>
          <SearchForm onSearch={handleSearch} loading={loading} />
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '70vh',
  },
  hero: {
    textAlign: 'center',
    maxWidth: '800px',
  },
  heading: {
    fontSize: '3.5rem',
    fontWeight: 800,
    color: 'var(--color-primary)',
    marginBottom: '15px',
    lineHeight: 1.2
  },
  subheading: {
    fontSize: '1.2rem',
    color: 'var(--color-text-light)',
    marginBottom: '40px'
  },
  formWrapper: {
    display: 'flex',
    justifyContent: 'center'
  },
  errorCard: {
    backgroundColor: '#fff3f3',
    color: 'var(--color-error)',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '20px',
    border: '1px solid var(--color-error)'
  }
};

export default Home;
