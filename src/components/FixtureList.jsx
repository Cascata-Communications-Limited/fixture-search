import React from 'react';
import { formatFixtureDate } from '../utils/formatters.js';

 export default function FixtureList({ 
    fixtures = [], 
    onSelect,
    className = '',
    title = 'Fixtures',
    fixtureLinkRoot,
    style,
    variant,
    formatter,
    emptyMessage,
    fixtureListStyle}) {
    if (!fixtures.length) return null;

    return (
        <div className={className} style={fixtureListStyle}>
            <h3>{title}</h3>
            <ul className='list-group'>
                {fixtures.map((f) => (
                    <li key={f.fixtureId}>
                        <a 
                        href={`${fixtureLinkRoot}/${f.fixtureId}`} 
                        target='_blank'
                        className="list-group-item d-flex justify-content-between align-items-start"
                        onClick={(e) => {
                                e.preventDefault();
                            if (onSelect) {
                                onSelect(f);
                            } else {
                                window.open(`${fixtureLinkRoot}/${f.fixtureId}`, '_blank');
                            }
                        }
                }
                        >
                        {formatter ? formatter(f) : f.homeTeamName}
                        {/* /* {`${formatFixtureDate(f.fixtureDate)} ${f.homeTeamName} vs. ${f.awayTeamName} ${f.venue.venueName}`} */} 
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
