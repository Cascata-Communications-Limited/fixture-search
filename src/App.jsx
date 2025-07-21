import FixtureSearch from './components/FixtureSearch';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

 const fixtureLinkRoot = "https://www.triptab.co.uk/fixture";``

    function handleFixtureSelected(fixture) {
        window.open(`${fixtureLinkRoot}/${fixture.fixtureId}`, '_blank');
      }    

    function App() {
      return (
        <div style={{ padding: '2rem' }}>
          <FixtureSearch
            sport="football"
            onFixtureSelected={handleFixtureSelected}
            className="fixture-search"
            fixtureLinkRoot = {fixtureLinkRoot} 
          />
        </div>
      );
}

export default App;