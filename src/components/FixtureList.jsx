import React from 'react';
import { formatFixtureDate } from '../utils/formatters.js';

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
                        href={`/trip-planner/${f.fixtureId}`} 
                        onClick={(e) => {
                                e.preventDefault();
                            if (onSelect) {
                                onSelect(f);
                            } else {
                                window.location.href = `/trip-planner/${f.fixtureId}`;
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
