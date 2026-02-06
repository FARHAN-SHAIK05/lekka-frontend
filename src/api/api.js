 import axios from 'axios';

// Base URL for your Java backend
const API_BASE_URL = 'http://localhost:8081/auth';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: (userData) =>
    api.post('/register', {
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      password: userData.password,
      confirmPassword: userData.confirmPassword,
    }),
  login: (credentials) =>
    api.post('/login', {
      email: credentials.email,
      password: credentials.password,
    }),
  logout: () => api.post('/logout'),
  getCurrentUser: () => api.get('/me'),
};

// Lekka APIs
export const lekkaAPI = {
  createLekka: (lekkaData) => api.post('/lekkas', lekkaData),
  getAllLekkas: () => api.get('/lekkas'),
  getLekkaById: (id) => api.get(`/lekkas/${id}`),
  updateLekka: (id, data) => api.put(`/lekkas/${id}`, data),
  deleteLekka: (id) => api.delete(`/lekkas/${id}`),
  confirmLekka: (linkId, data) => api.post(`/lekkas/confirm/${linkId}`, data),
  settleLekka: (id) => api.post(`/lekkas/${id}/settle`),
  sendReminder: (id) => api.post(`/lekkas/${id}/remind`),
  uploadProof: (id, formData) =>
    api.post(`/lekkas/${id}/proof`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
};

// Friend APIs
export const friendAPI = {
  getAllFriends: () => api.get('/friends'),
  addFriend: (friendData) => api.post('/friends', friendData),
  getFriendById: (id) => api.get(`/friends/${id}`),
  updateFriend: (id, data) => api.put(`/friends/${id}`, data),
  deleteFriend: (id) => api.delete(`/friends/${id}`),
  getNetBalance: (friendId) => api.get(`/friends/${friendId}/balance`),
};

// Group Pool APIs
export const groupAPI = {
  createGroup: (groupData) => api.post('/groups', groupData),
  getAllGroups: () => api.get('/groups'),
  getGroupById: (id) => api.get(`/groups/${id}`),
  addContribution: (groupId, contributionData) =>
    api.post(`/groups/${groupId}/contribute`, contributionData),
  closeGroup: (id) => api.post(`/groups/${id}/close`),
};

// Statistics APIs
export const statsAPI = {
  getDashboardStats: () => api.get('/stats/dashboard'),
  getMonthlyStats: () => api.get('/stats/monthly'),
  getFriendStats: (friendId) => api.get(`/stats/friend/${friendId}`),
};

// Notification APIs
export const notificationAPI = {
  getNotifications: () => api.get('/notifications'),
  markAsRead: (id) => api.put(`/notifications/${id}/read`),
  markAllAsRead: () => api.put('/notifications/read-all'),
};

export default api;