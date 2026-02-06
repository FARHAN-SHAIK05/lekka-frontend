 import React, { useState } from 'react';
import { authAPI } from '../../api/api';
import './Profile.css';

function Profile({ user, onLogout, setUser }) {
  const [editing, setEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // -----------------------------
  // Handle Input Change
  // -----------------------------
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // -----------------------------
  // Update Profile
  // -----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await authAPI.updateProfile(formData);

      const updatedUser = response.data;

      // Update parent state
      if (setUser) {
        setUser(updatedUser);
      }

      // Save in localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));

      setMessage('Profile updated successfully!');
      setEditing(false);
    } catch (err) {
      console.error(err);
      setError('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // Cancel Edit
  // -----------------------------
  const handleCancel = () => {
    setEditing(false);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
    });
  };

  return (
    <div className="profile-page">
      <div className="container">

        {/* Header */}
        <div className="profile-header fade-in">
          <h1>Profile Settings</h1>
          <p className="subtitle">Manage your account</p>
        </div>

        <div className="profile-grid">

          {/* Profile Card */}
          <div className="profile-card card fade-in">

            <div className="profile-avatar-large">
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>

            <h2>{user?.name}</h2>
            <p>{user?.email}</p>

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
                  <div className="alert alert-success">{message}</div>
                )}

                {error && (
                  <div className="alert alert-error">{error}</div>
                )}

                {/* Name */}
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Email */}
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Phone */}
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
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
                    onClick={handleCancel}
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

          {/* Settings Card */}
          <div className="settings-card card fade-in">
            <h3>Account Settings</h3>

            <div className="setting-item">
              <div className="setting-info">
                <h4>Privacy</h4>
                <p>Your data is encrypted</p>
              </div>
              <span className="badge badge-success">✓ Secure</span>
            </div>

            <div className="divider"></div>

            <div className="setting-item">
              <div className="setting-info">
                <h4>Notifications</h4>
                <p>Get reminders for pending Lekkas</p>
              </div>
              <label className="toggle">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="divider"></div>

            <div className="setting-item">
              <div className="setting-info">
                <h4>Auto Reminders</h4>
                <p>Send reminders automatically</p>
              </div>
              <label className="toggle">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="divider"></div>

            <button
              className="btn btn-danger"
              onClick={onLogout}
              style={{ width: '100%', marginTop: '24px' }}
            >
              Logout
            </button>
          </div>

          {/* Stats Card */}
          <div className="stats-card card fade-in">
            <h3>Your Stats</h3>

            <div className="stat-list">

              <div className="stat-row">
                <span>Member Since</span>
                <strong>
                  {new Date(user?.createdAt || Date.now())
                    .toLocaleDateString('en-IN', {
                      month: 'short',
                      year: 'numeric',
                    })}
                </strong>
              </div>

              <div className="stat-row">
                <span>Total Lekkas</span>
                <strong>{user?.totalLekkas || 0}</strong>
              </div>

              <div className="stat-row">
                <span>Friends</span>
                <strong>{user?.totalFriends || 0}</strong>
              </div>

              <div className="stat-row">
                <span>Settled</span>
                <strong>{user?.settledLekkas || 0}</strong>
              </div>

            </div>
          </div>

        </div>

        {/* Info Box */}
        <div className="info-box card fade-in">
          <h3>💚 About Lekka</h3>
          <p>
            "₹2,000 in cash, priceless in trust. Your friend didn't ask for proof —
            don't make them regret it."
          </p>
          <p style={{ marginTop: '12px', fontSize: '14px', color: 'var(--text-secondary)' }}>
            Lekka keeps friendships strong while making the math clear.
          </p>
        </div>

      </div>
    </div>
  );
}

export default Profile;
