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
      draws: 0,
      losses: 0,
      points: 0, // 승점
      pointsFor: 0,
      pointsAgainst: 0,
      games: 0,
    };
  });

  // 경기 결과 반영
  group.matches.forEach((match) => {
    if (match.homeScore !== null && match.awayScore !== null) {
      // 득점/실점 기록
      standings[match.home].pointsFor += match.homeScore;
      standings[match.home].pointsAgainst += match.awayScore;
      standings[match.home].games++;
      
      standings[match.away].pointsFor += match.awayScore;
      standings[match.away].pointsAgainst += match.homeScore;
      standings[match.away].games++;

      // 승부 결과에 따른 승점 부여
      if (match.homeScore > match.awayScore) {
        // 홈팀 승리
        standings[match.home].wins++;
        standings[match.home].points += 3;
        standings[match.away].losses++;
        standings[match.away].points += 0;
      } else if (match.homeScore < match.awayScore) {
        // 원정팀 승리
        standings[match.away].wins++;
        standings[match.away].points += 3;
        standings[match.home].losses++;
        standings[match.home].points += 0;
      } else {
        // 무승부
        standings[match.home].draws++;
        standings[match.home].points += 1;
        standings[match.away].draws++;
        standings[match.away].points += 1;
      }
    }
  });

  // 상호 전적 계산 함수 (승점 동률 시 사용)
  function getHeadToHeadRecord(teamA, teamB) {
    const h2h = {
      [teamA]: { points: 0, pointsFor: 0, pointsAgainst: 0 },
      [teamB]: { points: 0, pointsFor: 0, pointsAgainst: 0 }
    };

    group.matches.forEach((match) => {
      if ((match.home === teamA && match.away === teamB) || 
          (match.home === teamB && match.away === teamA)) {
        if (match.homeScore !== null && match.awayScore !== null) {
          h2h[match.home].pointsFor += match.homeScore;
          h2h[match.home].pointsAgainst += match.awayScore;
          h2h[match.away].pointsFor += match.awayScore;
          h2h[match.away].pointsAgainst += match.homeScore;

          if (match.homeScore > match.awayScore) {
            h2h[match.home].points += 3;
          } else if (match.homeScore < match.awayScore) {
            h2h[match.away].points += 3;
          } else {
            h2h[match.home].points += 1;
            h2h[match.away].points += 1;
          }
        }
      }
    });

    return h2h;
  }

  // 순위 정렬
  const sortedStandings = Object.values(standings)
    .map((team) => ({
      ...team,
      winRate: team.games > 0 ? ((team.wins / team.games) * 100).toFixed(1) : 0,
      pointsDiff: team.pointsFor - team.pointsAgainst,
    }))
    .sort((a, b) => {
      // 1. 승점 비교
      if (a.points !== b.points) return b.points - a.points;
      
      // 2. 승점 동률 시 상호 전적 비교
      const h2h = getHeadToHeadRecord(a.name, b.name);
      if (h2h[a.name].points !== h2h[b.name].points) {
        return h2h[b.name].points - h2h[a.name].points;
      }
      
      // 3. 상호 전적도 동률 시 상호 전적 득실차
      const h2hDiffA = h2h[a.name].pointsFor - h2h[a.name].pointsAgainst;
      const h2hDiffB = h2h[b.name].pointsFor - h2h[b.name].pointsAgainst;
      if (h2hDiffA !== h2hDiffB) return h2hDiffB - h2hDiffA;
      
      // 4. 전체 득실차 비교
      if (a.pointsDiff !== b.pointsDiff) return b.pointsDiff - a.pointsDiff;
      
      // 5. 다득점 비교
      if (a.pointsFor !== b.pointsFor) return b.pointsFor - a.pointsFor;
      
      // 6. 최소실점 비교
      return a.pointsAgainst - b.pointsAgainst;
    });

  return sortedStandings;
}


