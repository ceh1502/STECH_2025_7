import StatTeam from '../../../../../components/Stat/StatTeam';
import { FALL_2024_DATA, TEAMS } from '../../../../../data/fall2024';

const GuestLeaguePage = () => {
    return (
        <div>
            <StatTeam
                data={FALL_2024_DATA}
                teams={TEAMS}

                />
        </div>
    );
}
export default GuestLeaguePage;