import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { groupAPI } from '../../api/api';
import './Group.css';

function GroupPool({ user }) {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newGroup, setNewGroup] = useState({
    name: '',
    description: '',
    targetAmount: '',
  });

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await groupAPI.getAllGroups();
      setGroups(response.data);
    } catch (error) {
      console.error('Error fetching groups:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    try {
      await groupAPI.createGroup({
        ...newGroup,
        targetAmount: parseFloat(newGroup.targetAmount),
      });
      setShowCreateModal(false);
      setNewGroup({ name: '', description: '', targetAmount: '' });
      fetchGroups();
    } catch (error) {
      alert('Failed to create group');
    }
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getProgress = (collected, target) => {
    return Math.min((collected / target) * 100, 100);
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="group-page">
      <div className="container">
        <div className="group-header fade-in">
          <div>
            <h1>🎁 Gift Pools</h1>
            <p className="subtitle">Track group expenses and contributions</p>
          </div>
          <button 
            className="btn btn-primary"
            onClick={() => setShowCreateModal(true)}
          >
            + Create Pool
          </button>
        </div>

        {groups.length === 0 ? (
          <div className="empty-state card fade-in">
            <div className="empty-state-icon">🎁</div>
            <h3>No Gift Pools Yet</h3>
            <p>Create a pool to track group expenses for birthdays, trips, or shared purchases</p>
            <button 
              className="btn btn-primary"
              onClick={() => setShowCreateModal(true)}
            >
              Create Your First Pool
            </button>
          </div>
        ) : (
          <div className="groups-grid grid grid-2 fade-in">
            {groups.map(group => (
              <div key={group.id} className="group-card card">
                <div className="group-header-content">
                  <h3>{group.name}</h3>
                  <span className={`badge ${group.status === 'active' ? 'badge-success' : 'badge-warning'}`}>
                    {group.status}
                  </span>
                </div>
                
                {group.description && (
                  <p className="group-description">{group.description}</p>
                )}

                <div className="group-progress">
                  <div className="progress-info">
                    <span className="collected">{formatAmount(group.collected)}</span>
                    <span className="target">of {formatAmount(group.targetAmount)}</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${getProgress(group.collected, group.targetAmount)}%` }}
                    ></div>
                  </div>
                  <div className="progress-percentage">
                    {Math.round(getProgress(group.collected, group.targetAmount))}% collected
                  </div>
                </div>

                <div className="group-stats">
                  <div className="stat-box">
                    <span className="stat-icon">👥</span>
                    <div>
                      <strong>{group.contributors || 0}</strong>
                      <p>Contributors</p>
                    </div>
                  </div>
                  <div className="stat-box">
                    <span className="stat-icon">💰</span>
                    <div>
                      <strong>{formatAmount(group.targetAmount - group.collected)}</strong>
                      <p>Remaining</p>
                    </div>
                  </div>
                </div>

                <div className="group-actions">
                  <Link to={`/group/${group.id}`} className="btn btn-secondary">
                    View Details
                  </Link>
                  {group.status === 'active' && (
                    <button className="btn btn-primary">
                      + Contribute
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {showCreateModal && (
          <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
            <div className="modal-content card" onClick={(e) => e.stopPropagation()}>
              <h2>Create Gift Pool</h2>
              <form onSubmit={handleCreateGroup}>
                <div className="form-group">
                  <label htmlFor="name">Pool Name</label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    placeholder="Priya's Birthday Gift"
                    value={newGroup.name}
                    onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    className="form-control"
                    placeholder="Gift for Priya's 25th birthday"
                    value={newGroup.description}
                    onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                    rows="3"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="targetAmount">Target Amount (₹)</label>
                  <input
                    type="number"
                    id="targetAmount"
                    className="form-control"
                    placeholder="5000"
                    value={newGroup.targetAmount}
                    onChange={(e) => setNewGroup({ ...newGroup, targetAmount: e.target.value })}
                    required
                    min="1"
                  />
                </div>

                <div className="form-actions">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setShowCreateModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Create Pool
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="use-cases-card card fade-in">
          <h3>💡 Perfect for</h3>
          <div className="use-cases-grid">
            <div className="use-case">
              <span className="use-case-icon">🎂</span>
              <h4>Birthday Gifts</h4>
              <p>Pool money for a special gift</p>
            </div>
            <div className="use-case">
              <span className="use-case-icon">✈️</span>
              <h4>Trip Expenses</h4>
              <p>Track who paid for what</p>
            </div>
            <div className="use-case">
              <span className="use-case-icon">🏠</span>
              <h4>Roommate Bills</h4>
              <p>Split rent, WiFi, utilities</p>
            </div>
            <div className="use-case">
              <span className="use-case-icon">🍕</span>
              <h4>Group Orders</h4>
              <p>Split dinner or party costs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupPool;
