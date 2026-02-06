import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { friendAPI } from '../../api/api';
import './Friends.css';

function Friends({ user }) {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchFriends();
  }, []);

  const fetchFriends = async () => {
    try {
      const response = await friendAPI.getAllFriends();
      setFriends(response.data);
    } catch (error) {
      console.error('Error fetching friends:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(Math.abs(amount));
  };

  const filteredFriends = friends.filter(friend => {
    if (filter === 'all') return true;
    if (filter === 'owing') return friend.netBalance < 0;
    if (filter === 'owed') return friend.netBalance > 0;
    return true;
  });

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="friends-page">
      <div className="container">
        <div className="friends-header fade-in">
          <div>
            <h1>Friends & Balances</h1>
            <p className="subtitle">Track who owes what</p>
          </div>
          <Link to="/create" className="btn btn-primary">
            + Add Lekka
          </Link>
        </div>

        <div className="filter-tabs fade-in">
          <button 
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Friends
          </button>
          <button 
            className={`filter-tab ${filter === 'owed' ? 'active' : ''}`}
            onClick={() => setFilter('owed')}
          >
            They Owe You
          </button>
          <button 
            className={`filter-tab ${filter === 'owing' ? 'active' : ''}`}
            onClick={() => setFilter('owing')}
          >
            You Owe Them
          </button>
        </div>

        {filteredFriends.length === 0 ? (
          <div className="empty-state card fade-in">
            <div className="empty-state-icon">👥</div>
            <h3>No Friends Yet</h3>
            <p>Add your first Lekka to start tracking</p>
            <Link to="/create" className="btn btn-primary">
              Create Lekka
            </Link>
          </div>
        ) : (
          <div className="friends-list fade-in">
            {filteredFriends.map(friend => (
              <div key={friend.id} className="friend-card card">
                <div className="friend-avatar">
                  {friend.name.charAt(0).toUpperCase()}
                </div>
                <div className="friend-info">
                  <h3>{friend.name}</h3>
                  <p className="friend-phone">{friend.phone}</p>
                  <div className="friend-stats">
                    <span className="stat-item">
                      📊 {friend.totalLekkas} Lekkas
                    </span>
                    <span className="stat-item">
                      ⏳ {friend.pendingLekkas} Pending
                    </span>
                  </div>
                </div>
                <div className="friend-balance">
                  <div className={`balance-amount ${friend.netBalance >= 0 ? 'positive' : 'negative'}`}>
                    {friend.netBalance >= 0 ? '+' : '-'}
                    {formatAmount(friend.netBalance)}
                  </div>
                  <p className="balance-label">
                    {friend.netBalance >= 0 ? 'They owe you' : 'You owe them'}
                  </p>
                  <Link to={`/create?friend=${friend.id}`} className="btn btn-secondary btn-sm">
                    + Add Lekka
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Friends;
