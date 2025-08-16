import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import "./StatTeam.css";


const Dropdown = ({
  options = [],
  value = "",
  onChange = () => {},
  placeholder = "",
  className = "",
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = () => {
    if (!disabled) setIsOpen((o) => !o);
  };

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  const selectedOption = options.find((o) => o.value === value);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  return (
    <div className={`dropdown-container ${className}`} ref={dropdownRef}>
      <button
        className={`dropdown-trigger ${isOpen ? "open" : ""} ${disabled ? "disabled" : ""}`}
        onClick={handleToggle}
        disabled={disabled}
        type="button"
      >
        <span className="dropdown-text">{displayText}</span>
        <FaChevronDown size={16} className={`dropdown-arrow ${isOpen ? "rotated" : ""}`} />
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          <ul className="dropdown-list">
            {options.map((option) => (
              <li key={option.value} className="dropdown-item">
                <button
                  className={`dropdown-option ${value === option.value ? "selected" : ""}`}
                  onClick={() => handleSelect(option)}
                  type="button"
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};


function calculateGroupStandings(group) {
  const standings = {};
  group.teams.forEach((team) => {
    standings[team] = {
      name: team,
      wins: 0,
      draws: 0,
      losses: 0,
      points: 0,
      pointsFor: 0,
      pointsAgainst: 0,
      games: 0,
    };
  });

  group.matches.forEach((match) => {
    if (match.homeScore !== null && match.awayScore !== null) {
      standings[match.home].pointsFor += match.homeScore;
      standings[match.home].pointsAgainst += match.awayScore;
      standings[match.home].games++;

      standings[match.away].pointsFor += match.awayScore;
      standings[match.away].pointsAgainst += match.homeScore;
      standings[match.away].games++;

      if (match.homeScore > match.awayScore) {
        standings[match.home].wins++;
        standings[match.home].points += 3;
        standings[match.away].losses++;
      } else if (match.homeScore < match.awayScore) {
        standings[match.away].wins++;
        standings[match.away].points += 3;
        standings[match.home].losses++;
      } else {
        standings[match.home].draws++;
        standings[match.home].points += 1;
        standings[match.away].draws++;
        standings[match.away].points += 1;
      }
    }
  });

  function getHeadToHeadRecord(teamA, teamB) {
    const h2h = {
      [teamA]: { points: 0, pointsFor: 0, pointsAgainst: 0 },
      [teamB]: { points: 0, pointsFor: 0, pointsAgainst: 0 },
    };

    group.matches.forEach((match) => {
      if (
        (match.home === teamA && match.away === teamB) ||
        (match.home === teamB && match.away === teamA)
      ) {
        if (match.homeScore !== null && match.awayScore !== null) {
          h2h[match.home].pointsFor += match.homeScore;
          h2h[match.home].pointsAgainst += match.awayScore;
          h2h[match.away].pointsFor += match.awayScore;
          h2h[match.away].pointsAgainst += match.homeScore;

          if (match.homeScore > match.awayScore) h2h[match.home].points += 3;
          else if (match.homeScore < match.awayScore) h2h[match.away].points += 3;
          else {
            h2h[match.home].points += 1;
            h2h[match.away].points += 1;
          }
        }
      }
    });

    return h2h;
  }

  const sortedStandings = Object.values(standings)
    .map((team) => ({
      ...team,
      winRate: team.games > 0 ? ((team.wins / team.games) * 100).toFixed(1) : 0,
      pointsDiff: team.pointsFor - team.pointsAgainst,
    }))
    .sort((a, b) => {
      if (a.points !== b.points) return b.points - a.points;

      const h2h = getHeadToHeadRecord(a.name, b.name);
      if (h2h[a.name].points !== h2h[b.name].points) {
        return h2h[b.name].points - h2h[a.name].points;
      }

      const h2hDiffA = h2h[a.name].pointsFor - h2h[a.name].pointsAgainst;
      const h2hDiffB = h2h[b.name].pointsFor - h2h[b.name].pointsAgainst;
      if (h2hDiffA !== h2hDiffB) return h2hDiffB - h2hDiffA;

      if (a.pointsDiff !== b.pointsDiff) return b.pointsDiff - a.pointsDiff;
      if (a.pointsFor !== b.pointsFor) return b.pointsFor - a.pointsFor;
      return a.pointsAgainst - b.pointsAgainst;
    });

  return sortedStandings;
}


export function GroupStandings({ currentDivision, group, teams = [] }) {
  const standings = calculateGroupStandings(group);

  const getRankClass = (index) => {
    switch (index) {
      case 0:
        return "rank-1st";
      case 1:
        return "rank-2nd";
      case 2:
        return "rank-3rd";
      case 3:
        return "rank-4th";
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
              className={`standings-row ${currentDivision.name === "2부" ? "minor" : ""} ${getRankClass(index)}`}
            >
              <div className="standings-cell rank-cell">{index + 1}</div>
              <div className="standings-cell logo-cell">
                {teamInfo?.logo && (
                  <div className="team-logo">
                    <img src={teamInfo.logo} alt={`${team.name} 로고`} className="team-logo-img" />
                  </div>
                )}
              </div>
              <div className="standings-cell team-cell">{team.name}</div>
              <div className="standings-cell stat-cell">{team.wins}</div>
              <div className="standings-cell stat-cell">{team.draws}</div>
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

/* ----------------------------------
 * 경기/섹션
 * ---------------------------------- */
function MatchRow({ currentDivision, group, index, match, teams = [] }) {
  const homeTeam = teams.find((t) => t.name === match.home) || { name: match.home, logo: "" };
  const awayTeam = teams.find((t) => t.name === match.away) || { name: match.away, logo: "" };

  const getScore = () => {
    if (match.homeScore == null || match.awayScore == null) return match.status || "-";
    return `${match.homeScore} : ${match.awayScore}`;
  };

  return (
    <div className={`match-row ${currentDivision.name === "2부" ? "minor" : ""}`}>
      {group ? (
        <div className="match-round">
          {group} {index + 1} 경기
        </div>
      ) : (
        <div className="match-round">
          {currentDivision.name} {match.stage}
        </div>
      )}

      <div className="match-teams">
        <div className="team-vs">
          <div className="home-team">
            <div className="team-logo">
              <img src={homeTeam.logo} alt={`${homeTeam.name} 로고`} className="team-logo-img" />
            </div>
            <div className="team-name">{homeTeam.name}</div>
          </div>
          <div className="match-score">{getScore()}</div>
          <div className="away-team">
            <div className="team-logo">
              <img src={awayTeam.logo} alt={`${awayTeam.name} 로고`} className="team-logo-img" />
            </div>
            <div className="team-name">{awayTeam.name}</div>
          </div>
        </div>
      </div>
      <div className="match-location">{match.location || "-"}</div>
      <div className="match-date">{match.date || "-"}</div>
    </div>
  );
}

function MatchList({ currentDivision, group, matches = [], teams = [] }) {
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

function FinalMatch({ currentDivision, teams = [] }) {
  return (
    <div className="matches-container">
      <div className="final-header">
        <div className="final-title">결승전</div>
      </div>
      <MatchList currentDivision={currentDivision} matches={currentDivision.final} teams={teams} />
    </div>
  );
}

function PlayoffsMatches({ currentDivision, teams = [] }) {
  return (
    <div className="matches-container">
      <div className="playoffs-header">
        <div className="playoffs-title">순위결정전</div>
      </div>
      <MatchList currentDivision={currentDivision} matches={currentDivision.playoffs} teams={teams} />
    </div>
  );
}

function PromotionMatch({ currentDivision, teams = [] }) {
  return (
    <div className="promotion-matches-container">
      <div className="promotion-header">
        <div className="promotion-title">승강전</div>
      </div>
      <MatchList currentDivision={currentDivision} matches={currentDivision.promotion} teams={teams} />
    </div>
  );
}

function GroupMatches({ currentDivision, group, teams = [] }) {
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

/* ----------------------------------
 * Empty(예외) 페이지
 * ---------------------------------- */
function EmptyState({ message, onReset }) {
  return (
    <div
      style={{
        padding: "40px 24px",
        background: "#0b0b0e",
        borderRadius: 12,
        border: "1px solid #2b2b32",
        color: "#e7e7ea",
        textAlign: "center",
        marginTop: 16,
      }}
    >
      <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>데이터가 없습니다</div>
      <div style={{ opacity: 0.8, marginBottom: 16 }}>{message}</div>
      <button
        type="button"
        onClick={onReset}
        style={{
          padding: "8px 14px",
          borderRadius: 8,
          border: "1px solid #8a8a8f",
          background: "transparent",
          color: "#fff",
          cursor: "pointer",
          fontWeight: 700,
        }}
      >
        필터 초기화
      </button>
    </div>
  );
}

/* ----------------------------------
 * 메인 StatTeam
 * ---------------------------------- */
export default function StatTeam({ data, teams = [] }) {
  const yearOptions = [
    { value: "2024", label: "2024" },
    { value: "2025", label: "2025" },
  ];
  const leagueOptions = [
    { value: "서울", label: "서울" },
    { value: "경기강원", label: "경기강원" },
    { value: "대구경북", label: "대구경북" },
    { value: "부산경남", label: "부산경남" },
    { value: "사회인", label: "사회인" },
    { value: "타이거볼", label: "타이거볼" },
    { value: "챌린지볼", label: "챌린지볼" },
  ];
  const divisionOptions = [
    { value: "1부", label: "1부" },
    { value: "2부", label: "2부" },
  ];

  // 초기 placeholder
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedLeague, setSelectedLeague] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("1부");

  // 리그별 부 유무
  const leaguesWithDivisions = ["서울", "경기강원", "대구경북", "부산경남"];
  const hasDivisions = selectedLeague ? leaguesWithDivisions.includes(selectedLeague) : false;

  useEffect(() => {
    if (!hasDivisions) {
      if (selectedDivision !== "") setSelectedDivision("");
    } else {
      if (!["1부", "2부"].includes(selectedDivision)) setSelectedDivision("1부");
    }
  }, [hasDivisions, selectedDivision]);

  /* ✅ 선택 조합에 맞는 데이터 탐색 (두 가지 구조 모두 지원)
     1) 중첩형: data[year][league].divisions
     2) 단일형: data.divisions (이미 해당 조합의 데이터만 들어온 경우)
  */
  const datasetRoot = data ?? {};
  const byYear = selectedYear && datasetRoot[selectedYear] ? datasetRoot[selectedYear] : datasetRoot;
  const byYearLeague =
    selectedLeague && byYear[selectedLeague] ? byYear[selectedLeague] : byYear;

  const divisions =
    Array.isArray(byYearLeague?.divisions)
      ? byYearLeague.divisions
      : Array.isArray(datasetRoot?.divisions)
      ? datasetRoot.divisions
      : [];

  const currentDivision = hasDivisions
    ? divisions.find((div) => div.name === selectedDivision) ?? null
    : divisions[0] ?? null;

  // 선택이 완료됐는지
  const selectionReady = Boolean(selectedYear && selectedLeague && (hasDivisions ? selectedDivision : true));

  // ▶ 빈 상태 판정(너무 빡세지 않게: 그룹만 있어도 OK)
  const hasAnyContent = (div) => {
    if (!div) return false;
    const groupsOK = Array.isArray(div.groups) && div.groups.length > 0; // 그룹만 있어도 통과
    const finalsOK = Array.isArray(div.final) && div.final.length > 0;
    const playoffsOK = Array.isArray(div.playoffs) && div.playoffs.length > 0;
    const promoOK = Array.isArray(div.promotion) && div.promotion.length > 0;
    return groupsOK || finalsOK || playoffsOK || promoOK;
  };
  const noDataForSelection = selectionReady && (!currentDivision || !hasAnyContent(currentDivision));

  // 데이터 자체가 전혀 없을 때
  if (!data) {
    return <div className="tournament-status">데이터가 없습니다</div>;
  }

  const resetFilters = () => {
    setSelectedYear("");
    setSelectedLeague("");
    setSelectedDivision("1부");
  };

  return (
    <div className="statTeamContainer">
      <div className="tournament-header">
        <div className="dropdown-group">
          <Dropdown
            options={yearOptions}
            value={selectedYear}
            onChange={(option) => setSelectedYear(option.value)}
            className="year-dropdown"
            placeholder="연도"
          />
          <Dropdown
            options={leagueOptions}
            value={selectedLeague}
            onChange={(option) => setSelectedLeague(option.value)}
            className="league-dropdown"
            placeholder="리그"
          />
          {hasDivisions && (
            <Dropdown
              options={divisionOptions}
              value={selectedDivision}
              onChange={(option) => setSelectedDivision(option.value)}
              className="division-dropdown"
              placeholder="부"
            />
          )}
        </div>
      </div>

      {/* 선택 완료 + 해당 조합 데이터 없음 → 예외 페이지 */}
      {noDataForSelection && (
        <EmptyState
          message={
            hasDivisions
              ? `선택한 조합(${selectedYear} · ${selectedLeague} · ${selectedDivision})의 기록이 없습니다.`
              : `선택한 조합(${selectedYear} · ${selectedLeague})의 기록이 없습니다.`
          }
          onReset={resetFilters}
        />
      )}

      {/* 정상 렌더 */}
      {!noDataForSelection && currentDivision && (
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

              {currentDivision.final && currentDivision.final.length > 0 && (
                <FinalMatch currentDivision={currentDivision} teams={teams} />
              )}
              {currentDivision.playoffs && currentDivision.playoffs.length > 0 && (
                <PlayoffsMatches currentDivision={currentDivision} teams={teams} />
              )}

              <div className="group-container">
                {currentDivision.groups.map((group) => (
                  <div key={group.name} className="">
                    <div className="matches-section">
                      <GroupMatches currentDivision={currentDivision} group={group} teams={teams} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentDivision.promotion && currentDivision.promotion.length > 0 && (
            <PromotionMatch currentDivision={currentDivision} teams={teams} />
          )}
        </div>
      )}
    </div>
  );
}
