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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

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

    setLoading(true);
    setError('');
    setFixtures([]);

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`Failed to fetch fixtures: ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setFixtures(data);
        } else {
          setError('No fixtures available for this division.');
        }
      })
      .catch(err => {
        console.error('Fixture fetch error:', err);
        setError('Something went wrong while fetching fixtures.');
      })
      .finally(() => setLoading(false));
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

        <div className="d-flex gap-2 align-items-center mb-3">
            <select
              className="form-select form-select-sm"
              value={selectedListingId ?? ''}
              onChange={handleSelectionChange}
            >
              <option disabled value="">Select a division</option>
              {listings.map(({ id, name }) => (
                <option key={id} value={id}>{name}</option>
              ))}
            </select>

            <button className="btn btn-primary btn-sm" style={{ marginTop: '1rem' }} onClick={handleSearchClick}>
              <i className='bi bi-search'></i>Search
            </button>
        </div>
        <div className="fixture-results mt-4">
          <div className="fixture-results mt-4">
            {loading && <div className="text-muted"><i className="bi bi-hourglass-split"></i> Loading fixtures...</div>}

            {error && (
              <div className="alert alert-warning d-flex align-items-center" role="alert">
                <i className="bi bi-exclamation-triangle me-2"></i> {error}
              </div>
            )}

            {!loading && !error && fixtures.length > 0 && (
              <ul className="list-group">
                {fixtures.map(f => (
                  <li key={f.id} className="list-group-item d-flex justify-content-between align-items-start">
                    <div>
                      <strong>{f.homeTeam}</strong> vs <strong>{f.awayTeam}</strong><br />
                      {f.date} @ {f.time} — <em>{f.venue}</em>
                    </div>
                    <i className="bi bi-calendar-event text-secondary"></i>
                  </li>
                ))}
              </ul>
            )}
          </div>
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