import StatTeam from '../../../../../components/Stat/StatTeam';
import { FALL_2024_DATA, TEAMS } from '../../../../../data/fall2024';

const GuestLeagueTeamPage = () => {
    return (
        <div>
            <StatTeam
                data={FALL_2024_DATA}
                teams={TEAMS}
                showLogos={true}
                labels={{
                    groupStage: "조별리그",
                    playoffs: "플레이오프",
                    promotion: "승강전",
                    date: "날짜",
                    place: "장소",
                }}
                />
        </div>
    );
}
export default GuestLeagueTeamPage;