 import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../../api/api';
import './Auth.css';

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.login(formData);

      // Log the raw response for debugging
      console.log('Login response:', response);

      const token = response?.data?.token;
      const user = response?.data?.user;
      const success = response?.data?.success;

      if (success && token) {
        // Save token and user in localStorage
        localStorage.setItem('token', token);
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
        }

        // Call parent handler
        onLogin(token, user);

        // Navigate to dashboard
        navigate('/dashboard');
      } else {
        setError(response?.data?.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card fade-in">
        <div className="auth-header">
          <h1 className="logo">LEKK∆</h1>
          <p className="tagline">Welcome back to Lekka</p>
        </div>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-block"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don’t have an account? <Link to="/register">Sign Up</Link>
          </p>
        </div>

        <div className="auth-quote">
          <p>"Trust is the currency of friendship"</p>
          <span>— Powered by Lekka</span>
        </div>
      </div>
    </div>
  );
}

export default Login;