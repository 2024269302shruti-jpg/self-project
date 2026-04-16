import React, { useState } from 'react';

const SearchForm = ({ onSearch, loading }) => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (source && destination) {
      onSearch(source, destination);
    }
  };

  return (
    <div className="glass-panel" style={styles.formContainer}>
      <h2 style={styles.title}>Plan Your Trip</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Where are you starting?</label>
          <input 
            type="text" 
            placeholder="e.g. Mumbai" 
            value={source}
            onChange={(e) => setSource(e.target.value)}
            required
          />
        </div>
        
        <div style={styles.inputGroup}>
          <label style={styles.label}>Where do you want to go?</label>
          <input 
            type="text" 
            placeholder="e.g. Pune" 
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" className="btn-primary" disabled={loading} style={styles.btn}>
          {loading ? 'Searching...' : 'Explore Route'}
        </button>
      </form>
    </div>
  );
};

const styles = {
  formContainer: {
    padding: '30px',
    borderRadius: '20px',
    width: '100%',
    maxWidth: '500px',
  },
  title: {
    marginBottom: '20px',
    color: 'var(--color-primary)',
    textAlign: 'center'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    textAlign: 'left'
  },
  label: {
    fontWeight: 600,
    fontSize: '0.9rem',
    color: 'var(--color-text)'
  },
  btn: {
    marginTop: '10px',
    padding: '12px',
    fontSize: '1.1rem'
  }
};

export default SearchForm;
