// const apiUrlRoot = "https://localhost:7181";
const apiUrlRoot = "https://omnids.co.uk";

const teamsByCompetitionPath = "Listing/teamsbycompetition";
const fixturesByTeamAndCompetition = "Fixture/listbyteamandcompetition";

export async function fetchDivisionListings() {
  const res = await fetch('/mock/listings.json');
  if (!res.ok) throw new Error('Failed to load listings');
  return res.json();
}

export async function fetchTeamsByCompetition(competitionId) {
  const res = await fetch(`${apiUrlRoot}/${teamsByCompetitionPath}/${competitionId}`);
  if (!res.ok) throw new Error('Failed to fetch teams');
  return res.json();
}

export async function getFixtures({ teamId, competitionId }) {
  const res = await fetch(`${apiUrlRoot}/${fixturesByTeamAndCompetition}/${teamId}/${competitionId}`);
  if (!res.ok) throw new Error('Failed to fetch fixtures');
  return res.json();
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