 import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { lekkaAPI, friendAPI } from '../../api/api';
import './Lekka.css';

function CreateLekka({ user }) {

  const [formData, setFormData] = useState({
    friendId: '',
    friendName: '',
    friendPhone: '',
    amount: '',
    type: 'lent',
    description: '',
    dueDate: '',
  });

  const [friends, setFriends] = useState([]);
  const [isNewFriend, setIsNewFriend] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  // ✅ Wrapped in useCallback
  const fetchFriends = useCallback(async () => {
    try {
      const response = await friendAPI.getAllFriends();
      setFriends(response.data);
    } catch (error) {
      console.error('Error fetching friends:', error);
    }
  }, []);

  // ✅ Proper dependency
  useEffect(() => {
    fetchFriends();
  }, [fetchFriends]);

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
                  <option value="" disabled>Choose a friend</option>

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
                    <label>Friend's Name</label>
                    <input
                      type="text"
                      name="friendName"
                      className="form-control"
                      value={formData.friendName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Friend's Phone</label>
                    <input
                      type="tel"
                      name="friendPhone"
                      className="form-control"
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
                    className={`type-btn ${formData.type === 'lent' ? 'active' : ''}`}
                    onClick={() =>
                      setFormData({ ...formData, type: 'lent' })
                    }
                  >
                    <span className="type-icon positive">+</span>
                    <strong>I Gave</strong>
                  </button>

                  <button
                    type="button"
                    className={`type-btn ${formData.type === 'borrowed' ? 'active' : ''}`}
                    onClick={() =>
                      setFormData({ ...formData, type: 'borrowed' })
                    }
                  >
                    <span className="type-icon negative">-</span>
                    <strong>I Took</strong>
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>Amount (₹)</label>
                <input
                  type="number"
                  name="amount"
                  className="form-control"
                  value={formData.amount}
                  onChange={handleChange}
                  min="1"
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  className="form-control"
                  value={formData.dueDate}
                  onChange={handleChange}
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

        </div>
      </div>
    </div>
  );
}

export default CreateLekka;
