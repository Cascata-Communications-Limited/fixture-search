import React, { useState, useEffect } from 'react';
import { fetchTeamsByCompetition, getFixtures } from '../services/fixtureManagerService.js';
import FixtureList from './FixtureList.jsx';
import styles from '../styles/fixtureSearch.module.css';

/**
 * FixtureSearch Component
 * A customizable search panel for finding sports fixtures
 */

export default function FixtureSearch({
  sport,
  heading,
  headingClassName,
  subHeading,
  subHeadingClassName,
  resetClassName,
  resetPosition,
  showResetIcon,
  restText,
  onFixtureSelected,
  className,
  backgroundColor,
  style,
  variant,
  formatter,
  emptyMessage,
  onReset,
  fixtureListStyle,
  fixtureLinkRoot,
  iconPath,
  iconClass,
  poweredByLogoPath,
  showPoweredBy,
  poweredByText,
  poweredByClassName
}) {
  const [selectedCompId, setSelectedCompId] = useState('');
  const [selectedTeamId, setSelectedTeamId] = useState('');
  const [teams, setTeams] = useState([]);
  const [listings, setListings] = useState([]);
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const initialListUrl = "/data/football-mens-england-25-26.json";

  useEffect(() => {
    fetchDivisionListings();
  }, []);

  useEffect(() => {
    if (selectedCompId) {
      fetchTeamsByCompetition(selectedCompId)
        .then(setTeams)
        .catch(err => {
          console.error('Error fetching teams:', err);
          setTeams([]);
        });

      setFixtures([]);
      setSelectedTeamId('');
    }
  }, [selectedCompId]);

  useEffect(() => {
    if (!selectedCompId || !selectedTeamId) return;
    setLoading(true);
    setError('');
    setFixtures([]);
    const fetchData = async () => {
      try {
        const data = await getFixtures({
          teamId: selectedTeamId,
          competitionId: selectedCompId
        });
        setFixtures(data);
      } catch (err) {
        setError('Failed to load fixtures');
      } finally {
        setLoading(false);
      }
    };

    fetchData();

  }, [selectedTeamId, selectedCompId]);

  function fetchDivisionListings() {
    fetch(initialListUrl)
      .then(res => {
        if (!res.ok) throw new Error('Failed to load listings');
        return res.json();
      })
      .then(data => {
        console.log('Loaded listings:', data);
        setListings(data); // assuming setListings is scoped appropriately
      })
      .catch(err => {
        console.error('Error fetching listings:', err);
        setError('Error fetching listings:', err);
      });
  }

  const resetSearch = () => {
    setSelectedCompId('');
    setSelectedTeamId('');
    setTeams([]);
    setFixtures([]);
    setError('');
    setLoading(false);
  };

  const handleReset = () => {
    if (typeof onReset === 'function') {
      onReset(); // External control
    } else {
      resetSearch(); // Internal fallback
    }
  }

  return (
    <div className='container'>
      <div className={`${styles['tt-search-box']} d-flex flex-wrap align-items-stretch rounded overflow-hidden`}>

        {/* Graphic Pane */}
        <div
          className='graphic-pane position-relative d-flex align-items-center justify-content-center text-white'
          style={{ backgroundColor: backgroundColor }}>
          <img src={iconPath} alt={`${sport} icon`} className={iconClass} style={{ maxHeight: '48px', opacity: 0.7 }} />
        </div>


        {/* Control Pane */}
        <div className={`${styles['tt-control-pane']} p-3`}>
          <div className={styles['tt-side-panel']}>
            <h5 className={headingClassName}>{heading}</h5>
            <p className={subHeadingClassName}>{subHeading}</p>
            <div className="reset-bar mb-2">
              <a
                href="#"
                className={resetClassName ?? "text-muted small d-inline-flex align-items-center"}
                onClick={(e) => { e.preventDefault(); handleReset(); }}
              >
                <i className="bi bi-arrow-counterclockwise me-1" aria-hidden="true"></i>
                <span className="sr-only">Reset Search</span>
                <span className="visually-hidden">Reset Search</span>
              </a>
            </div>
            <div className={className}>

              {selectedCompId === '' && (
                <>
                  <select value={selectedCompId} onChange={(e) => setSelectedCompId(e.target.value)} className="form-select form-select-sm">
                    <option value="">-- Select a division --</option>
                    {listings
                      .sort((a, b) => a.order - b.order)
                      .map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.name}
                        </option>
                      ))}
                  </select>
                </>
              )}

              {teams.length > 0 && (
                <>
                  <select value={selectedTeamId} onChange={(e) => setSelectedTeamId(e.target.value)} className="form-select form-select-sm">
                    <option value="">-- Select a team --</option>
                    {teams.map((team) => (
                      <option key={team.id} value={team.id}>
                        {team.name}
                      </option>
                    ))}
                  </select>
                </>
              )}

              {loading && (
                <>
                  <div className="text-muted">
                    <i className="bi bi-hourglass-split"></i> Loading fixtures...
                  </div>
                </>
              )}
            </div>
            {error && (
              <>
                <div className="alert alert-warning d-flex align-items-center" role="alert">
                  <i className="bi bi-exclamation-triangle me-2"></i> {error}
                </div>
              </>
            )}

            {/* Powered By Footer */}
            {showPoweredBy && (
              <div className={poweredByClassName} style={{ padding: '0.5rem', textAlign: 'right', fontSize: '0.75rem', borderTop: '1px solid #eee' }}>
                {poweredByText ?? "Powered by "}<img src={poweredByLogoPath} alt="Powered by logo" style={{ maxHeight: '24px', marginLeft: '8px' }} />
              </div>
            )}
          </div>
          {fixtures.length > 0 && (
              <>
                <FixtureList
                  fixtures={fixtures}
                  onSelect={onFixtureSelected}
                  fixtureLinkRoot={fixtureLinkRoot}
                  formatter={formatter}
                  className='list-group'
                  fixtureListStyle={fixtureListStyle}
                  fixtureListClassName={styles['tt-fixture-popout']} />
              </>
          )}
        </div>
      </div>
    </div>
  );
}