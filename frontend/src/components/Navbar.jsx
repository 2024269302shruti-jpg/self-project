import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.navbar} className="glass-panel">
      <div className="container" style={styles.navContainer}>
        <Link to="/" style={styles.logo}>🌍 SmartPlanner</Link>
        <div style={styles.links}>
          {user ? (
            <>
              <span style={styles.welcome}>Hi, {user.name}</span>
              <button onClick={handleLogout} className="btn-secondary">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" style={styles.link}>Login</Link>
              <Link to="/signup" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    padding: '15px 0',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    marginBottom: '30px',
    borderRadius: '0 0 16px 16px',
    borderTop: 'none'
  },
  navContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 800,
  },
  links: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
  },
  link: {
    fontWeight: 600,
  },
  welcome: {
    fontWeight: 600,
    color: 'var(--color-primary-light)' // updated color just for fun
  }
};

export default Navbar;
