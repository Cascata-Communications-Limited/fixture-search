import { getFixturesByListingId } from '../fixtureManagerService';

// afterEach(() => {
//   jest.resetAllMocks();
// });


test('returns fixture data on successful fetch', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([{ id: 1, homeTeam: 'A', awayTeam: 'B' }]),
    })
  );  
  const data = await getFixturesByListingId('prem');
  console.log(data);
  expect(Array.isArray(data)).toBe(true);
  expect(data[0].homeTeam).toBe('A');
});

test('throws error when response is not ok', async () => {
  global.fetch = jest.fn(() =>
  Promise.resolve({ ok: false, status: 404 })
  );
  await expect(getFixturesByListingId('invalid')).rejects.toThrow('Fetch failed with status 404');
});

test('throws error when data is not an array', async () => {
  global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ error: 'not an array' }),
  }));
  await expect(getFixturesByListingId('bad')).rejects.toThrow('Invalid fixture data format');
});