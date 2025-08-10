import React, {useEffect, useMemo, useState} from "react";

export default function StatTeam({
  data,
  loadData,
  teams = [],
  showLogos = true,
  titleOverride,
  labels = {
    groupStage: "조별리그",
    playoffs: "플레이오프",
    promotion: "승강전",
    date: "날짜",
    place: "장소",
  },
}) {
  const [state, setState] = useState({
    loading: !data && !!loadData,
    error: null,
    data,
  });
  const [division, setDivision] = useState("1부");

  useEffect(() => {
    let mounted = true;
    if (!data && loadData) {
      setState((s) => ({...s, loading: true, error: null}));
      loadData()
        .then(
          (res) => mounted && setState({loading: false, error: null, data: res})
        )
        .catch(
          (err) =>
            mounted &&
            setState({
              loading: false,
              error: err?.message || "Load failed",
              data: null,
            })
        );
    } else {
      // data prop이 바뀌었을 때 동기화
      setState({loading: false, error: null, data});
    }
    return () => {
      mounted = false;
    };
  }, [data, loadData]);

  const teamIndex = useMemo(() => {
    const idx = new Map();
    teams.forEach((t) => idx.set(t.name, t));
    return idx;
  }, [teams]);

  if (state.loading) return <div className="rv__status">Loading…</div>;
  if (state.error)
    return <div className="rv__status rv__status--error">{state.error}</div>;
  if (!state.data) return <div className="rv__status">No data</div>;

  const d = state.data;

  return (
    <div className="rv">
        <div className='divisionButtons'>
          <button
            className='divisionButton ${division === "1부" ? "active" : ""}'
            onClick={() => setDivision("1부")}
            />
          <button
            className='divisionButton ${division === "2부" ? "active" : ""}'
            onClick={() => setDivision("2부")}
            />
        </div>
      <div className="rv__container">
        <header className="rv__header">
          <h1 className="rv__title">
            {titleOverride || `${d.season} ${d.event} 경기 결과`}
          </h1>
          <p className="rv__desc">날짜/장소는 비워둔 상태입니다.</p>
        </header>

        {d.divisions.map((div) => (
          <div className="rv__division" key={div.name}>
            <h2 className="rv__divisionTitle">{div.name}</h2>

            {/* Groups */}
            <Section title={labels.groupStage}>
              <div className="rv__groups">
                {div.groups.map((g) => (
                  <GroupCard
                    key={g.name}
                    group={g}
                    teamIndex={teamIndex}
                    showLogos={showLogos}
                    labels={labels}
                  />
                ))}
              </div>
            </Section>

            {/* Playoffs */}
            <Section title={labels.playoffs}>
              <MatchList
                matches={div.playoffs}
                teamIndex={teamIndex}
                showLogos={showLogos}
                labels={labels}
              />
            </Section>

            {/* Promotion / Relegation */}
            {div.promotionRelegation?.length > 0 && (
              <Section title={labels.promotion}>
                <MatchList
                  matches={div.promotionRelegation}
                  teamIndex={teamIndex}
                  showLogos={showLogos}
                  labels={labels}
                />
              </Section>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Section({title, children}) {
  return (
    <section className="rv__section">
      <h3 className="rv__sectionTitle">{title}</h3>
      <div className="rv__card">{children}</div>
    </section>
  );
}

function GroupCard({group, teamIndex, showLogos, labels}) {
  return (
    <div className="rv__group">
      <div className="rv__groupHead">
        <h4 className="rv__groupTitle">{group.name}</h4>
        <ul className="rv__teamChips">
          {group.teams.map((t) => (
            <li className="rv__chip" key={t}>
              {t}
            </li>
          ))}
        </ul>
      </div>
      <MatchList
        matches={group.matches}
        teamIndex={teamIndex}
        showLogos={showLogos}
        labels={labels}
      />
    </div>
  );
}

function MatchList({matches = [], teamIndex, showLogos, labels}) {
  if (!matches.length) return <div className="rv__empty">No matches</div>;
  return (
    <div className="rv__list">
      <div className="rv__listHead">
        <div className="rv__cell rv__cell--date">{labels.date}</div>
        <div className="rv__cell rv__cell--teams">경기</div>
        <div className="rv__cell rv__cell--score">스코어</div>
        <div className="rv__cell rv__cell--place">{labels.place}</div>
      </div>
      {matches.map((m, i) => (
        <MatchRow
          key={`${m.stage}-${i}-${m.home}-${m.away}`}
          m={m}
          teamIndex={teamIndex}
          showLogos={showLogos}
        />
      ))}
    </div>
  );
}

function MatchRow({m, teamIndex, showLogos}) {
  const home = teamIndex.get(m.home) || {name: m.home, logo: ""};
  const away = teamIndex.get(m.away) || {name: m.away, logo: ""};
  const score =
    m.homeScore == null || m.awayScore == null
      ? m.status || "-"
      : `${m.homeScore} : ${m.awayScore}`;

  return (
    <div className="rv__row">
      <div className="rv__cell rv__cell--date">{m.date || "-"}</div>
      <div className="rv__cell rv__cell--teams">
        <span className="rv__stage">[{m.stage}]</span>
        <TeamBadge name={home.name} logo={home.logo} showLogo={showLogos} />
        <span className="rv__vs">vs</span>
        <TeamBadge
          name={away.name}
          logo={away.logo}
          showLogo={showLogos}
          right
        />
      </div>
      <div className="rv__cell rv__cell--score">{score}</div>
      <div className="rv__cell rv__cell--place">{m.location || "-"}</div>
    </div>
  );
}

function TeamBadge({name, logo, showLogo, right = false}) {
  return (
    <span className={`rv__team ${right ? "rv__team--right" : ""}`}>
      {showLogo && logo ? (
        <img className="rv__logo" src={logo} alt={name} />
      ) : null}
      <span className="rv__teamName">{name}</span>
    </span>
  );
}
