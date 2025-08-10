import React, {useState} from "react";
import "./StatTeam.css"; // 스타일 파일 임포트

// 조별리그 순위 계산 함수
function calculateGroupStandings(group) {
  const standings = {};

  // 팀 초기화
  group.teams.forEach((team) => {
    standings[team] = {
      name: team,
      wins: 0,
      losses: 0,
      pointsFor: 0,
      pointsAgainst: 0,
      games: 0,
    };
  });

  // 경기 결과 반영
  group.matches.forEach((match) => {
    if (match.homeScore !== null && match.awayScore !== null) {
      standings[match.home].pointsFor += match.homeScore;
      standings[match.home].pointsAgainst += match.awayScore;
      standings[match.home].games++;

      standings[match.away].pointsFor += match.awayScore;
      standings[match.away].pointsAgainst += match.homeScore;
      standings[match.away].games++;

      if (match.winner === match.home) {
        standings[match.home].wins++;
        standings[match.away].losses++;
      } else {
        standings[match.away].wins++;
        standings[match.home].losses++;
      }
    }
  });

  // 승률 계산 및 순위 정렬
  const sortedStandings = Object.values(standings)
    .map((team) => ({
      ...team,
      winRate: team.games > 0 ? ((team.wins / team.games) * 100).toFixed(1) : 0,
      pointsDiff: team.pointsFor - team.pointsAgainst,
    }))
    .sort((a, b) => {
      if (a.wins !== b.wins) return b.wins - a.wins;
      return b.pointsDiff - a.pointsDiff;
    });

  return sortedStandings;
}

// 그룹 순위표 컴포넌트 (분리됨)
export function GroupStandings({ group, teams = [] }) {
  const standings = calculateGroupStandings(group);

    const getRankClass = (index) => {
    switch (index) {
      case 0: return 'rank-1st'; // 1위 - 금색
      case 1: return 'rank-2nd'; // 2위 - 은색  
      case 2: return 'rank-3rd'; // 3위 - 동색
      case 3: return 'rank-4th'; // 4위 - 파란색
      default: return '';
    }
  };

  return (
    <div className="group-standings-container">
      <div className="group-standings">
        <div className="standings-header">
          <div className="standings-cell">순위</div>
          <div className="standings-cell"></div>
          <div className="standings-cell team-cell title">팀 이름</div>
          <div className="standings-cell">승</div>
          <div className="standings-cell">패</div>
          <div className="standings-cell">승률</div>
          <div className="standings-cell">득점</div>
          <div className="standings-cell">실점</div>
        </div>
        {standings.map((team, index) => {
          const teamInfo = teams.find((t) => t.name === team.name);
          return (
            <div key={team.name} className={`standings-row ${getRankClass(index)}`}>
              <div className="standings-cell rank-cell">{index + 1}</div>
              <div className="standings-cell logo-cell">
                {teamInfo?.logo && (
                  <img
                    src={teamInfo.logo}
                    alt={`${team.name} 로고`}
                    className="team-logo"
                  />
                )}
              </div>
              <div className="standings-cell team-cell">{team.name}</div>
              <div className="standings-cell stat-cell">{team.wins}</div>
              <div className="standings-cell stat-cell">{team.losses}</div>
              <div className="standings-cell stat-cell">{team.winRate}%</div>
              <div className="standings-cell stat-cell">{team.pointsFor}</div>
              <div className="standings-cell stat-cell">{team.pointsAgainst}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// 개별 경기 컴포넌트
function MatchRow({match, teams = []}) {
  const homeTeam = teams.find((t) => t.name === match.home) || {
    name: match.home,
    logo: "",
  };
  const awayTeam = teams.find((t) => t.name === match.away) || {
    name: match.away,
    logo: "",
  };

  const getScore = () => {
    if (match.homeScore == null || match.awayScore == null) {
      return match.status || "-";
    }
    return `${match.homeScore} : ${match.awayScore}`;
  };

  return (
    <div className="match-row">
      <div className="match-date">{match.date || "-"}</div>
      <div className="match-teams">
        <span className="match-stage">[{match.stage}]</span>
        <div className="team-vs">
          <span
            className={`team-name ${
              match.winner === match.home ? "winner" : ""
            }`}
          >
            {homeTeam.name}
          </span>
          <span className="vs-text">vs</span>
          <span
            className={`team-name ${
              match.winner === match.away ? "winner" : ""
            }`}
          >
            {awayTeam.name}
          </span>
        </div>
      </div>
      <div className="match-score">{getScore()}</div>
      <div className="match-location">{match.location || "-"}</div>
    </div>
  );
}

// 경기 리스트 컴포넌트
function MatchList({matches = [], teams = [], title = "경기 결과"}) {
  return (
    <div className="match-section">
      <h3 className="section-title">{title}</h3>
      <div className="match-list">
        <div className="match-header">
          <div className="header-stage">경기 유형</div>
          <div className="header-summary">경기 요약</div>
          <div className="header-detail">경기 세부 내용</div>
          <div className="header-date">경기 날짜</div>
        </div>
        {matches.map((match, index) => (
          <MatchRow
            key={`${match.stage}-${index}-${match.home}-${match.away}`}
            match={match}
            teams={teams}
          />
        ))}
      </div>
    </div>
  );
}

// 조별리그 경기 결과만 표시하는 컴포넌트
function GroupMatches({group, teams = []}) {
  return (
    <div className="group-matches-container">
      <div className="group-header">
        <h4 className="group-title">{group.name}</h4>
      </div>
      <MatchList matches={group.matches} teams={teams} title="" />
    </div>
  );
}

// 메인 StatTeam 컴포넌트
export default function StatTeam({data, teams = []}) {
  const [selectedDivision, setSelectedDivision] = useState("1부");

  if (!data) {
    return <div className="tournament-status">데이터가 없습니다</div>;
  }

  const currentDivision = data.divisions.find(
    (div) => div.name === selectedDivision
  );

  return (
    <div className="statTeamContainer">
      <div className="tournament-header">
        <div className="division-buttons">
          {data.divisions.map((div) => (
            <button
              key={div.name}
              className={`division-button ${
                selectedDivision === div.name ? "active" : ""
              }`}
              onClick={() => setSelectedDivision(div.name)}
            >
              {div.name}
            </button>
          ))}
        </div>
      </div>

      {/* 선택된 부 내용 */}
      {currentDivision && (
        <div className="division-content">
          {/* 조별리그 */}
          {currentDivision.groups && currentDivision.groups.length > 0 && (
            <div className="tournament-section">
              <div className="groups-container">
                {currentDivision.groups.map((group) => (
                  <div key={group.name} className="group-section">
                    <div className="group-header">
                      {currentDivision.name} {group.name} 순위
                    </div>
                    <div className="standings-section">
                      <GroupStandings group={group} teams={teams} />
                    </div>

                    <div className="matches-section">
                      <h5 className="subsection-title">경기 결과</h5>
                      <GroupMatches group={group} teams={teams} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 플레이오프 */}
          {currentDivision.playoffs &&
            currentDivision.playoffs.length > 0 &&
            (
              <MatchList
                matches={currentDivision.playoffs}
                teams={teams}
                title="플레이오프"
              />
            )}

          {/* 승강전 */}
          {currentDivision.promotionRelegation &&
            currentDivision.promotionRelegation.length > 0 &&
            (
              <MatchList
                matches={currentDivision.promotionRelegation}
                teams={teams}
                title="승강전"
              />
            )}
        </div>
      )}
    </div>
  );
}
