import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="container fade-in" style={styles.page}>
      <div className="glass-panel" style={styles.formContainer}>
        <h2 style={styles.title}>Welcome Back</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input 
            type="email" 
            placeholder="Email Address" 
            value={email}
            onChange={e => setEmail(e.target.value)}
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={e => setPassword(e.target.value)}
            required 
          />
          <button type="submit" className="btn-primary" style={{marginTop: '10px'}}>Login</button>
        </form>
        <p style={styles.footerText}>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  page: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh'
  },
  formContainer: {
    padding: '40px',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center'
  },
  title: {
    marginBottom: '20px',
    color: 'var(--color-primary)'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  error: {
    color: 'var(--color-error)',
    marginBottom: '15px',
    fontSize: '0.9rem'
  },
  footerText: {
    marginTop: '20px',
    fontSize: '0.9rem'
  }
};

export default Login;
