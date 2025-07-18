export function getFixtures({ teamId, competitionId }) {
  // Return dummy fixtures for the selected team
  return Promise.resolve([
    { id: 1, name: '2024-08-15 Dragons vs Wolves' },
    { id: 2, name: '2024-08-21 Dragons vs Eagles' },
    { id: 3, name: '2024-08-28 Hawks vs Dragons' }
  ]);
}

export function fetchTeamsByCompetition(competitionId) {
  // Return dummy teams
  return Promise.resolve([
    { id: 101, name: 'Dragons' },
    { id: 102, name: 'Wolves' },
    { id: 103, name: 'Eagles' },
    { id: 104, name: 'Hawks' }
  ]);
}

export async function getFixturesByListingId(listingId) {
  const url = `/api/fixtures/${listingId}`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Fetch failed with status ${res.status}`);
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
      throw new Error('Invalid fixture data format');
    }

    return data;
  } catch (err) {
    console.error('Fixture Manager Error:', err.message);
    throw err;
  }
}