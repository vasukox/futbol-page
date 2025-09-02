import React from 'react';

const StandingsTable = ({ standings }) => {
  if (!standings || standings.length === 0) {
    return <div className="no-data">No hay clasificación disponible</div>;
  }

  const table = standings[0]?.table || [];

  return (
    <div className="standings-container">
      <h3>Clasificación</h3>
      <div className="standings-table">
        <table>
          <thead>
            <tr>
              <th className="position-cell">Pos</th>
              <th>Equipo</th>
              <th className="stats-cell">PJ</th>
              <th className="stats-cell">G</th>
              <th className="stats-cell">E</th>
              <th className="stats-cell">P</th>
              <th className="points-cell">Pts</th>
              <th className="stats-cell">GF</th>
              <th className="stats-cell">GC</th>
              <th className="stats-cell">DG</th>
            </tr>
          </thead>
          <tbody>
            {table.map(row => (
              <tr key={row.team.id}>
                <td className="position-cell">{row.position}</td>
                <td className="team-cell">
                  <img src={row.team.crest} alt={row.team.name} className="team-logo-tiny" />
                  <span className="team-name">{row.team.name}</span>
                </td>
                <td className="stats-cell">{row.playedGames}</td>
                <td className="stats-cell">{row.won}</td>
                <td className="stats-cell">{row.draw}</td>
                <td className="stats-cell">{row.lost}</td>
                <td className="points-cell">{row.points}</td>
                <td className="stats-cell">{row.goalsFor}</td>
                <td className="stats-cell">{row.goalsAgainst}</td>
                <td className="stats-cell">{row.goalDifference}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StandingsTable;