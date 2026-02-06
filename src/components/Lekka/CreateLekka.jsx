 import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { lekkaAPI, friendAPI } from '../../api/api';
import './Lekka.css';

function CreateLekka({ user }) {
  const [formData, setFormData] = useState({
    friendId: '',
    friendName: '',
    friendPhone: '',
    amount: '',
    type: 'lent', // lent or borrowed
    description: '',
    dueDate: '',
  });

  const [friends, setFriends] = useState([]);
  const [isNewFriend, setIsNewFriend] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetchFriends();
  }, []);

  const fetchFriends = async () => {
    try {
      const response = await friendAPI.getAllFriends();
      setFriends(response.data);
    } catch (error) {
      console.error('Error fetching friends:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setError('');
  };

  const handleFriendSelect = (e) => {
    const friendId = e.target.value;

    if (friendId === 'new') {
      setIsNewFriend(true);
      setFormData({
        ...formData,
        friendId: '',
        friendName: '',
        friendPhone: '',
      });
    } else {
      setIsNewFriend(false);
      const selectedFriend = friends.find(
        (f) => f.id === parseInt(friendId)
      );

      setFormData({
        ...formData,
        friendId: friendId,
        friendName: selectedFriend?.name || '',
        friendPhone: selectedFriend?.phone || '',
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      setError('Please enter a valid amount');
      setLoading(false);
      return;
    }

    try {
      const lekkaData = {
        friendId: isNewFriend ? null : formData.friendId,
        friendName: formData.friendName,
        friendPhone: formData.friendPhone,
        amount: parseFloat(formData.amount),
        type: formData.type,
        description: formData.description,
        dueDate: formData.dueDate || null,
      };

      // ✅ Removed unused "response"
      await lekkaAPI.createLekka(lekkaData);

      setSuccess(
        'Lekka created successfully! Confirmation link sent to your friend.'
      );

      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create Lekka');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-lekka">
      <div className="container">
        <div className="create-header fade-in">
          <h1>⚡ Drop a Lekka</h1>
          <p>Log it in 5 seconds. Evidence stays local.</p>
        </div>

        <div className="create-form-wrapper fade-in">
          <div className="card">
            {error && <div className="alert alert-error">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Select Friend</label>
                <select
                  className="form-control"
                  onChange={handleFriendSelect}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Choose a friend
                  </option>

                  {friends.map((friend) => (
                    <option key={friend.id} value={friend.id}>
                      {friend.name}
                    </option>
                  ))}

                  <option value="new">+ Add New Friend</option>
                </select>
              </div>

              {isNewFriend && (
                <>
                  <div className="form-group">
                    <label htmlFor="friendName">Friend's Name</label>
                    <input
                      type="text"
                      id="friendName"
                      name="friendName"
                      className="form-control"
                      placeholder="Rahul Sharma"
                      value={formData.friendName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="friendPhone">Friend's Phone</label>
                    <input
                      type="tel"
                      id="friendPhone"
                      name="friendPhone"
                      className="form-control"
                      placeholder="+91 98765 43210"
                      value={formData.friendPhone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </>
              )}

              <div className="form-group">
                <label>Transaction Type</label>
                <div className="type-selector">
                  <button
                    type="button"
                    className={`type-btn ${
                      formData.type === 'lent' ? 'active' : ''
                    }`}
                    onClick={() =>
                      setFormData({ ...formData, type: 'lent' })
                    }
                  >
                    <span className="type-icon positive">+</span>
                    <div>
                      <strong>I Gave</strong>
                      <p>They owe you</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    className={`type-btn ${
                      formData.type === 'borrowed' ? 'active' : ''
                    }`}
                    onClick={() =>
                      setFormData({ ...formData, type: 'borrowed' })
                    }
                  >
                    <span className="type-icon negative">-</span>
                    <div>
                      <strong>I Took</strong>
                      <p>You owe them</p>
                    </div>
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="amount">Amount (₹)</label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  className="form-control amount-input"
                  placeholder="2000"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                  min="1"
                  step="1"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description (Optional)</label>
                <textarea
                  id="description"
                  name="description"
                  className="form-control"
                  placeholder="What was this for? (e.g., Dinner at cafe, Movie tickets)"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label htmlFor="dueDate">Due Date (Optional)</label>
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  className="form-control"
                  value={formData.dueDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate('/dashboard')}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Creating...' : 'Create Lekka'}
                </button>
              </div>
            </form>
          </div>

          <div className="info-card card">
            <h3>💡 How it works</h3>
            <ul>
              <li>📝 Create the Lekka with details</li>
              <li>🔗 We send a confirmation link to your friend</li>
              <li>✅ They tap to confirm (no app needed)</li>
              <li>🔔 We handle the reminders</li>
            </ul>

            <div className="quote">
              <p>
                "The Strategy: You don't ask for money back. You just blame the
                app."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateLekka;
