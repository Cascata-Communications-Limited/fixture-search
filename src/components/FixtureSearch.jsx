import React, { useState,  useEffect} from 'react';
import { fetchTeamsByCompetition, getFixtures } from '../services/fixtureManagerService.js';
import FixtureList from './FixtureList.jsx';

/**
 * FixtureSearch Component
 * A customizable search panel for finding sports fixtures
 */

export default function FixtureSearch({
  iconPath,
  backgroundColor,
  sport,
  onFixtureSelected,
  fixtureLinkRoot,
  formatter,
  poweredByLogoPath
}) {
    const [selectedCompId, setSelectedCompId] = useState('');
    const [selectedTeamId, setSelectedTeamId] = useState('');
    const [teams, setTeams] = useState([]);
    const [selectedListingId, setSelectedListingId] = useState(null);
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
      
      getFixtures({ teamId: selectedTeamId, competitionId: selectedCompId }).then(setFixtures);
      
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

    //setLoading(true);
    // setError('');
    // setFixtures([]);

   return (
   <div className="fixture-search" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '640px', borderRadius: '6px', overflow: 'hidden' }}>
   
      {/* Graphic Pane */}
      <div style={{ backgroundColor: backgroundColor, padding: '1rem', display: 'flex', alignItems: 'center' }}>
        <img src={iconPath} alt={`${sport} icon`} style={{ maxHeight: '48px', opacity: 0.7 }} />
      </div>

      {/* Control Pane */}
      <div style={{ padding: '1rem' }}>
        <div className="d-flex gap-2 align-items-center mb-3">
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

        {fixtures.length > 0 && (
          <>
            <h3>Fixtures</h3>
            <ul>
              <FixtureList 
              fixtures={fixtures} 
              onSelect={onFixtureSelected} 
              fixtureLinkRoot={fixtureLinkRoot}
              formatter ={formatter}
              className='fixture-results mt-4'/>
            </ul>
          </>
        )}

        {loading && <div className="text-muted"><i className="bi bi-hourglass-split"></i> Loading fixtures...</div>}

        {/* {error && (
          <div className="alert alert-warning d-flex align-items-center" role="alert">
              <i className="bi bi-exclamation-triangle me-2"></i> {error}
           </div>
         )} */}

          {/* Powered By Footer */}
        {poweredByLogoPath && (
          <div style={{ padding: '0.5rem', textAlign: 'right', fontSize: '0.75rem', borderTop: '1px solid #eee' }}>
            Powered by <img src={poweredByLogoPath} alt="Powered by logo" style={{ maxHeight: '24px', marginLeft: '8px' }} />
          </div>
        )}
        </div>
        </div>
      </div>
    );
}