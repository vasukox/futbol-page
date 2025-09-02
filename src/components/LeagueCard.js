import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const LeagueCard = ({ league, onSelectLeague }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    onSelectLeague(league.id);
    navigate('/equipos');
  };

  return (
    <div className="league-card" onClick={handleClick}>
      <img 
        src={league.emblem} 
        alt={`Logo de ${league.name}`} 
        className="league-logo"
      />
      <h3>{league.name}</h3>
      <p>{league.area.name}</p>
      <button className="ver-mas-btn">
        Ver más
      </button>
    </div>
  );
};

export default LeagueCard;