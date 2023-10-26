import fetchRoster from "./fetchRoster";
import fetchPlayerStats from "./fetchPlayerStats";
import calculatePoints from "./calculatePoints";

(async () => {
  const leagueId = "leagueID";
  const teamId = "teamID";
  const roster = await fetchRoster(leagueId, teamId);
  let totalPoints = 0;

  for (const player of roster) {
    const stats = await fetchPlayerStats(player.id);
    const points = calculatePoints(stats);
    totalPoints += points;
  }

  console.log(`Total Hypothetical Points: ${totalPoints}`);
})();
