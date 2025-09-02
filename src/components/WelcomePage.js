import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WebForgeLogo from './WebForgeLogo';
import '../App.css';

const WelcomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <div className="welcome-logo" role="banner">
          <WebForgeLogo className="main-logo" />
        </div>
        <h1 className="welcome-subtitle">Tu portal definitivo de fútbol</h1>
        <button 
          className="explore-button"
          onClick={() => navigate('/ligas')}
          aria-label="Explorar ligas de fútbol"
        >
          EXPLORAR LIGAS
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
