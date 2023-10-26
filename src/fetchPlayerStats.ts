import axios from 'axios';

export default async function fetchPlayerStats(playerId: string) {
    const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
    const response = await axios.get(`https://fantasysports.yahooapis.com/fantasy/v2/player/${LEAGUE_ID}.p.${playerId}/stats`, {
      headers: { 'Authorization': `Bearer ${ACCESS_TOKEN}` }
    });
    return response.data; // Process data to get stats
  }