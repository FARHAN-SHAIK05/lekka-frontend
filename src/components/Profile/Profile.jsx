import React, { useState } from 'react';
import { authAPI } from '../../api/api';
import './Profile.css';

function Profile({ user, onLogout }) {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // API call would go here
      setMessage('Profile updated successfully!');
      setEditing(false);
      
      // Update local storage
      const updatedUser = { ...user, ...formData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      setMessage('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header fade-in">
          <h1>Profile Settings</h1>
          <p className="subtitle">Manage your account</p>
        </div>

        <div className="profile-grid">
          <div className="profile-card card fade-in">
            <div className="profile-avatar-large">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            
            {!editing ? (
              <button 
                className="btn btn-primary"
                onClick={() => setEditing(true)}
              >
                Edit Profile
              </button>
            ) : (
              <form onSubmit={handleSubmit}>
                {message && (
                  <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-error'}`}>
                    {message}
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="form-control"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-actions">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => {
                      setEditing(false);
                      setFormData({
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                      });
                    }}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="settings-card card fade-in">
            <h3>Account Settings</h3>
            
            <div className="setting-item">
              <div className="setting-info">
                <h4>Privacy</h4>
                <p>Your data stays on your device</p>
              </div>
              <span className="badge badge-success">✓ Secure</span>
            </div>

            <div className="divider"></div>

            <div className="setting-item">
              <div className="setting-info">
                <h4>Notifications</h4>
                <p>Get reminded about pending Lekkas</p>
              </div>
              <label className="toggle">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="divider"></div>

            <div className="setting-item">
              <div className="setting-info">
                <h4>Auto-reminders</h4>
                <p>Automatically send reminders</p>
              </div>
              <label className="toggle">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="divider"></div>

            <button className="btn btn-danger" onClick={onLogout} style={{ width: '100%', marginTop: '24px' }}>
              Logout
            </button>
          </div>

          <div className="stats-card card fade-in">
            <h3>Your Stats</h3>
            <div className="stat-list">
              <div className="stat-row">
                <span>Member Since</span>
                <strong>{new Date(user.createdAt || Date.now()).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</strong>
              </div>
              <div className="stat-row">
                <span>Total Lekkas</span>
                <strong>{user.totalLekkas || 0}</strong>
              </div>
              <div className="stat-row">
                <span>Friends</span>
                <strong>{user.totalFriends || 0}</strong>
              </div>
              <div className="stat-row">
                <span>Settled</span>
                <strong>{user.settledLekkas || 0}</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="info-box card fade-in">
          <h3>💚 About Lekka</h3>
          <p>
            "₹2,000 in cash, priceless in trust. Your friend didn't ask for proof — don't make them regret it."
          </p>
          <p style={{ marginTop: '12px', fontSize: '14px', color: 'var(--text-secondary)' }}>
            Lekka keeps your friendships intact while making sure the math is clear. 
            No more awkward money conversations. Just clarity.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
