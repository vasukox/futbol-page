const API_KEY = '4f3547500227494983ceb69268cd2b78'; // tu token de Football-Data
const BASE_URL = '/api';

const headers = {
  'X-Auth-Token': API_KEY,
  'Content-Type': 'application/json'
};

export const footballAPI = {
  getCompetitions: async () => {
    const res = await fetch(`${BASE_URL}/competitions`, { headers });
    if (!res.ok) throw new Error('Error cargando competiciones');
    return res.json();
  },

  getTeams: async (competitionId) => {
    const res = await fetch(`${BASE_URL}/competitions/${competitionId}/teams`, { headers });
    if (!res.ok) throw new Error('Error cargando equipos');
    return res.json();
  },

  getMatches: async (competitionId) => {
    const res = await fetch(`${BASE_URL}/competitions/${competitionId}/matches`, { headers });
    if (!res.ok) throw new Error('Error cargando partidos');
    return res.json();
  },

  getStandings: async (competitionId) => {
    const res = await fetch(`${BASE_URL}/competitions/${competitionId}/standings`, { headers });
    if (!res.ok) throw new Error('Error cargando clasificación');
    return res.json();
  }
};