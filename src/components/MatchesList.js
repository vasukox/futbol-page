import React, { useState } from 'react';

const MatchesList = ({ matches }) => {
  const [filter, setFilter] = useState('all'); // 'all', 'finished', 'scheduled'

  if (!matches || matches.length === 0) {
    return (
      <div className="no-data">
        <span className="no-data-icon">⚽</span>
        <p>No hay partidos disponibles</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    // Si es hoy
    if (date.toDateString() === today.toDateString()) {
      return `Hoy, ${date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}`;
    }
    // Si es ayer
    if (date.toDateString() === yesterday.toDateString()) {
      return `Ayer, ${date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}`;
    }
    // Para otras fechas
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusLabel = (status) => {
    const statusMap = {
      'SCHEDULED': 'Programado',
      'LIVE': 'EN VIVO',
      'IN_PLAY': 'EN JUEGO',
      'PAUSED': 'DESCANSO',
      'FINISHED': 'Finalizado',
      'POSTPONED': 'Pospuesto',
      'CANCELLED': 'Cancelado'
    };
    return statusMap[status] || status;
  };

  const filteredMatches = matches.filter(match => {
    if (filter === 'finished') return match.status === 'FINISHED';
    if (filter === 'scheduled') return match.status !== 'FINISHED';
    return true;
  });

  // Agrupar partidos por fecha
  const matchesByDate = filteredMatches.reduce((groups, match) => {
    const date = new Date(match.utcDate).toLocaleDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(match);
    return groups;
  }, {});

  return (
    <div className="matches-container">
      <div className="matches-header">
        <h2>⚽ Resultados y Calendario</h2>
        <div className="matches-filters">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Todos
          </button>
          <button 
            className={`filter-btn ${filter === 'finished' ? 'active' : ''}`}
            onClick={() => setFilter('finished')}
          >
            Finalizados
          </button>
          <button 
            className={`filter-btn ${filter === 'scheduled' ? 'active' : ''}`}
            onClick={() => setFilter('scheduled')}
          >
            Próximos
          </button>
        </div>
      </div>

      <div className="matches-list">
        {Object.entries(matchesByDate).map(([date, dateMatches]) => (
          <div key={date} className="match-group">
            <div className="match-date-header">{formatDate(dateMatches[0].utcDate)}</div>
            {dateMatches.map(match => (
              <div key={match.id} className={`match-card ${match.status.toLowerCase()}`}>
                <div className="match-info">
                  <div className="match-time">
                    {new Date(match.utcDate).toLocaleTimeString('es-ES', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                  <div className="match-status-badge">
                    {match.status === 'LIVE' && <span className="live-dot"></span>}
                    {getStatusLabel(match.status)}
                  </div>
                </div>
                
                <div className="match-teams">
                  <div className="team home">
                    <span className="team-name">{match.homeTeam.name}</span>
                    {match.status === 'FINISHED' && (
                      <span className="team-score">{match.score.fullTime.home}</span>
                    )}
                  </div>
                  
                  {match.status !== 'FINISHED' && (
                    <div className="match-versus">VS</div>
                  )}
                  
                  <div className="team away">
                    {match.status === 'FINISHED' && (
                      <span className="team-score">{match.score.fullTime.away}</span>
                    )}
                    <span className="team-name">{match.awayTeam.name}</span>
                  </div>
                </div>
                
                {(match.status === 'LIVE' || match.status === 'IN_PLAY') && (
                  <div className="match-live-indicator">
                    EN VIVO
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchesList;