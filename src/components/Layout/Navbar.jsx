import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar({ user, onLogout }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/dashboard" className="nav-logo">
          LEKK∆
        </Link>

        <button 
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <Link 
            to="/dashboard" 
            className={`nav-link ${isActive('/dashboard')}`}
            onClick={() => setMenuOpen(false)}
          >
            <span className="nav-icon">🏠</span>
            Dashboard
          </Link>
          <Link 
            to="/friends" 
            className={`nav-link ${isActive('/friends')}`}
            onClick={() => setMenuOpen(false)}
          >
            <span className="nav-icon">👥</span>
            Friends
          </Link>
          <Link 
            to="/group" 
            className={`nav-link ${isActive('/group')}`}
            onClick={() => setMenuOpen(false)}
          >
            <span className="nav-icon">🎁</span>
            Groups
          </Link>
          <Link 
            to="/profile" 
            className={`nav-link ${isActive('/profile')}`}
            onClick={() => setMenuOpen(false)}
          >
            <span className="nav-icon">⚙️</span>
            Profile
          </Link>
          <Link 
            to="/create" 
            className="nav-link nav-cta"
            onClick={() => setMenuOpen(false)}
          >
            + Add Lekka
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
