import React from 'react';

/**
 * FixtureSearch Component
 * A customizable search panel for finding sports fixtures
 */

export default function FixtureSearch({
  sport = 'football',
  backgroundColor = '#004080',
  iconPath = '/icons/football.svg',
  header = 'Find Fixtures',
  strapline = 'Search by team or competition',
  poweredByLogoPath
}) {
  return (
    <div className="fixture-search" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '640px', borderRadius: '6px', overflow: 'hidden' }}>
      
      {/* Graphic Pane */}
      <div style={{ backgroundColor, padding: '1rem', display: 'flex', alignItems: 'center' }}>
        <img src={iconPath} alt={`${sport} icon`} style={{ maxHeight: '48px', opacity: 0.7 }} />
      </div>

      {/* Control Pane */}
      <div style={{ padding: '1rem' }}>
        <h3>{header}</h3>
        <p>{strapline}</p>

        {/* Dropdown Logic Placeholder */}
        <select className="form-select" style={{ marginBottom: '1rem' }}>
          <option disabled selected>Choose team or competition</option>
          <option>Example Team A</option>
          <option>Example Team B</option>
        </select>

        <button className="btn btn-primary">Search</button>
      </div>

      {/* Powered By Footer */}
      {poweredByLogoPath && (
        <div style={{ padding: '0.5rem', textAlign: 'right', fontSize: '0.75rem', borderTop: '1px solid #eee' }}>
          Powered by <img src={poweredByLogoPath} alt="Powered by logo" style={{ maxHeight: '24px', marginLeft: '8px' }} />
        </div>
      )}
    </div>
  );
}