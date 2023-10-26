import axios from "axios";

export default async function fetchRoster(leagueId: string, teamId: string) {
  const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
  const response = await axios.get(
    `https://fantasysports.yahooapis.com/fantasy/v2/team/${leagueId}.${teamId}/roster;week=1`,
    {
      headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
    }
  );
  return response.data; // Process data to get player IDs
}
