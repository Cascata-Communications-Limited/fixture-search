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

## Usage

import FixtureSearch from '@your-scope/fixture-manager-search-component';

<FixtureSearch
  sport="football"
  backgroundColor="#004080"
  iconPath="/icons/football.svg"
  header="Find Fixtures"
  strapline="Search by team or competition"
/>

## Props

| Prop | Type | Description | 
| sport | string | Sport identifier used for icon and filtering | 
| backgroundColor | string | Hex code for graphic pane background | 
| iconPath | string | Path to sport icon image | 
| header | string | Header text for the control pane | 
| strapline | string | Supporting text below the header | 
| poweredByLogoPath | string | Optional logo for branding | 

## Development
This component is built using Vite and plain JavaScript for rapid prototyping. TypeScript support is planned as a future enhancement.

## License
MIT