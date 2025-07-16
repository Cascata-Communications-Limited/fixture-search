import React, { useState,  useEffect} from 'react';

/**
 * FixtureSearch Component
 * A customizable search panel for finding sports fixtures
 */

export default function FixtureSearch({
  sport = 'football', ...props
}) {
    const [selectedListingId, setSelectedListingId] = useState(null);
    const [listings, setListings] = useState([]);
    const [fixtures, setFixtures] = useState([]);

    useEffect(() => {
      fetch('/mock/listings.json')
        .then(res => {
          if (!res.ok) throw new Error('Failed to load listings');
          return res.json();
        })
        .then(data => {
          console.log('Loaded listings:', data);
          setListings(data);
        })
        .catch(err => {
          console.error('Error fetching listings:', err);
        });
    }, []);

    function handleSelectionChange(e) {
    setSelectedListingId(parseInt(e.target.value));
    console.log('Selected listing ID:', e.target.value);
  }

  function handleSearchClick() {
    if (!selectedListingId) {
      console.warn('No division selected');
      return;
    }

    // 🧩 Simulate a fetch call — later we’ll replace with real API
    const url = `/mock/fixtures_${selectedListingId}.json`;
    console.log('Fetching fixtures from:', url);

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch fixtures');
        return res.json();
      })
      .then(data => {
        console.log('Fixtures received:', data);
        setFixtures(data);
      })
      .catch(err => console.error('Error fetching fixtures:', err));
  }

  console.log('Rendering FixtureSearch with listings:', listings);

  return (
    <div className="fixture-search" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '640px', borderRadius: '6px', overflow: 'hidden' }}>
      
      {/* Graphic Pane */}
      <div style={{ backgroundColor: props.backgroundColor, padding: '1rem', display: 'flex', alignItems: 'center' }}>
        <img src={props.iconPath} alt={`${sport} icon`} style={{ maxHeight: '48px', opacity: 0.7 }} />
      </div>

      {/* Control Pane */}
            <div style={{ padding: '1rem' }}>
        <h3>{props.header}</h3>
        <p>{props.strapline}</p>

        <select
          className="form-select"
          value={selectedListingId ?? ''}
          onChange={handleSelectionChange}
        >
          <option disabled value="">Select a division</option>
          {listings.map(({ id, name }) => (
            <option key={id} value={id}>{name}</option>
          ))}
        </select>

        <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={handleSearchClick}>
          Search
        </button>
          <div className="fixture-results mt-4">
          {fixtures.length === 0 ? (
            <p>No fixtures loaded yet.</p>
          ) : (
            <ul className="list-group">
              {fixtures.map(f => (
                <li key={f.id} className="list-group-item">
                  <strong>{f.homeTeam}</strong> vs <strong>{f.awayTeam}</strong> <br />
                  {f.date} @ {f.time} — <em>{f.venue}</em>
                </li>
              ))}
            </ul>
            )}
          </div>
      </div>

      {/* Powered By Footer */}
      {props.poweredByLogoPath && (
        <div style={{ padding: '0.5rem', textAlign: 'right', fontSize: '0.75rem', borderTop: '1px solid #eee' }}>
          Powered by <img src={props.poweredByLogoPath} alt="Powered by logo" style={{ maxHeight: '24px', marginLeft: '8px' }} />
        </div>
      )}
    </div>
  );
}