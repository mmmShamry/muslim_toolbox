import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './style.css';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">🕌</span>
          <span className="logo-text">Muslim Toolbox</span>
        </Link>
        
        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/prayer-times" 
            className={`nav-link ${location.pathname === '/prayer-times' ? 'active' : ''}`}
          >
            Prayer Times
          </Link>
          <Link 
            to="/zakat-calculator" 
            className={`nav-link ${location.pathname === '/zakat-calculator' ? 'active' : ''}`}
          >
            Zakat Calculator
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 