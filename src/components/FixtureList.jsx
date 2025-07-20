import React from 'react';
import { formatFixtureDate } from '../utils/formatters.js';

export default function FixtureList({ fixtures = [], onSelect }) {
    if (!fixtures.length) return null;

    return (
        <div>
            <h3>Fixtures</h3>
            <ul>
                {fixtures.map((f) => (
                    <li key={f.fixtureId}>
                        <a href={`/trip-planner/${f.id}`} onClick={(e) => handleFixtureClick(e, f)}>
                            {`${formatFixtureDate(f.fixtureDate)} ${f.homeTeamName} vs. ${f.awayTeamName} ${f.venue.venueName}`}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
