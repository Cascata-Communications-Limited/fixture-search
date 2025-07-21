import React, { useState,  useEffect} from 'react';
import { getFixturesByListingId, fetchTeamsByCompetition, getFixtures } from '../services/fixtureManagerService.js';
import FixtureList from './FixtureList.jsx';

/**
 * FixtureSearch Component
 * A customizable search panel for finding sports fixtures
 */

export default function FixtureSearch({
  onFixtureSelected,
  sport = 'football', 
  ...props
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
    const fixtureLinkRoot = "https://www.triptab.co.uk/fixture";

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
      if (selectedTeamId && selectedCompId) {
        getFixtures({ teamId: selectedTeamId, competitionId: selectedCompId }).then(setFixtures);
      }
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
        });
    }

    function handleFixtureSelected(fixture) {
      if (onFixtureSelected) {
        onFixtureSelected(fixture);
      } else {
        window.open(`${fixtureLinkRoot}/${fixture.fixtureId}`, '_blank');
      }
    }

    // setLoading(true);
    // setError('');
    // setFixtures([]);

   return (
      <div>
        <h3>Select Competition</h3>
        <select value={selectedCompId} onChange={(e) => setSelectedCompId(e.target.value)}>
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
            <h3>Select Team</h3>
            <select value={selectedTeamId} onChange={(e) => setSelectedTeamId(e.target.value)}>
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
              <FixtureList fixtures={fixtures} onSelect={handleFixtureSelected} />
            </ul>
          </>
        )}

          {/* Powered By Footer */}
        {props.poweredByLogoPath && (
          <div style={{ padding: '0.5rem', textAlign: 'right', fontSize: '0.75rem', borderTop: '1px solid #eee' }}>
            Powered by <img src={props.poweredByLogoPath} alt="Powered by logo" style={{ maxHeight: '24px', marginLeft: '8px' }} />
          </div>
        )}

      </div>
    );
}