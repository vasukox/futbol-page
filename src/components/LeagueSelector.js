import React from 'react';

const LeagueSelector = ({ competitions, onLeagueChange, selectedLeague }) => {
  // filtramos solo las ligas más relevantes
  const mainLeagues = competitions.filter(comp => 
    [2001, 2021, 2014, 2019, 2002, 2015].includes(comp.id) 
    // Champions, Premier League, La Liga, Serie A, Bundesliga, Ligue 1
  );

  return (
    <div className="league-selector">
      <h3>Selecciona una Liga:</h3>
      <select 
        value={selectedLeague || ''} 
        onChange={(e) => onLeagueChange(e.target.value)}
        className="league-select"
      >
        <option value="">-- Elige una liga --</option>
        {mainLeagues.map((comp) => (
          <option key={comp.id} value={comp.id}>
            {comp.name} ({comp.area?.name})
          </option>
        ))}
      </select>
    </div>
  );
};

export default LeagueSelector;