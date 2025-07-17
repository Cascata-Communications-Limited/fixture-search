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