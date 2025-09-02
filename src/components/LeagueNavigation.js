import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const LeagueNavigation = ({ selectedLeague, competitions }) => {
  const location = useLocation();
  
  if (!selectedLeague) return null;
  
  const league = competitions.find(comp => comp.id === selectedLeague);
  if (!league) return null;

  return (
    <div className="league-navigation">
      <div className="league-info">
        <img src={league.emblem} alt={league.name} className="league-nav-logo" />
        <h2>{league.name}</h2>
      </div>
      <nav className="league-nav">
        <NavLink 
          to="/liga/equipos"
          className={({ isActive }) => isActive ? 'active' : ''}
        >
          Equipos
        </NavLink>
        <NavLink 
          to="/liga/resultados"
          className={({ isActive }) => isActive ? 'active' : ''}
        >
          Resultados
        </NavLink>
        <NavLink 
          to="/liga/clasificacion"
          className={({ isActive }) => isActive ? 'active' : ''}
        >
          Clasificación
        </NavLink>
      </nav>
    </div>
  );
};

export default LeagueNavigation;