// 그룹 순위표 컴포넌트 (분리됨)
export function GroupStandings({currentDivision, group, teams = []}) {
  const standings = calculateGroupStandings(group);

  const getRankClass = (index) => {
    switch (index) {
      case 0:
        return "rank-1st"; // 1위 - 금색
      case 1:
        return "rank-2nd"; // 2위 - 은색
      case 2:
        return "rank-3rd"; // 3위 - 동색
      case 3:
        return "rank-4th"; // 4위 - 파란색
      default:
        return "";
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
          <div className="standings-cell">무</div>
          <div className="standings-cell">패</div>
          <div className="standings-cell">승률</div>
          <div className="standings-cell">득점</div>
          <div className="standings-cell">실점</div>
        </div>
        {standings.map((team, index) => {
          const teamInfo = teams.find((t) => t.name === team.name);
          return (
            <div
              key={team.name}
              className={`standings-row ${currentDivision.name==="2부" ? "minor" : "" } ${getRankClass(index)}`}
            >
              <div className="standings-cell rank-cell">{index + 1}</div>
              <div className="standings-cell logo-cell">
                {teamInfo?.logo && (
                  <div className="team-logo">
                  <img
                    src={teamInfo.logo}
                    alt={`${team.name} 로고`}
                    className="team-logo-img"
                  />
                  </div>
                )}
              </div>
              <div className="standings-cell team-cell">{team.name}</div>
              <div className="standings-cell stat-cell">{team.wins}</div>
              <div className="standings-cell stat-cell">{team.draws}</div>
              <div className="standings-cell stat-cell">{team.losses}</div>
              <div className="standings-cell stat-cell">{team.winRate}%</div>
              <div className="standings-cell stat-cell">{team.pointsFor}</div>
              <div className="standings-cell stat-cell">
                {team.pointsAgainst}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// 개별 경기 컴포넌트
function MatchRow({currentDivision, group, index, match, teams = []}) {
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
    <div className={`match-row ${currentDivision.name==="2부" ? "minor" : ""}`}>
      {group ? (
        <div className="match-round">
          {group} {index + 1} 경기
        </div>
      ) 
      : (
        <div className="match-round">
          {currentDivision.name} {match.stage}
        </div>
      )
      }

      <div className="match-teams">
        <div className="team-vs">
          <div className={`home-team`}>
            <div className="team-logo">
                <img
                  src={homeTeam.logo}
                  alt={`${homeTeam.name} 로고`}
                  className="team-logo-img"
                />
            </div>
            <div className="team-name">  
              {homeTeam.name}
            </div>
            </div>
          <div className="match-score">{getScore()}</div>
          <div className={`away-team`}>
                    <div className='team-logo'>
                <img
                  src={awayTeam.logo}
                  alt={`${awayTeam.name} 로고`}
                  className="team-logo-img"
                />
            </div>
            <div className='team-name'>
            {awayTeam.name}
            </div>

            </div>
        </div>
      </div>
      <div className="match-location">{match.location || "-"}</div>
      <div className="match-date">{match.date || "-"}</div>
    </div>
  );
}

// 경기 리스트 컴포넌트
function MatchList({currentDivision, group, matches = [], teams = []}) {
  return (
    <div className="match-section">
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
            currentDivision={currentDivision}
            group={group}
            index={index}
            match={match}
            teams={teams}
          />
        ))}
      </div>
    </div>
  );
}

function FinalMatch({currentDivision, teams = []}) {
  return (
    <div className="matches-container">
      <div className="final-header">
        <div className="final-title">결승전</div>
      </div>
      <MatchList
        currentDivision={currentDivision}
        matches={currentDivision.final}
        teams={teams}
      />
    </div>
  );
}
//playoffs 경기 결과만 표시하는 컴포넌트
function PlayoffsMatches({currentDivision, teams = []}) {
  return (
    <div className="matches-container">
      <div className="playoffs-header">
        <div className="playoffs-title">순위결정전</div>
      </div>
      <MatchList
        currentDivision={currentDivision}
        matches={currentDivision.playoffs}
        teams={teams}
      />
    </div>
  );
}

function PromotionMatch({currentDivision, teams = []}) {
  return (
    <div className="promotion-matches-container">
      <div className="promotion-header">
        <div className="promotion-title">승강전</div>
      </div>
      <MatchList
        currentDivision={currentDivision}
        matches={currentDivision.promotion}
        teams={teams}
      />
    </div>
  );
}
// 조별리그 경기 결과만 표시하는 컴포넌트
function GroupMatches({currentDivision, group, teams = []}) {
  return (
    <div className="matches-container">
      <div className="group-header">
        <div className="group-title">
          {currentDivision.name} 리그 - {group.name}
        </div>
      </div>
      <MatchList
        currentDivision={currentDivision}
        group={group.name}
        matches={group.matches}
        teams={teams}
      />
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
          {currentDivision.groups && currentDivision.groups.length > 0 && (
            <div className="tournament-section">
              <div className="groups-container">
                {currentDivision.groups.map((group) => (
                  <div key={group.name} className="group-section">
                    <div className="group-header">
                      {currentDivision.name} {group.name} 순위
                    </div>
                    <div className="standings-section">
                      <GroupStandings currentDivision={currentDivision} group={group} teams={teams} />
                    </div>
                  </div>
                ))}
              </div>
              {/* 결승 경기 결과 */}
              {currentDivision.final && currentDivision.final.length > 0 && (
                <FinalMatch currentDivision={currentDivision} teams={teams} />
              )}
              {/* 플레이오프 경기 결과 */}
              {currentDivision.playoffs &&
                currentDivision.playoffs.length > 0 && (
                  <PlayoffsMatches
                    currentDivision={currentDivision}
                    teams={teams}
                  />
                )}
              <div className="group-container">
                {currentDivision.groups.map((group) => (
                  <div key={group.name} className="">
                    <div className="matches-section">
                      <GroupMatches
                        currentDivision={currentDivision}
                        group={group}
                        teams={teams}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 승강전 */}
          {currentDivision.promotion &&
            currentDivision.promotion.length > 0 && (
              <PromotionMatch
                currentDivision={currentDivision}
                teams={teams}
              />
            )}
        </div>
      )}
    </div>
  );
}
