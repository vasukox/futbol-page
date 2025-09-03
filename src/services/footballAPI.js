const BASE_URL = 'https://api.football-data.org/v4';

const getHeaders = () => ({
  'X-Auth-Token': process.env.REACT_APP_FOOTBALL_KEY
});

export const footballAPI = {
  getCompetitions: async () => {
    const res = await fetch(`${BASE_URL}/competitions`, { headers: getHeaders() });
    if (!res.ok) throw new Error('Error cargando competiciones');
    return res.json();
  },

  getTeams: async (competitionId) => {
    const res = await fetch(`${BASE_URL}/competitions/${competitionId}/teams`, { headers: getHeaders() });
    if (!res.ok) throw new Error('Error cargando equipos');
    return res.json();
  },

  getMatches: async (competitionId) => {
    const res = await fetch(`${BASE_URL}/competitions/${competitionId}/matches`, { headers: getHeaders() });
    if (!res.ok) throw new Error('Error cargando partidos');
    return res.json();
  },

  getStandings: async (competitionId) => {
    const res = await fetch(`${BASE_URL}/competitions/${competitionId}/standings`, { headers: getHeaders() });
    if (!res.ok) throw new Error('Error cargando clasificación');
    return res.json();
  }
};