import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import LeagueCard from './components/LeagueCard';
import TeamsList from './components/TeamsList';
import MatchesList from './components/MatchesList';
import StandingsTable from './components/StandingsTable';
import LoadingSpinner from './components/LoadingSpinner';
import LeagueNavigation from './components/LeagueNavigation';
import WelcomePage from './components/WelcomePage';
import { footballAPI } from './services/footballAPI';
import './App.css';

function App() {
  const [competitions, setCompetitions] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState(null);
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    loadCompetitions();
  }, []);

  const loadCompetitions = async () => {
    try {
      setLoading(true);
      const data = await footballAPI.getCompetitions();
      setCompetitions(data.competitions || []);
    } catch (err) {
      console.error(err);
      setError("Error cargando ligas");
    } finally {
      setLoading(false);
    }
  };

  const handleLeagueChange = async (leagueId) => {
    if (!leagueId) return;
    
    setSelectedLeague(leagueId);
    setLoading(true);
    setError(null);

    try {
      const [teamsData, matchesData, standingsData] = await Promise.all([
        footballAPI.getTeams(leagueId),
        footballAPI.getMatches(leagueId),
        footballAPI.getStandings(leagueId)
      ]);

      setTeams(teamsData.teams || []);
      setMatches(matchesData.matches || []);
      setStandings(standingsData.standings || []);
      
      // Navegar a la vista de equipos después de seleccionar una liga
      navigate('/liga/equipos');
    } catch (err) {
      console.error(err);
      setError("Error cargando los datos de la liga");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/*" element={
          <>
            <Header />
            <div className="app-content">
              {loading && <LoadingSpinner />}
              {error && <div className="error-message">{error}</div>}
              <Routes>
                <Route path="/ligas" element={
                  <div>
                    {competitions.length > 0 && (
                      <>
                        <h2 className="text-center">Las Mejores Ligas del Mundo</h2>
                        <div className="league-cards-container">
                          {competitions
                            .filter(l => [2001, 2021, 2014, 2019, 2002].includes(l.id))
                            .map((league) => (
                              <LeagueCard 
                                key={league.id} 
                                league={league}
                                onSelectLeague={handleLeagueChange}
                              />
                            ))}
                        </div>
                      </>
                    )}
                  </div>
                } />

                <Route path="/liga/*" element={
                  !selectedLeague ? (
                    <Navigate to="/ligas" replace />
                  ) : (
                    <>
                      <LeagueNavigation 
                        selectedLeague={selectedLeague} 
                        competitions={competitions}
                      />
                      <Routes>
                        <Route path="/equipos" element={
                          !loading && !error && <TeamsList teams={teams} />
                        } />
                        <Route path="/resultados" element={
                          !loading && !error && <MatchesList matches={matches} />
                        } />
                        <Route path="/clasificacion" element={
                          !loading && !error && <StandingsTable standings={standings} />
                        } />
                      </Routes>
                    </>
                  )
                } />

                <Route path="*" element={<Navigate to="/ligas" />} />
              </Routes>
            </div>
          </>
        } />
      </Routes>
    </div>
  );
}

export default App;