import React, { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const StatPosition = ({ 
  players = [], 
  divisions = ['1부', '2부'],
  initialDivision = '1부',
  initialPosition = 'QB',
  onPlayerClick = () => {},
  className = ''
}) => {
  const [selectedDivision, setSelectedDivision] = useState(initialDivision);
  const [selectedPosition, setSelectedPosition] = useState(initialPosition);
  const [selectedStatType, setSelectedStatType] = useState('패스');
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
    const filteredPlayers = players.filter(player => 
      player.division === selectedDivision && 
      player.position === selectedPosition
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
  }, [sortConfig, selectedDivision, selectedPosition, players]);

  // 현재 선택된 통계 타입의 컬럼들
  const currentColumns = statColumns[selectedPosition]?.[selectedStatType] || [];

  const styles = {
    container: {
      width: '100%',
      backgroundColor: '#1a1a2e',
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif'
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      marginBottom: '24px',
      padding: '16px',
      backgroundColor: '#16213e',
      borderBottom: '1px solid #2a2a3e'
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#ffffff'
    },
    divisionButtons: {
      display: 'flex',
      gap: '8px'
    },
    divisionButton: {
      padding: '8px 16px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px',
      transition: 'all 0.2s'
    },
    divisionButtonActive: {
      backgroundColor: '#3b82f6',
      color: '#ffffff'
    },
    divisionButtonInactive: {
      backgroundColor: '#374151',
      color: '#d1d5db'
    },
    positionContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '4px',
      marginBottom: '16px',
      padding: '0 16px'
    },
    positionButton: {
      padding: '6px 12px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '12px',
      transition: 'all 0.2s'
    },
    positionButtonActive: {
      backgroundColor: '#3b82f6',
      color: '#ffffff'
    },
    positionButtonInactive: {
      backgroundColor: '#374151',
      color: '#9ca3af'
    },
    categoryContainer: {
      display: 'flex',
      gap: '8px',
      marginBottom: '16px',
      padding: '0 16px'
    },
    categoryButton: {
      padding: '8px 16px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px',
      transition: 'all 0.2s'
    },
    categoryButtonActive: {
      backgroundColor: '#4b5563',
      color: '#ffffff'
    },
    categoryButtonInactive: {
      backgroundColor: '#374151',
      color: '#9ca3af'
    },
    tableHeader: {
      backgroundColor: '#16213e',
      borderBottom: '1px solid #374151',
      padding: '12px'
    },
    tableTitle: {
      fontSize: '18px',
      fontWeight: '500',
      margin: 0
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      overflowX: 'auto',
      display: 'block',
      whiteSpace: 'nowrap'
    },
    thead: {
      backgroundColor: '#374151',
      display: 'table-header-group'
    },
    tbody: {
      display: 'table-row-group'
    },
    tr: {
      display: 'table-row'
    },
    th: {
      textAlign: 'left',
      padding: '12px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      userSelect: 'none',
      display: 'table-cell',
      minWidth: '100px',
      position: 'relative'
    },
    thHover: {
      backgroundColor: '#4b5563'
    },
    td: {
      padding: '12px',
      fontSize: '14px',
      display: 'table-cell',
      borderBottom: '1px solid #2a2a3e'
    },
    playerName: {
      fontWeight: '500',
      color: '#3b82f6',
      cursor: 'pointer'
    },
    teamName: {
      color: '#9ca3af'
    },
    sortContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },
    sortArrows: {
      display: 'flex',
      flexDirection: 'column',
      marginLeft: '4px'
    },
    rowEven: {
      backgroundColor: '#1a1a2e'
    },
    rowOdd: {
      backgroundColor: '#16213e'
    },
    rowHover: {
      backgroundColor: '#374151'
    }
  };

  return (
    <div style={styles.container} className={className}>
      {/* 헤더 */}
      <div style={styles.header}>
        <h1 style={styles.title}>Stech</h1>
        <div style={styles.divisionButtons}>
          {divisions.map((division) => (
            <button 
              key={division}
              style={{
                ...styles.divisionButton,
                ...(selectedDivision === division ? styles.divisionButtonActive : styles.divisionButtonInactive)
              }}
              onClick={() => setSelectedDivision(division)}
            >
              {division}
            </button>
          ))}
        </div>
      </div>

      {/* 포지션 선택 */}
      <div style={styles.positionContainer}>
        {Object.keys(positionCategories).map((position) => (
          <button
            key={position}
            style={{
              ...styles.positionButton,
              ...(selectedPosition === position ? styles.positionButtonActive : styles.positionButtonInactive)
            }}
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
      <div style={styles.categoryContainer}>
        {positionCategories[selectedPosition]?.map((category) => (
          <button
            key={category}
            style={{
              ...styles.categoryButton,
              ...(selectedStatType === category ? styles.categoryButtonActive : styles.categoryButtonInactive)
            }}
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
      <div style={styles.tableHeader}>
        <h3 style={styles.tableTitle}>포지션별 선수 순위</h3>
      </div>

      {/* 통계 테이블 */}
      <div style={{ overflowX: 'auto' }}>
        <table style={styles.table}>
          <thead style={styles.thead}>
            <tr style={styles.tr}>
              <th style={{...styles.th, minWidth: '60px'}}>순위</th>
              <th style={{...styles.th, minWidth: '120px'}}>선수명</th>
              <th style={{...styles.th, minWidth: '120px'}}>팀</th>
              {currentColumns.map((column) => (
                <th
                  key={column.key}
                  style={styles.th}
                  onClick={() => handleSort(column.key)}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#4b5563'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#374151'}
                >
                  <div style={styles.sortContainer}>
                    <span style={{ fontSize: '12px' }}>{column.label}</span>
                    <div style={styles.sortArrows}>
                      <ChevronUp 
                        size={10} 
                        color={sortConfig.key === column.key && sortConfig.direction === 'asc' ? '#3b82f6' : '#6b7280'}
                      />
                      <ChevronDown 
                        size={10} 
                        color={sortConfig.key === column.key && sortConfig.direction === 'desc' ? '#3b82f6' : '#6b7280'}
                      />
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody style={styles.tbody}>
            {sortedPlayers.map((player, index) => (
              <tr 
                key={player.id || player.name}
                style={{
                  ...styles.tr,
                  ...(index % 2 === 0 ? styles.rowEven : styles.rowOdd)
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#374151'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#1a1a2e' : '#16213e'}
              >
                <td style={styles.td}>{player.rank || index + 1}</td>
                <td 
                  style={{...styles.td, ...styles.playerName}}
                  onClick={() => onPlayerClick(player)}
                >
                  {player.name}
                </td>
                <td style={{...styles.td, ...styles.teamName}}>{player.team}</td>
                {currentColumns.map((column) => (
                  <td key={column.key} style={styles.td}>
                    {typeof player[column.key] === 'number' && player[column.key] % 1 !== 0
                      ? player[column.key].toFixed(1)
                      : player[column.key] || '0'
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 데이터가 없을 때 */}
      {sortedPlayers.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px', 
          color: '#9ca3af',
          fontSize: '16px'
        }}>
          선택한 조건에 맞는 선수가 없습니다.
        </div>
      )}
    </div>
  );
};

export default StatPosition;