import StatTeam from "../../../../../components/Stat/StatTeam";
import {FALL_2024_DATA, TEAMS} from "../../../../../data/fall2024";

const LeagueTeamPage = () => {
  return <StatTeam data={FALL_2024_DATA} teams={TEAMS} />;
};
export default LeagueTeamPage;
