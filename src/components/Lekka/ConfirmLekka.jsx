import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { lekkaAPI } from '../../api/api';
import './Lekka.css';

function ConfirmLekka() {
  const { linkId } = useParams();
  const [lekka, setLekka] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    fetchLekkaByLink();
  }, [linkId]);

  const fetchLekkaByLink = async () => {
    try {
      const response = await lekkaAPI.confirmLekka(linkId, { action: 'view' });
      setLekka(response.data);
    } catch (error) {
      setError('Invalid or expired confirmation link');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    setConfirming(true);
    setError('');

    try {
      await lekkaAPI.confirmLekka(linkId, { 
        action: 'confirm',
        name: name || lekka.friendName
      });
      setConfirmed(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to confirm Lekka');
    } finally {
      setConfirming(false);
    }
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
      <div className="auth-container">
        <div className="loader"></div>
      </div>
    );
  }

  if (error && !lekka) {
    return (
      <div className="auth-container">
        <div className="auth-card fade-in">
          <div className="auth-header">
            <h1 className="logo">LEKK∆</h1>
          </div>
          <div className="alert alert-error">{error}</div>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
            This link may have expired or been used already.
          </p>
        </div>
      </div>
    );
  }

  if (confirmed) {
    return (
      <div className="auth-container">
        <div className="auth-card fade-in">
          <div className="auth-header">
            <h1 className="logo">LEKK∆</h1>
            <div style={{ fontSize: '4rem', margin: '20px 0' }}>✅</div>
            <h2>Lekka Confirmed!</h2>
            <p className="tagline">
              Thanks for keeping it clear. No awkwardness needed.
            </p>
          </div>

          <div className="card" style={{ marginTop: '24px', textAlign: 'center' }}>
            <h3>Transaction Details</h3>
            <div style={{ margin: '20px 0' }}>
              <h2 className={lekka.type === 'lent' ? 'positive' : 'negative'}>
                {formatAmount(lekka.amount)}
              </h2>
              <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
                {lekka.type === 'lent' ? 'You owe' : 'You are owed by'} {lekka.creatorName}
              </p>
            </div>
            {lekka.description && (
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                For: {lekka.description}
              </p>
            )}
          </div>

          <div className="auth-quote">
            <p>"The Strategy: You don't ask for money back. You just blame the app."</p>
            <span>— The Lekka Philosophy</span>
          </div>

          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <a href="https://lekka-app.vercel.app" className="btn btn-primary">
              Get Lekka App
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card fade-in">
        <div className="auth-header">
          <h1 className="logo">LEKK∆</h1>
          <p className="tagline">Confirm Your Lekka</p>
        </div>

        <div className="card" style={{ marginBottom: '24px', textAlign: 'center' }}>
          <h3>{lekka.creatorName} added a Lekka</h3>
          <div style={{ margin: '20px 0' }}>
            <h2 className={lekka.type === 'lent' ? 'negative' : 'positive'}>
              {formatAmount(lekka.amount)}
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
              {lekka.type === 'lent' ? 'You owe' : 'You are owed by'} {lekka.creatorName}
            </p>
          </div>
          {lekka.description && (
            <div style={{ 
              padding: '12px', 
              background: 'var(--secondary-color)', 
              borderRadius: '8px',
              marginTop: '16px'
            }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
                <strong>For:</strong> {lekka.description}
              </p>
            </div>
          )}
          {lekka.dueDate && (
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '12px' }}>
              Due by: {new Date(lekka.dueDate).toLocaleDateString('en-IN')}
            </p>
          )}
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleConfirm}>
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              className="form-control"
              placeholder={lekka.friendName || 'Enter your name'}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <small style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>
              Optional: Confirm or update your name
            </small>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-block"
            disabled={confirming}
          >
            {confirming ? 'Confirming...' : '✓ Yes, I Confirm This Lekka'}
          </button>
        </form>

        <div className="auth-quote">
          <p>"No app needed for your friends to confirm"</p>
          <span>— Just one tap</span>
        </div>
      </div>
    </div>
  );
}

export default ConfirmLekka;
