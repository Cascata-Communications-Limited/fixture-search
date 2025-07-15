import React, { useState } from 'react';

/**
 * FixtureSearch Component
 * A customizable search panel for finding sports fixtures
 */


const mockListings = [
  { id: 1, name: 'Division 1' },
  { id: 2, name: 'Division 2' },
  { id: 3, name: 'Division 3' }
];


export default function FixtureSearch({
  sport = 'football', ...props
}) {
    const [selectedListingId, setSelectedListingId] = useState(null);

    function handleSelectionChange(e) {
    setSelectedListingId(parseInt(e.target.value));
    console.log('Selected listing ID:', e.target.value);
  }

  console.log('Rendering FixtureSearch with listings:', mockListings);

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
          {mockListings.map(({ id, name }) => (
            <option key={id} value={id}>{name}</option>
          ))}
        </select>

        <button className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Search
        </button>
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