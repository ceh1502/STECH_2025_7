import StatLeague from "../../../../../components/Stat/StatTeam";
import {FALL_2024_DATA, TEAMS} from "../../../../../data/fall2024";

const LeaguePage = () => {
  return <StatLeague data={FALL_2024_DATA} teams={TEAMS} />;
};
export default LeaguePage;
