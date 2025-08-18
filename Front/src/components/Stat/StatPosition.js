import React, { useState, useMemo } from 'react';
import { FaChevronDown , FaChevronUp } from 'react-icons/fa';
import './StatPosition.css'; 
import {  RxTriangleDown, RxTriangleUp } from "react-icons/rx";



const StatPosition = ({ data, teams=[] }) => {
  const [selectedDivision, setSelectedDivision] = useState("1부");
  const [selectedPosition, setSelectedPosition] = useState('QB');
  const [selectedStatType, setSelectedStatType] = useState('pass');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'desc' });


  // 포지션별 사용 가능한 통계 카테고리
  const positionCategories = {
    'QB': ['pass', 'run'],
    'RB': ['run', 'pass','ST'],
    'WR': ['pass', 'run', 'ST'],
    'TE': ['pass', 'run'],
    'K': ['ST'],
    'P': ['ST'],
    'OL': ['default'],
    'DL': ['default'],
    'LB': ['default'],
    'DB': ['defense', 'ST'],
  };

  // 포지션별, 플레이별 스탯 컬럼 정의
  const statColumns = {
    'QB': {
      'pass': [
        { key: 'games', label: '경기 횟수' },
        { key: 'passing_attempts', label: '패스 시도 횟수' },
        { key: 'pass_completions', label: '패스 성공 횟수' },
        { key: 'completion_percentage', label: '패스 성공률' },
        { key: 'passing_yards', label: '패싱 야드' },
        { key: 'passing_td', label: '패싱 터치다운' },
        { key: 'interceptions', label: '인터셉트' },
        { key: 'longest_pass', label: '가장 긴 패스' },
        { key: 'sacks', label: '경기 당 색 허용 횟수' }
      ],
      'run': [
        { key: 'games', label:'경기 횟수' },
        { key: 'rushing_attempts', label: '러싱 시도 횟수' },
        { key: 'rushing_yards', label: '러싱 야드' },
        { key: 'yards_per_carry', label: '볼 캐리 당 러싱 야드' },
        { key: 'rushing_td', label: '러싱 터치다운' },
        { key: 'longest_rushing', label: '가장 긴 러싱 야드' },
      ]
    },
    'RB': {
      'run': [
        { key: 'games', label: '경기 횟수' },
        { key: 'rushing_attempts', label: '러싱 시도 횟수' },
        { key: 'rushing_yards', label: '러싱 야드' },
        { key: 'yards_per_carry', label: '볼 캐리 당 러싱 야드' },
        { key: 'rushing_td', label: '러싱 터치다운' },
        { key: 'longest_rushing', label: '경기 중 가장 긴 러싱 야드' },
        { key: 'fumbles', label: '펌블 횟수' },
        { key: 'fumbles_lost', label: '펌블 턴오버 횟수' },
      ],
      'pass': [
        { key: 'games', label: '경기 횟수' },
        { key: 'targets', label: '패스 타겟 횟수' },
        { key: 'receptions', label: '패스 캐치 횟수' },
        { key: 'receiving_yards', label: '리시빙 야드' },
        { key: 'yards_per_catch', label: '캐치 당 리시빙 야드' },
        { key: 'receiving_td', label: '리시빙 터치다운 횟수' },
        { key: 'longest_reception', label: '가장 긴 리시빙 야드' },
        { key: 'receiving_first_downs', label: '리시브 후 퍼스트 다운 횟수' },
        { key: 'fumbles', label: '펌블 횟수' },
        { key: 'fumbles_lost', label: '펌블 턴오버 횟수' },
      ],
      'ST': [
        { key: 'games', label: '경기 횟수' },
        { key: 'kick_returns', label: '킥 리턴 시도 횟수' },
        { key: 'kick_return_yards', label: '킥 리턴 야드' },
        { key: 'yards_per_kick_return', label: '킥 리턴 시도 당 리턴 야드'},
        { key: 'punt_returns', label: '펀트 리턴 시도 횟수' },
        { key: 'punt_return_yards', label: '펀트 리턴 야드' },
        { key: 'yards_per_punt_return', label: '펀트 리턴 시도 당 리턴 야드' },
        { key: 'return_td', label: '리턴 터치다운' }
      ]
    },
    'WR': {
      'pass': [
        { key: 'games', label: '경기 횟수' },
        { key: 'targets', label: '패스 타겟 횟수' },
        { key: 'receptions', label: '패스 캐치 횟수' },
        { key: 'receiving_yards', label: '리시빙 야드' },
        { key: 'yards_per_catch', label: '캐치당 리시빙 야드' },
        { key: 'receiving_td', label: '리시빙 터치다운' },
        { key: 'longest_reception', label: '가장 긴 리시빙 야드' },
        { key: 'receiving_first_downs', label: '리시브 후 퍼스트 다운 횟수' },
        { key: 'fumbles', label: '펌블 횟수' },
        { key: 'fumbles_lost', label: '펌블 턴오버 횟수' }
      ],
      'run': [
        { key: 'games', label: '경기 횟수' },
        { key: 'rushing_attempts', label: '러싱 시도 횟수' },
        { key: 'rushing_yards', label: '러싱 야드' },
        { key: 'yards_per_carry', label: '볼 캐리 당 러싱 야드' },
        { key: 'rushing_td', label: '러싱 터치다운' },
        { key: 'longest_rushing', label: '가장 긴 러싱 야드' },
        { key: 'fumbles', label: '펌블 횟수' },
        { key: 'fumbles_lost', label: '펌블 턴오버 횟수' }
      ],
      'ST': [
        { key: 'games', label: '경기 횟수' },
        { key: 'kick_returns', label: '킥 리턴 시도 횟수' },
        { key: 'kick_return_yards', label: '킥 리턴 야드' },
        { key: 'yards_per_kick_return', label: '킥 리턴 시도 당 리턴 야드'},
        { key: 'punt_returns', label: '펀트 리턴 시도 횟수' },
        { key: 'punt_return_yards', label: '펀트 리턴 야드' },
        { key: 'yards_per_punt_return', label: '펀트 리턴 시도 당 리턴 야드' },
        { key: 'return_td', label: '리턴 터치다운' }
      ]
    },
    'TE': {
      'pass': [
        { key: 'games', label: '경기 횟수' },
        { key: 'targets', label: '패스 타겟 횟수' },
        { key: 'receptions', label: '패스 캐치 횟수' },
        { key: 'receiving_yards', label: '리시빙 야드' },
        { key: 'yards_per_catch', label: '캐치 당 리시빙 야드' },
        { key: 'receiving_td', label: '리시빙 터치다운' },
        { key: 'longest_reception', label: '가장 긴 리시빙 야드' },
        { key: 'fumbles', label: '펌블 횟수' },
        { key: 'fumbles_lost', label: '펌블 턴오버 횟수' }
      ],
      'run': [
        { key: 'games', label: '경기 횟수' },
        { key: 'rushing_attempts', label: '러싱 시도 횟수' },
        { key: 'rushing_yards', label: '러싱 야드' },
        { key: 'yards_per_carry', label: '볼 캐리 당 러싱 야드' },
        { key: 'rushing_td', label: '러싱 터치다운' },
        { key: 'longest_rushing', label: '가장 긴 러싱 야드' },
        { key: 'fumbles', label: '펌블 횟수' },
        { key: 'fumbles_lost', label: '펌블 턴오버 횟수' }
      ]
    },
    'K': {
      'ST': [
        { key: 'games', label: '경기 횟수' },
        { key: 'extra_point_attempts', label: 'PAT 시도 횟수' },
        { key: 'extra_point_made', label: 'PAT 성공 횟수' },
        { key: 'field_goal', label: '필드골 성공-필드골 시도' },
        { key: 'field_goal_percentage', label: '필드골 성공률' },
        { key: 'field_goal_1_19', label: '1-19 야드 사이 성공률' },
        { key: 'field_goal_20_29', label: '20-29 야드 사이 성공' },
        { key: 'field_goal_30_39', label: '30-39 야드 사이 성공' },
        { key: 'field_goal_40_49', label: '40-49 야드 사이 성공' },
        { key: 'field_goal_50_plus', label: '50 야드 이상 성공' },
        { key: 'average_field_goal_length', label: '평균 필드골 거리' },
        { key: 'longest_field_goal', label: '가장 긴 필드골 거리' }
      ]
    },
    'P': {
      'ST': [
        { key: 'games', label: '경기 횟수' },
        { key: 'punts', label: '펀트 횟수' },
        { key: 'average_punt_yards', label: '평균 펀트 거리' },
        { key: 'longest_punt', label: '가장 긴 펀트 거리' },
        { key: 'punt_yards', label: '펀트 야드' },
        { key: 'touchback_percentage', label: '터치백 퍼센티지' },
        { key: 'punts_inside_20', label: '20 야드 안쪽 펀트 퍼센티지' }
      ]
    },
    'OL': {
      'default': [
        { key: 'offensive_snaps_played', label: '공격 플레이 스냅 참여 수' },
        { key: 'penalties', label: '반칙 수' },
        { key: 'sacks_allowed', label: '색 허용 횟수' }
      ]
    },
    'DL': {
      'default': [
        { key: 'games', label: '경기 횟수' },
        { key: 'tackles', label: '태클 횟수' },
        { key: 'sacks', label: '색 횟수' },
        { key: 'forced_fumbles', label: '펌블 유도 횟수' },
        { key: 'fumble_recovery', label: '펌블 리커버리 횟수' },
        { key: 'fumble_recovered_yards', label: '펌블 리커버리 야드' },
        { key: 'pass_defended', label: '패스를 막은 횟수' },
        { key: 'interceptions', label: '인터셉션' },
        { key: 'interception_yards', label: '인터셉션 야드' },
        { key: 'touchdowns', label: '수비 터치다운' }
      ]
    },
    'LB': {
      'default': [
        { key: 'games', label: '경기 횟수' },
        { key: 'tackles', label: '태클 횟수' },
        { key: 'sacks', label: '색 횟수' },
        { key: 'forced_fumbles', label: '펌블 유도 횟수' },
        { key: 'fumble_recovery', label: '펌블 리커버리 횟수' },
        { key: 'fumble_recovered_yards', label: '펌블 리커버리 야드' },
        { key: 'pass_defended', label: '패스를 막은 횟수' },
        { key: 'interceptions', label: '인터셉션' },
        { key: 'interception_yards', label: '인터셉션 야드' },
        { key: 'touchdowns', label: '수비 터치다운' }
      ]
    },
    'DB': {
      'defense': [
        { key: 'games', label: '경기 횟수' },
        { key: 'tackles', label: '태클 횟수' },
        { key: 'sacks', label: '색 횟수' },
        { key: 'forced_fumbles', label: '펌블 유도 횟수' },
        { key: 'fumble_recovery', label: '펌블 리커버리 횟수' },
        { key: 'fumble_recovered_yards', label: '펌블 리커버리 야드' },
        { key: 'pass_defended', label: '패스를 막은 횟수' },
        { key: 'interceptions', label: '인터셉션' },
        { key: 'interception_yards', label: '인터셉션 야드' },
        { key: 'touchdowns', label: '수비 터치다운' }
      ],
      'ST': [
        { key: 'games', label: '경기 횟수' },
        { key: 'kick_returns', label: '킥 리턴 시도 횟수' },
        { key: 'kick_return_yards', label: '킥 리턴 야드' },
        { key: 'yards_per_kick_return', label: '킥 리턴 시도 당 리턴 야드'},
        { key: 'punt_returns', label: '펀트 리턴 시도 횟수' },
        { key: 'punt_return_yards', label: '펀트 리턴 야드' },
        { key: 'yards_per_punt_return', label: '펀트 리턴 시도 당 리턴 야드' },
        { key: 'return_td', label: '리턴 터치다운' }
      ]
    }
  };

  // 정렬 함수
  const handleSort = (key) => {
    let direction = 'desc';
    if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc';
    }
    setSortConfig({ key, direction });
  };

  // 정렬된 데이터
  const sortedPlayers = useMemo(() => {
    const filteredPlayers = data.filter(data => 
      data.division === selectedDivision && 
      data.position === selectedPosition
    );
    
    if (!sortConfig.key) return filteredPlayers;

    return [...filteredPlayers].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [sortConfig, selectedDivision, selectedPosition, data]);

  // 현재 선택된 통계 타입의 컬럼들
  const currentColumns = statColumns[selectedPosition]?.[selectedStatType] || [];

  return (
    <div className={`stat-position`}>
      <div className="stat-header">
        <div className="division-buttons">
          {['1부', '2부'].map((division) => (
            <button
              key={division}
              className={`division-button ${selectedDivision === division ? 'active' : ''}`}
              onClick={() => {
                setSelectedDivision(division);
                setSortConfig({ key: null, direction: 'desc' });
              }}
            >
              {division}
            </button>
          ))}
        </div>
      </div>

      {/* 포지션 선택 */}
      <div className="position-container">
        {Object.keys(positionCategories).map((position) => (
          <button
            key={position}
            className={`position-button ${selectedPosition === position ? 'active' : 'inactive'}`}
            onClick={() => {
              setSelectedPosition(position);
              setSelectedStatType(positionCategories[position][0]);
              setSortConfig({ key: null, direction: 'desc' });
            }}
          >
            {position}
          </button>
        ))}
      </div>

      {/* 통계 카테고리 선택 */}
      <div className="category-container">
        {positionCategories[selectedPosition]?.map((category) => (
          <button
            key={category}
            className={`category-button ${selectedStatType === category ? 'active' : 'inactive'}`}
            onClick={() => {
              setSelectedStatType(category);
              setSortConfig({ key: null, direction: 'desc' });
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 테이블 헤더 */}
      <div className="table-header">
        <div className="table-title">포지션별 선수 순위</div>
      </div>

      {/* 통계 테이블 */}
      <div className="table-wrapper">
        <table className="stat-table">
          <thead className="table-head">
            <tr className="table-row">             
              <th className="table-header-cell rank-column">순위</th>
              <th className="table-header-cell player-column">선수 이름</th>
              <th className='table-header-cell team-logo'></th>
              <th className="table-header-cell team-column">소속팀</th>
              <div className='sort-container' style={{'--cols':currentColumns.length}}>
              {currentColumns.map((column) => (
                <th
                  key={column.key}
                  className="table-header-cell stat-column sortable"
                  onClick={() => handleSort(column.key)}
                >
                  <div className="sort"                   >
                    <span className="column-label">{column.label}</span>
                    <div className="sort-arrows">
                      
                      <RxTriangleDown
                        size={10} 
                        className={`sort-arrow ${sortConfig.key === column.key && sortConfig.direction === 'asc' ? 'active' : ''}`}
                      />
                      <RxTriangleUp
                        size={10} 
                        className={`sort-arrow ${sortConfig.key === column.key && sortConfig.direction === 'desc' ? 'active' : ''}`}
                      />
                    </div>
                  </div>
                </th>
              ))}
              </div>
            </tr>
          </thead>
          <tbody className="table-body">
            {sortedPlayers.map((data, index) => {
              const teamInfo = teams.find((t) => t.name === data.team);
            return(
              <tr 
                key={data.id || data.name}
                className={`table-rows`}
              >
                <td className="table-cell">{data.rank || index + 1}위</td>
                <td 
                  className="table-cell player-name clickable"                >
                  {data.name}
                </td>
              <td className="table-cell team-logo-cell">
        {teamInfo?.logo && (
          <div className="team-logo">
            <img 
              src={teamInfo.logo} 
              alt={`${data.team} 로고`} 
              className="team-logo-img" 
            />
          </div>
        )}
      </td>
                <td className="table-cell team-name">{data.team}</td>
                <div className="sort-container" style={{'--cols':currentColumns.length}}>
                {currentColumns.map((column) => (
                  <td key={column.key} className="table-cell">
                    {typeof data[column.key] === 'number' && data[column.key] % 1 !== 0
                      ? data[column.key].toFixed(1)
                      : data[column.key] || '0'
                    }
                  </td>
                ))}
                  </div>
              </tr>
            )})}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default StatPosition;