 export default function FixtureList({ 
    fixtures = [], 
    onSelect,
    fixtureLinkRoot,
    formatter,
    fixtureListStyle,
    fixtureListClassName}) {
    if (!fixtures.length) return null;

    return (
        <div className={fixtureListClassName} style={fixtureListStyle}>
            <ul className='list-group list-unstyled mb-0'>
                {fixtures.map((f) => (
                    <li key={f.fixtureId}>
                        <a 
                        href={`${fixtureLinkRoot}/${f.fixtureId}`} 
                        target='_blank'
                        className="list-group-item d-flex justify-content-between align-items-start"
                        onClick={(e) => {
                                e.preventDefault();
                            if (onSelect) {
                                onSelect(f);
                            } else {
                                window.open(`${fixtureLinkRoot}/${f.fixtureId}`, '_blank');
                            }
                        }
                }
                        >
                        {formatter ? formatter(f) : f.homeTeamName}                        
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
