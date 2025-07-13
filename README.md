# Fixture Manager Search Component

A self-contained React component that integrates with the Fixture Manager Search API, enabling sports fixture lookup by team or competition across supported sports.

## Features

- 🔍 Dropdown-based search for teams, competitions, or sports
- 🎨 Customizable layout with sport icon, background color, and strapline
- 🧩 Optional "Powered by" branding slot for distributable use
- ⚙️ Designed for reuse across React and Blazor applications

## Installation

```bash
npm install @your-scope/fixture-manager-search-component

import FixtureSearch from '@your-scope/fixture-manager-search-component';

<FixtureSearch
  sport="football"
  backgroundColor="#004080"
  iconPath="/icons/football.svg"
  header="Find Fixtures"
  strapline="Search by team or competition"
/>