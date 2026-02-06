import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { lekkaAPI } from '../../api/api';
import './Lekka.css';

function LekkaDetails({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lekka, setLekka] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showProofUpload, setShowProofUpload] = useState(false);
  const [proofFile, setProofFile] = useState(null);

  useEffect(() => {
    fetchLekkaDetails();
  }, [id]);

  const fetchLekkaDetails = async () => {
    try {
      const response = await lekkaAPI.getLekkaById(id);
      setLekka(response.data);
    } catch (error) {
      setError('Failed to load Lekka details');
      console.error('Error fetching lekka:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendReminder = async () => {
    try {
      await lekkaAPI.sendReminder(id);
      alert('Reminder sent successfully!');
      fetchLekkaDetails();
    } catch (error) {
      alert('Failed to send reminder');
    }
  };

  const handleMarkSettled = async () => {
    if (window.confirm('Are you sure you want to mark this Lekka as settled?')) {
      try {
        await lekkaAPI.settleLekka(id);
        alert('Lekka marked as settled!');
        fetchLekkaDetails();
      } catch (error) {
        alert('Failed to settle Lekka');
      }
    }
  };

  const handleProofUpload = async (e) => {
    e.preventDefault();
    if (!proofFile) return;

    const formData = new FormData();
    formData.append('proof', proofFile);

    try {
      await lekkaAPI.uploadProof(id, formData);
      alert('Proof uploaded successfully!');
      setShowProofUpload(false);
      setProofFile(null);
      fetchLekkaDetails();
    } catch (error) {
      alert('Failed to upload proof');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this Lekka?')) {
      try {
        await lekkaAPI.deleteLekka(id);
        alert('Lekka deleted successfully!');
        navigate('/dashboard');
      } catch (error) {
        alert('Failed to delete Lekka');
      }
    }
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: { class: 'badge-warning', text: 'Waiting Confirmation' },
      confirmed: { class: 'badge-success', text: 'Confirmed' },
      settled: { class: 'badge-success', text: 'Settled ✓' },
    };
    return badges[status] || badges.pending;
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loader"></div>
      </div>
    );
  }

  if (error || !lekka) {
    return (
      <div className="container">
        <div className="alert alert-error">{error || 'Lekka not found'}</div>
        <Link to="/dashboard" className="btn btn-primary">Go to Dashboard</Link>
      </div>
    );
  }

  const statusBadge = getStatusBadge(lekka.status);

  return (
    <div className="lekka-details">
      <div className="container">
        <div className="lekka-header fade-in">
          <Link to="/dashboard" className="back-btn">
            ← Back to Dashboard
          </Link>
        </div>

        <div className="lekka-main-card card fade-in">
          <div className="lekka-amount-display">
            <h2 className={lekka.type === 'lent' ? 'positive' : 'negative'}>
              {lekka.type === 'lent' ? '+' : '-'}
              {formatAmount(lekka.amount)}
            </h2>
            <span className={`badge ${statusBadge.class}`}>
              {statusBadge.text}
            </span>
          </div>

          <div className="lekka-details-grid">
            <div className="detail-item">
              <span className="detail-label">Friend</span>
              <span className="detail-value">{lekka.friendName}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Type</span>
              <span className="detail-value">
                {lekka.type === 'lent' ? 'You Lent' : 'You Borrowed'}
              </span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Created</span>
              <span className="detail-value">
                {new Date(lekka.createdAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </div>

            {lekka.dueDate && (
              <div className="detail-item">
                <span className="detail-label">Due Date</span>
                <span className="detail-value">
                  {new Date(lekka.dueDate).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              </div>
            )}

            {lekka.description && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <span className="detail-label">Description</span>
                <span className="detail-value">{lekka.description}</span>
              </div>
            )}

            {lekka.confirmationLink && lekka.status === 'pending' && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <span className="detail-label">Confirmation Link</span>
                <span className="detail-value" style={{ wordBreak: 'break-all' }}>
                  {window.location.origin}/confirm/{lekka.confirmationLink}
                </span>
              </div>
            )}
          </div>

          <div className="action-buttons">
            {lekka.status === 'pending' && (
              <button className="btn btn-primary" onClick={handleSendReminder}>
                🔔 Send Reminder
              </button>
            )}
            
            {lekka.status === 'confirmed' && (
              <>
                <button className="btn btn-primary" onClick={() => setShowProofUpload(!showProofUpload)}>
                  📸 Upload Proof
                </button>
                <button className="btn btn-primary" onClick={handleMarkSettled}>
                  ✓ Mark as Settled
                </button>
              </>
            )}

            <button className="btn btn-danger" onClick={handleDelete}>
              🗑️ Delete
            </button>
          </div>

          {showProofUpload && (
            <div style={{ padding: '24px', borderTop: '1px solid var(--border-color)' }}>
              <form onSubmit={handleProofUpload}>
                <div className="form-group">
                  <label>Upload Payment Proof</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={(e) => setProofFile(e.target.files[0])}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Upload
                </button>
              </form>
            </div>
          )}
        </div>

        {lekka.timeline && lekka.timeline.length > 0 && (
          <div className="timeline card fade-in">
            <h3>Activity Timeline</h3>
            {lekka.timeline.map((item, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-icon">{item.icon}</div>
                <div className="timeline-content">
                  <h4>{item.action}</h4>
                  <p>{item.description}</p>
                  <span className="timeline-date">
                    {new Date(item.timestamp).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default LekkaDetails;
