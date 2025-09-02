import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import WebForgeLogo from './WebForgeLogo';
import { SunIcon, MoonIcon } from './ThemeIcons';
import { HomeIcon, TrophyIcon } from './UIIcons';
import '../App.css';

const Header = () => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.body.classList.add('dark-mode');
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  return (
    <header className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="home-link">
          <WebForgeLogo className="header-logo" />
        </Link>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/" className="nav-link">
                <HomeIcon />
                <span>Inicio</span>
              </Link>
            </li>
            <li>
              <Link to="/ligas" className="nav-link">
                <TrophyIcon />
                <span>Ligas</span>
              </Link>
            </li>
          </ul>
        </nav>
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Cambiar tema">
          <div className="theme-toggle-circle">
            {darkMode ? <MoonIcon /> : <SunIcon />}
          </div>
        </button>
      </div>
    </header>
  );
};
export default Header;