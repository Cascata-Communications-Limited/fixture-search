import React from 'react';
import { formatFixtureDate } from '../utils/formatters.js';

const fixtureLinkRoot = "https://www.triptab.co.uk/fixture";

 export default function FixtureList({ 
    fixtures = [], 
    onSelect,
    className = '',
    title = 'Fixtures' }) {
    if (!fixtures.length) return null;

    return (
        <div className={className}>
            <h3>{title}</h3>
            <ul>
                {fixtures.map((f) => (
                    <li key={f.fixtureId}>
                        <a 
                        href={`${fixtureLinkRoot}/${f.fixtureId}`} 
                        target='_blank'
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
                        {`${formatFixtureDate(f.fixtureDate)} ${f.homeTeamName} vs. ${f.awayTeamName} ${f.venue.venueName}`}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
