## Fixture Search Component

**FixtureSearch** is a reusable React UI component for sports fixture lookup, powered by the Fixture Manager Search API. It delivers a curated interface for browsing fixtures by team or competition across supported sports.

- Name: FixtureSearch
- Type: React Functional Component
- Props Approach: Declarative, minimal (initial release uses curated UI)
- Styling: Bootstrap 5 + scoped layout
- Purpose: Sports fixture lookup UI component

Note: FixtureSearch is currently zero-config. All settings are managed internally for streamlined integration. Configurable props coming soon.

<!-- TODO: Replace badge paths once NPM entry is live -->
![Version](https://img.shields.io/npm/v/fixture-search.svg)
![License](https://img.shields.io/npm/l/fixture-search.svg)
![Build](https://img.shields.io/github/actions/workflows/status/Cascata-Communications-Limited/fixture-search/ci.yml)

## Component Purpose and Key Features

This section outlines core functionality. More customization options will be detailed in future releases as configuration expands.

**FixtureSearch** is designed to be a plug-and-play fixture lookup interface that’s flexible, brandable, and portable across projects.

- **Multi-criteria search**: Dropdown-based lookup by team, competition, or sport  
- **Customizable layout**: Configure sport icons, background colors, and strapline text for thematic styling  
- **Distributable branding slot**: Optional "Powered by" label for partner or white-label use  
- **Cross-framework design**: Reusable across React and Blazor applications (with shared patterns)

## Live Demo/Preview

A demo of the React component will be available shortly. In the meantime, you can explore the fixture search concept in action at [TripTab](https://triptab.co.uk).

## Installation 

npm install @your-scope/fixture-search

## Import Syntax


import { FixtureSearch } from '@your-scope/fixture-search';

<FixtureSearch />

Note: This release is zero-config. All options are managed internally. Configurable props coming soon.


## Configuration and Defaults 

This version of FixtureSearch uses a curated interface with internal configuration. It’s designed to work immediately on install, with no external props or setup required.

Key Defaults:
- Competition & Sport Scope: Currently limited to a single competition within one sport type — ideal for targeted use cases or MVP integration.
- Layout Framework: Styled using Bootstrap 5 for responsive behavior and consistent grid alignment. Consumers should ensure Bootstrap is available globally or scoped appropriately.
- Branding & Icons: Sport icon, strapline, and visual theme are embedded — designed to reflect the current sport context.

FixtureSearch is designed with extensibility in mind. While this release provides a focused, zero-config experience, upcoming iterations will introduce:
- Prop-driven customization
- Support for multiple competitions and sports
- Styling overrides and theming options
- Localisation and content slotting

Roadmap details and strategy discussion available in README.strategy.md.

## Development

FixtureSearch is built using Vite for fast bundling and dev-time performance, with vanilla JavaScript to enable rapid prototyping and ease of integration.
- The current build favors simplicity and accessibility over heavy configuration.
- TypeScript support is planned for a future release to provide stronger typing, improved IDE tooling, and scalable growth.
This version is optimized for learning, experimentation, and MVP deployment. Future updates will refine the internal structure and broaden configurability.

## Support/Feedback

For issues, feature requests, or general feedback, please open an issue or discussion in the repository. FixtureSearch is a work in progress — contributions and suggestions are welcome once configuration and multi-sport support land

## License

Released under the MIT License, allowing for reuse and modification with attribution. See LICENSE.md for full terms.

## Version 

Current version: 0.1.0

This release is a scoped MVP featuring:
- One sport and one league structure
- No props or external configuration
- Bootstrap 5-based layout

Further versions will introduce customization, theming, and multi-context support.

## 🔖 Versioning Approach

FixtureSearch follows [Semantic Versioning](https://semver.org/) to communicate stability and change with clarity:

- **Major** releases introduce breaking changes or significant design shifts.
- **Minor** releases add features or enhancements in a backward-compatible way.
- **Patch** releases address bugs, styling tweaks, or performance improvements.

Consumers can safely pin to minor/patch versions with confidence.  
The version tag also reflects internal milestones toward paid tiers and library expansion.

## Release Criteria

Each release of FixtureSearch must meet the following standards:

**Clean Build**  
  Linting, bundling, and build steps must pass without warnings or side effects.

**Passing Tests**  
  All unit and integration tests must pass, with updated snapshots where relevant.

**Formatter Injection Stable**  
  Custom render functions must pass manual injection tests and type safety checks.

**Documented Props & Usage**  
  README must reflect current prop structure, formatter options, and styling hooks.

**Visual Consistency**  
  Manual review for spacing, alignment, and responsiveness across breakpoints.

Each version is tagged with release notes summarizing what's changed and why it matters.