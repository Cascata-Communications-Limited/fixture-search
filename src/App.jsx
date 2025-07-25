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
        heading="ENGLISH FOOTBALL 2025/26"
        subHeading="Search for fixtures by team"
        onFixtureSelected={handleFixtureSelected}
        className="p-3 border rounded shadow-sm"
        backgroundColor='#7BB369'
        fixtureLinkRoot={fixtureLinkRoot}
        style=""
        variant="compact"
        formatter={fixtureFormatter}
        headingClassName="fw-bold mb-1"
        subHeadingClassName="text-muted small mb-3"
        resetClassName="text-muted small mt-2 d-inline-flex align-items-center"
        resetPosition="above"
        showResetIcon={true}
        restText="Reset Search"
        emptyMessage="No fixtures available."
        onReset={null}
        fixtureListStyle={{ maxHeight: '30rem', overflowY: 'auto' }}
        iconPath="/icons8-soccer-ball-wh-50.png"
        iconClass='tt-sport-icon'
        poweredByLogoPath="/triptab_logo.png"
        showPoweredBy={true}
        poweredByText="Powered by TripTab."
        poweredByClassName="text-muted small text-center pt-3" 
      />
    </div>
  );
}

export default App;