import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Components
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import CreateLekka from './components/Lekka/CreateLekka';
import LekkaDetails from './components/Lekka/LekkaDetails';
import ConfirmLekka from './components/Lekka/ConfirmLekka';
import Friends from './components/Friends/Friends';
import Profile from './components/Profile/Profile';
import GroupPool from './components/Group/GroupPool';
import Navbar from './components/Layout/Navbar';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const handleLogin = (token, userData) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>
        <p>Loading Lekka...</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="app">
        {isAuthenticated && <Navbar user={user} onLogout={handleLogout} />}
        
        <Routes>
          {/* Public Routes */}
          <Route 
            path="/login" 
            element={
              isAuthenticated ? 
              <Navigate to="/dashboard" /> : 
              <Login onLogin={handleLogin} />
            } 
          />
          <Route 
            path="/register" 
            element={
              isAuthenticated ? 
              <Navigate to="/dashboard" /> : 
              <Register onRegister={handleLogin} />
            } 
          />
          
          {/* Confirmation link - public */}
          <Route path="/confirm/:linkId" element={<ConfirmLekka />} />
          
          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              isAuthenticated ? 
              <Dashboard user={user} /> : 
              <Navigate to="/login" />
            } 
          />
          <Route 
            path="/create" 
            element={
              isAuthenticated ? 
              <CreateLekka user={user} /> : 
              <Navigate to="/login" />
            } 
          />
          <Route 
            path="/lekka/:id" 
            element={
              isAuthenticated ? 
              <LekkaDetails user={user} /> : 
              <Navigate to="/login" />
            } 
          />
          <Route 
            path="/friends" 
            element={
              isAuthenticated ? 
              <Friends user={user} /> : 
              <Navigate to="/login" />
            } 
          />
          <Route 
            path="/profile" 
            element={
              isAuthenticated ? 
              <Profile user={user} onLogout={handleLogout} /> : 
              <Navigate to="/login" />
            } 
          />
          <Route 
            path="/group" 
            element={
              isAuthenticated ? 
              <GroupPool user={user} /> : 
              <Navigate to="/login" />
            } 
          />
          
          {/* Default Route */}
          <Route 
            path="/" 
            element={
              isAuthenticated ? 
              <Navigate to="/dashboard" /> : 
              <Navigate to="/login" />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
