import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { lekkaAPI, statsAPI } from '../../api/api';
import './Dashboard.css';

function Dashboard({ user }) {
  const [stats, setStats] = useState({
    totalLekkas: 0,
    netBalance: 0,
    pendingLekkas: 0,
    totalTracked: 0,
  });
  const [recentLekkas, setRecentLekkas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsResponse, lekkasResponse] = await Promise.all([
        statsAPI.getDashboardStats(),
        lekkaAPI.getAllLekkas(),
      ]);

      setStats(statsResponse.data);
      setRecentLekkas(lekkasResponse.data.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'badge-warning',
      confirmed: 'badge-success',
      settled: 'badge-success',
    };
    return badges[status] || 'badge-warning';
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header fade-in">
          <div>
            <h1>Hey {user.name}! 👋</h1>
            <p className="subtitle">Here's your Lekka summary</p>
          </div>
          <Link to="/create" className="btn btn-primary">
            + Add Lekka
          </Link>
        </div>

        <div className="stats-grid grid grid-2 fade-in">
          <div className="stat-card card">
            <div className="stat-icon" style={{ color: 'var(--primary-color)' }}>₹</div>
            <div className="stat-content">
              <h3 className={stats.netBalance >= 0 ? 'positive' : 'negative'}>
                {formatAmount(Math.abs(stats.netBalance))}
              </h3>
              <p>Net Balance</p>
              <span className="stat-label">
                {stats.netBalance >= 0 ? 'You are owed' : 'You owe'}
              </span>
            </div>
          </div>

          <div className="stat-card card">
            <div className="stat-icon" style={{ color: 'var(--warning)' }}>⏳</div>
            <div className="stat-content">
              <h3>{stats.pendingLekkas}</h3>
              <p>Pending Lekkas</p>
              <span className="stat-label">Waiting for confirmation</span>
            </div>
          </div>

          <div className="stat-card card">
            <div className="stat-icon" style={{ color: 'var(--success)' }}>📊</div>
            <div className="stat-content">
              <h3>{stats.totalLekkas}</h3>
              <p>Total Lekkas</p>
              <span className="stat-label">All time</span>
            </div>
          </div>

          <div className="stat-card card">
            <div className="stat-icon" style={{ color: '#00ccff)' }}>💰</div>
            <div className="stat-content">
              <h3>{formatAmount(stats.totalTracked)}</h3>
              <p>Total Tracked</p>
              <span className="stat-label">Money managed</span>
            </div>
          </div>
        </div>

        <div className="recent-lekkas fade-in">
          <div className="section-header">
            <h2>Recent Lekkas</h2>
            <Link to="/friends" className="btn btn-secondary">View All</Link>
          </div>

          {recentLekkas.length === 0 ? (
            <div className="empty-state card">
              <div className="empty-state-icon">📝</div>
              <h3>No Lekkas Yet</h3>
              <p>Start by adding your first Lekka</p>
              <Link to="/create" className="btn btn-primary">
                Create Lekka
              </Link>
            </div>
          ) : (
            <div className="lekka-list">
              {recentLekkas.map((lekka) => (
                <Link 
                  to={`/lekka/${lekka.id}`} 
                  key={lekka.id} 
                  className="lekka-item card"
                >
                  <div className="lekka-avatar">
                    {lekka.friendName.charAt(0).toUpperCase()}
                  </div>
                  <div className="lekka-info">
                    <h4>{lekka.friendName}</h4>
                    <p className="lekka-date">
                      {new Date(lekka.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                    <span className={`badge ${getStatusBadge(lekka.status)}`}>
                      {lekka.status}
                    </span>
                  </div>
                  <div className={`lekka-amount ${lekka.type === 'borrowed' ? 'negative' : 'positive'}`}>
                    {lekka.type === 'borrowed' ? '-' : '+'}
                    {formatAmount(lekka.amount)}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="quick-actions fade-in">
          <h3>Quick Actions</h3>
          <div className="action-grid grid grid-3">
            <Link to="/create" className="action-card card">
              <div className="action-icon">⚡</div>
              <h4>Drop a Lekka</h4>
              <p>Log it in 5 seconds</p>
            </Link>
            <Link to="/friends" className="action-card card">
              <div className="action-icon">👥</div>
              <h4>View Friends</h4>
              <p>See net balances</p>
            </Link>
            <Link to="/group" className="action-card card">
              <div className="action-icon">🎁</div>
              <h4>Gift Pool</h4>
              <p>Track group expenses</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
