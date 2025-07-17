import { getFixturesByListingId } from '../fixtureManagerService';

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([{ id: 1, homeTeam: 'A', awayTeam: 'B' }]),
  })
);

test('returns fixture data on successful fetch', async () => {
  const data = await getFixturesByListingId('prem');
  expect(Array.isArray(data)).toBe(true);
  expect(data[0].homeTeam).toBe('A');
});