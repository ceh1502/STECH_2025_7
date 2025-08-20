import React, {useMemo, useState, useEffect, useRef} from "react";
import {RxTriangleDown, RxTriangleUp} from "react-icons/rx";
import {FaChevronDown} from "react-icons/fa";
import "./StatPosition.css";

function Dropdown({value, options, onChange, label}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div className="dropdown-container" ref={ref} aria-label={label}>
      <button
        type="button"
        className={`dropdown-trigger ${open ? "open" : ""}`}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="dropdown-text">{value}</span>
          <FaChevronDown
                  size={16}
                  className={`dropdown-arrow ${open ? "rotated" : ""}`}
                />
      </button>

      {open && (
        <div className="dropdown-menu">
          <ul className="dropdown-list">
            {options.map((opt) => (
              <li key={opt}>
                <button
                  className={`dropdown-option ${
                    value === opt ? "selected" : ""
                  }`}
                  onClick={() => {
                    onChange(opt);
                    setOpen(false);
                  }}
                  role="option"
                  aria-selected={value === opt}
                >
                  {opt}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const DIVISION_OPTIONS = ["1부", "2부"];
const POSITION_OPTIONS = [
  "QB",
  "RB",
  "WR",
  "TE",
  "K",
  "P",
  "OL",
  "DL",
  "LB",
  "DB",
];

// “적을수록 좋은” 지표
const LOWER_IS_BETTER = new Set([
  "interceptions",
  "sacks",
  "fumbles",
  "fumbles_lost",
  "penalties",
  "sacks_allowed",
  "touchback_percentage", // 필요시
]);

// 포지션/카테고리별 기본(주황) 정렬 컬럼
const PRIMARY_METRIC = {
  QB: {pass: "passing_yards", run: "rushing_yards"},
  RB: {run: "rushing_yards", pass: "receiving_yards", ST: "kick_return_yards"},
  WR: {pass: "receiving_yards", run: "rushing_yards", ST: "kick_return_yards"},
  TE: {pass: "receiving_yards", run: "rushing_yards"},
  K: {ST: "field_goal_percentage"},
  P: {ST: "average_punt_yards"},
  OL: {default: "offensive_snaps_played"},
  DL: {default: "sacks"},
  LB: {default: "tackles"},
  DB: {defense: "interceptions", ST: "kick_return_yards"},
};
const positionCategories = {
  QB: ["pass", "run"],
  RB: ["run", "pass", "ST"],
  WR: ["pass", "run", "ST"],
  TE: ["pass", "run"],
  K: ["ST"],
  P: ["ST"],
  OL: ["default"],
  DL: ["default"],
  LB: ["default"],
  DB: ["defense", "ST"],
};

const statColumns = {
  QB: {
    pass: [
      {key: "games", label: "경기 횟수"},
      {key: "passing_attempts", label: "패스 시도 횟수"},
      {key: "pass_completions", label: "패스 성공 횟수"},
      {key: "completion_percentage", label: "패스 성공률"},
      {key: "passing_yards", label: "패싱 야드"},
      {key: "passing_td", label: "패싱 터치다운"},
      {key: "interceptions", label: "인터셉트"},
      {key: "longest_pass", label: "가장 긴 패스"},
      {key: "sacks", label: "경기 당 색 허용 횟수"},
    ],
    run: [
      {key: "games", label: "경기 횟수"},
      {key: "rushing_attempts", label: "러싱 시도 횟수"},
      {key: "rushing_yards", label: "러싱 야드"},
      {key: "yards_per_carry", label: "볼 캐리 당 러싱 야드"},
      {key: "rushing_td", label: "러싱 터치다운"},
      {key: "longest_rushing", label: "가장 긴 러싱 야드"},
    ],
  },
  RB: {
    run: [
      {key: "games", label: "경기 횟수"},
      {key: "rushing_attempts", label: "러싱 시도 횟수"},
      {key: "rushing_yards", label: "러싱 야드"},
      {key: "yards_per_carry", label: "볼 캐리 당 러싱 야드"},
      {key: "rushing_td", label: "러싱 터치다운"},
      {key: "longest_rushing", label: "경기 중 가장 긴 러싱 야드"},
      {key: "fumbles", label: "펌블 횟수"},
      {key: "fumbles_lost", label: "펌블 턴오버 횟수"},
    ],
    pass: [
      {key: "games", label: "경기 횟수"},
      {key: "targets", label: "패스 타겟 횟수"},
      {key: "receptions", label: "패스 캐치 횟수"},
      {key: "receiving_yards", label: "리시빙 야드"},
      {key: "yards_per_catch", label: "캐치 당 리시빙 야드"},
      {key: "receiving_td", label: "리시빙 터치다운 횟수"},
      {key: "longest_reception", label: "가장 긴 리시빙 야드"},
      {key: "receiving_first_downs", label: "리시브 후 퍼스트 다운 횟수"},
      {key: "fumbles", label: "펌블 횟수"},
      {key: "fumbles_lost", label: "펌블 턴오버 횟수"},
    ],
    ST: [
      {key: "games", label: "경기 횟수"},
      {key: "kick_returns", label: "킥 리턴 시도 횟수"},
      {key: "kick_return_yards", label: "킥 리턴 야드"},
      {key: "yards_per_kick_return", label: "킥 리턴 시도 당 리턴 야드"},
      {key: "punt_returns", label: "펀트 리턴 시도 횟수"},
      {key: "punt_return_yards", label: "펀트 리턴 야드"},
      {key: "yards_per_punt_return", label: "펀트 리턴 시도 당 리턴 야드"},
      {key: "return_td", label: "리턴 터치다운"},
    ],
  },
  WR: {
    pass: [
      {key: "games", label: "경기 횟수"},
      {key: "targets", label: "패스 타겟 횟수"},
      {key: "receptions", label: "패스 캐치 횟수"},
      {key: "receiving_yards", label: "리시빙 야드"},
      {key: "yards_per_catch", label: "캐치당 리시빙 야드"},
      {key: "receiving_td", label: "리시빙 터치다운"},
      {key: "longest_reception", label: "가장 긴 리시빙 야드"},
      {key: "receiving_first_downs", label: "리시브 후 퍼스트 다운 횟수"},
      {key: "fumbles", label: "펌블 횟수"},
      {key: "fumbles_lost", label: "펌블 턴오버 횟수"},
    ],
    run: [
      {key: "games", label: "경기 횟수"},
      {key: "rushing_attempts", label: "러싱 시도 횟수"},
      {key: "rushing_yards", label: "러싱 야드"},
      {key: "yards_per_carry", label: "볼 캐리 당 러싱 야드"},
      {key: "rushing_td", label: "러싱 터치다운"},
      {key: "longest_rushing", label: "가장 긴 러싱 야드"},
      {key: "fumbles", label: "펌블 횟수"},
      {key: "fumbles_lost", label: "펌블 턴오버 횟수"},
    ],
    ST: [
      {key: "games", label: "경기 횟수"},
      {key: "kick_returns", label: "킥 리턴 시도 횟수"},
      {key: "kick_return_yards", label: "킥 리턴 야드"},
      {key: "yards_per_kick_return", label: "킥 리턴 시도 당 리턴 야드"},
      {key: "punt_returns", label: "펀트 리턴 시도 횟수"},
      {key: "punt_return_yards", label: "펀트 리턴 야드"},
      {key: "yards_per_punt_return", label: "펀트 리턴 시도 당 리턴 야드"},
      {key: "return_td", label: "리턴 터치다운"},
    ],
  },
  TE: {
    pass: [
      {key: "games", label: "경기 횟수"},
      {key: "targets", label: "패스 타겟 횟수"},
      {key: "receptions", label: "패스 캐치 횟수"},
      {key: "receiving_yards", label: "리시빙 야드"},
      {key: "yards_per_catch", label: "캐치 당 리시빙 야드"},
      {key: "receiving_td", label: "리시빙 터치다운"},
      {key: "longest_reception", label: "가장 긴 리시빙 야드"},
      {key: "fumbles", label: "펌블 횟수"},
      {key: "fumbles_lost", label: "펌블 턴오버 횟수"},
    ],
    run: [
      {key: "games", label: "경기 횟수"},
      {key: "rushing_attempts", label: "러싱 시도 횟수"},
      {key: "rushing_yards", label: "러싱 야드"},
      {key: "yards_per_carry", label: "볼 캐리 당 러싱 야드"},
      {key: "rushing_td", label: "러싱 터치다운"},
      {key: "longest_rushing", label: "가장 긴 러싱 야드"},
      {key: "fumbles", label: "펌블 횟수"},
      {key: "fumbles_lost", label: "펌블 턴오버 횟수"},
    ],
  },
  K: {
    ST: [
      {key: "games", label: "경기 횟수"},
      {key: "extra_point_attempts", label: "PAT 시도 횟수"},
      {key: "extra_point_made", label: "PAT 성공 횟수"},
      {key: "field_goal", label: "필드골 성공-필드골 시도"},
      {key: "field_goal_percentage", label: "필드골 성공률"},
      {key: "field_goal_1_19", label: "1-19 야드 사이 성공률"},
      {key: "field_goal_20_29", label: "20-29 야드 사이 성공"},
      {key: "field_goal_30_39", label: "30-39 야드 사이 성공"},
      {key: "field_goal_40_49", label: "40-49 야드 사이 성공"},
      {key: "field_goal_50_plus", label: "50 야드 이상 성공"},
      {key: "average_field_goal_length", label: "평균 필드골 거리"},
      {key: "longest_field_goal", label: "가장 긴 필드골 거리"},
    ],
  },
  P: {
    ST: [
      {key: "games", label: "경기 횟수"},
      {key: "punts", label: "펀트 횟수"},
      {key: "average_punt_yards", label: "평균 펀트 거리"},
      {key: "longest_punt", label: "가장 긴 펀트 거리"},
      {key: "punt_yards", label: "펀트 야드"},
      {key: "touchback_percentage", label: "터치백 퍼센티지"},
      {key: "punts_inside_20", label: "20 야드 안쪽 펀트 퍼센티지"},
    ],
  },
  OL: {
    default: [
      {key: "offensive_snaps_played", label: "공격 플레이 스냅 참여 수"},
      {key: "penalties", label: "반칙 수"},
      {key: "sacks_allowed", label: "색 허용 횟수"},
    ],
  },
  DL: {
    default: [
      {key: "games", label: "경기 횟수"},
      {key: "tackles", label: "태클 횟수"},
      {key: "sacks", label: "색 횟수"},
      {key: "forced_fumbles", label: "펌블 유도 횟수"},
      {key: "fumble_recovery", label: "펌블 리커버리 횟수"},
      {key: "fumble_recovered_yards", label: "펌블 리커버리 야드"},
      {key: "pass_defended", label: "패스를 막은 횟수"},
      {key: "interceptions", label: "인터셉션"},
      {key: "interception_yards", label: "인터셉션 야드"},
      {key: "touchdowns", label: "수비 터치다운"},
    ],
  },
  LB: {
    default: [
      {key: "games", label: "경기 횟수"},
      {key: "tackles", label: "태클 횟수"},
      {key: "sacks", label: "색 횟수"},
      {key: "forced_fumbles", label: "펌블 유도 횟수"},
      {key: "fumble_recovery", label: "펌블 리커버리 횟수"},
      {key: "fumble_recovered_yards", label: "펌블 리커버리 야드"},
      {key: "pass_defended", label: "패스를 막은 횟수"},
      {key: "interceptions", label: "인터셉션"},
      {key: "interception_yards", label: "인터셉션 야드"},
      {key: "touchdowns", label: "수비 터치다운"},
    ],
  },
  DB: {
    defense: [
      {key: "games", label: "경기 횟수"},
      {key: "tackles", label: "태클 횟수"},
      {key: "sacks", label: "색 횟수"},
      {key: "forced_fumbles", label: "펌블 유도 횟수"},
      {key: "fumble_recovery", label: "펌블 리커버리 횟수"},
      {key: "fumble_recovered_yards", label: "펌블 리커버리 야드"},
      {key: "pass_defended", label: "패스를 막은 횟수"},
      {key: "interceptions", label: "인터셉션"},
      {key: "interception_yards", label: "인터셉션 야드"},
      {key: "touchdowns", label: "수비 터치다운"},
    ],
    ST: [
      {key: "games", label: "경기 횟수"},
      {key: "kick_returns", label: "킥 리턴 시도 횟수"},
      {key: "kick_return_yards", label: "킥 리턴 야드"},
      {key: "yards_per_kick_return", label: "킥 리턴 시도 당 리턴 야드"},
      {key: "punt_returns", label: "펀트 리턴 시도 횟수"},
      {key: "punt_return_yards", label: "펀트 리턴 야드"},
      {key: "yards_per_punt_return", label: "펀트 리턴 시도 당 리턴 야드"},
      {key: "return_td", label: "리턴 터치다운"},
    ],
  },
};
export default function StatPosition({data, teams = []}) {
  const [division, setDivision] = useState("1부");
  const [position, setPosition] = useState("QB");
  const [category, setCategory] = useState("pass");

  // 다단 정렬 상태: [{key, direction}] (direction: 'desc' | 'asc')
  const [sortChain, setSortChain] = useState([]);

  // 포지션/카테고리 변경 시 기본(주황) 정렬 1개를 세팅
  useEffect(() => {
    const cat = positionCategories[position][0];
    const initialCategory = positionCategories[position].includes(category)
      ? category
      : cat;
    setCategory(initialCategory);

    const baseKey = PRIMARY_METRIC[position]?.[initialCategory];
    if (baseKey) {
      setSortChain([{key: baseKey, direction: "desc"}]); // 기본은 내림차순(많을수록 좋음)
    } else {
      setSortChain([]);
    }
  }, [position]);

  useEffect(() => {
    // 카테고리만 바뀌면 그 카테고리의 기본 지표로 초기화
    const baseKey = PRIMARY_METRIC[position]?.[category];
    if (baseKey) setSortChain([{key: baseKey, direction: "desc"}]);
    else setSortChain([]);
  }, [category, position]);

  const currentColumns = statColumns[position]?.[category] || [];

  // 헤더 클릭 → 미적용 → desc → asc → 해제
  const toggleSort = (key) => {
    setSortChain((prev) => {
      // 이미 체인에 있나?
      const idx = prev.findIndex((s) => s.key === key);
      if (idx === -1) {
        // 새로 추가(우선순위 가장 높음)
        return [{key, direction: "desc"}, ...prev];
      }
      const cur = prev[idx];
      if (cur.direction === "desc") {
        const next = [...prev];
        next[idx] = {key, direction: "asc"};
        return next;
      }
      // asc였다면 제거(해제)
      const next = [...prev];
      next.splice(idx, 1);
      return next;
    });
  };

  // 다단 정렬
  const sortedPlayers = useMemo(() => {
    const rows = data.filter(
      (d) => d.division === division && d.position === position
    );

    if (sortChain.length === 0) return rows;

    const cmp = (a, b) => {
      for (const {key, direction} of sortChain) {
        const av = a[key] ?? 0;
        const bv = b[key] ?? 0;

        // lower-is-better면 비교 부호를 뒤집어 줌
        const base = av < bv ? -1 : av > bv ? 1 : 0;
        const sign = direction === "asc" ? 1 : -1;
        const lowBetter = LOWER_IS_BETTER.has(key) ? -1 : 1;

        const out = base * sign * lowBetter;
        if (out !== 0) return out;
      }
      return 0;
    };

    return [...rows].sort(cmp);
  }, [data, division, position, sortChain]);

  return (
    <div className="stat-position">
      {/* 드롭다운들 */}
      <div className="stat-header">
        <div className="stat-dropdown-group">
          <Dropdown
            label="Division"
            value={division}
            options={DIVISION_OPTIONS}
            onChange={(v) => {
              setDivision(v);
              // 디비전만 바뀌면 정렬 체인은 유지
            }}
          />
          <Dropdown
            label="Position"
            value={position}
            options={POSITION_OPTIONS}
            onChange={(v) => setPosition(v)}
          />
          <Dropdown
            label="Category"
            value={category}
            options={positionCategories[position]}
            onChange={(v) => setCategory(v)}
          />
        </div>
      </div>

      <div className="table-header">
        <div className="table-title">포지션별 선수 순위</div>
      </div>

      <div className="table-wrapper">
        <table className="stat-table">
          <thead className="table-head">
            <tr className="table-row">
              <div className="table-row1">
                <th className="table-header-cell rank-column">순위</th>
                <th className="table-header-cell player-column">선수 이름</th>
                <th className="table-header-cell team-logo"></th>
                <th className="table-header-cell team-column">소속팀</th>
              </div>
              <div className="table-row2" style={{ '--cols': currentColumns.length }}>
                {currentColumns.map((col) => {
                  const active = sortChain.find((s) => s.key === col.key);
                  const order = active ? active.direction : null;
                  const isPrimary =
                    PRIMARY_METRIC[position]?.[category] === col.key;

                  return (
                    <th
                      key={col.key}
                      className={`table-header-cell stat-column sortable
                      ${active ? "active-blue" : ""}
                      ${isPrimary && !active ? "primary-orange" : ""}
                    `}
                      onClick={() => toggleSort(col.key)}
                      title={
                        active
                          ? `정렬: ${
                              order === "desc" ? "내림차순" : "오름차순"
                            }`
                          : "정렬 적용"
                      }
                    >
                      <div className="sort">
                        <span className="column-label">{col.label}</span>
                        <div className="sort-arrows">
                          <RxTriangleDown
                            size={10}
                            className={`sort-arrow ${
                              active && order === "asc" ? "active" : ""
                            }`}
                          />
                          <RxTriangleUp
                            size={10}
                            className={`sort-arrow ${
                              active && order === "desc" ? "active" : ""
                            }`}
                          />
                        </div>
                      </div>
                    </th>
                  );
                })}
              </div>
            </tr>
          </thead>

          <tbody className="table-body">
            {sortedPlayers.map((row, idx) => {
              const teamInfo = teams.find((t) => t.name === row.team);
              return (
                <tr key={row.id || row.name} className="table-rows">
                  <div className="table-row1">
                    <td className="table-cell">{row.rank || idx + 1}위</td>
                    <td className="table-cell player-name clickable">
                      {row.name}
                    </td>
                    <td className="table-cell team-logo-cell">
                      {teamInfo?.logo && (
                        <div className="team-logo">
                          <img
                            src={teamInfo.logo}
                            alt={`${row.team} 로고`}
                            className={`team-logo-img ${
                        teamInfo.logo.endsWith(".svg") ? "svg-logo" : "png-logo"
                      }`}
                          />
                        </div>
                      )}
                    </td>
                    <td className="table-cell team-name">{row.team}</td>
                  </div>
                  <div className="table-row2" style={{ '--cols': currentColumns.length }}>
                    {currentColumns.map((col) => (
                      <td key={col.key} className="table-cell">
                        {typeof row[col.key] === "number" &&
                        row[col.key] % 1 !== 0
                          ? row[col.key].toFixed(1)
                          : row[col.key] ?? "0"}
                      </td>
                    ))}
                  </div>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
