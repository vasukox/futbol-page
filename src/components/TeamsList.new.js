import React from 'react';

const TeamsList = ({ teams }) => {
  if (!teams || teams.length === 0) {
    return <div className="no-data">No hay equipos disponibles</div>;
  }

  const formatWebsite = (website) => {
    if (!website) return 'N/A';
    return website.replace(/^https?:\/\//, '');
  };

  return (
    <div className="teams-container">
      <h3>Equipos de la Liga</h3>
      <div className="teams-grid">
        {teams.map(team => (
          <div key={team.id} className="team-card">
            {team.tla && <span className="team-tla">{team.tla}</span>}
            <img 
              src={team.crest} 
              alt={team.name} 
              className="team-logo"
              onError={(e) => {e.target.src = 'https://via.placeholder.com/120?text=FC'}}
            />
            <h4 className="team-name">{team.name}</h4>
            <div className="team-info">
              <div className="team-info-row">
                <span className="team-info-label">Fundado</span>
                <span className="team-info-value">{team.founded || 'N/A'}</span>
              </div>
              <div className="team-info-row">
                <span className="team-info-label">Estadio</span>
                <span className="team-info-value">{team.venue || 'N/A'}</span>
              </div>
              <div className="team-info-row">
                <span className="team-info-label">Ciudad</span>
                <span className="team-info-value">{team.address || 'N/A'}</span>
              </div>
              <div className="team-info-row">
                <span className="team-info-label">Web</span>
                <span className="team-info-value">
                  {team.website ? (
                    <a 
                      href={team.website} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{color: '#ff0000'}}
                    >
                      {formatWebsite(team.website)}
                    </a>
                  ) : 'N/A'}
                </span>
              </div>
            </div>
            {(team.website || team.address) && (
              <div className="team-social">
                {team.website && (
                  <a 
                    href={team.website} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    title="Sitio web"
                  >
                    🌐
                  </a>
                )}
                {team.address && (
                  <a 
                    href={`https://www.google.com/maps/search/${encodeURIComponent(team.address)}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    title="Ver en mapa"
                  >
                    📍
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamsList;
