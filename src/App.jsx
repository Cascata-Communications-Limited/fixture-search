import FixtureSearch from './components/FixtureSearch';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { formatFixtureDate } from './utils/formatters';

const fixtureFormatter = (fixture) =>
  `${formatFixtureDate(fixture.fixtureDate)} ${fixture.homeTeamName} vs. ${fixture.awayTeamName} ${fixture.venue.venueName}`;

const fixtureLinkRoot = "https://www.triptab.co.uk/fixture"; ``

function handleFixtureSelected(fixture) {
  window.open(`${fixtureLinkRoot}/${fixture.fixtureId}`, '_blank');
}

function resetSearch() {
  console.log("Resetting search form");
}

function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <FixtureSearch
        sport="football"
        heading="English Football 2025/26"
        onFixtureSelected={handleFixtureSelected}
        className="fixture-search"
        fixtureLinkRoot={fixtureLinkRoot}
        style=""
        variant="compact"
        formatter={fixtureFormatter}
        emptyMessage="No Fixtures Returned"
        onReset={resetSearch}
        fixtureListStyle={{ maxHeight: '30rem', overflowY: 'auto' }}
      />
    </div>
  );
}

export default App;