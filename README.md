# Chunav Saathi — चुनाव साथी

## Overview
Multilingual election education PWA for 
rural Indian voters. Supports Marathi, 
Hindi, and English.

## Features
- 9-step voting process walkthrough
- Interactive EVM practice simulator
- Voting Quiz (10 questions)
- 3 civic education games
- Multilingual (mr/hi/en)
- PWA — works offline
- Accessible (WCAG 2.1 AA)
- Google Analytics integrated

## Tech Stack
- Vanilla JS (ES6+)
- HTML5 / CSS3
- Google Fonts (Noto Sans Devanagari)
- Google Analytics (GA4)
- Service Worker (offline PWA)
- Web Audio API (EVM beep)

## Setup
1. Clone the repo
2. Open index.html in browser
   OR serve with: npx serve .
3. No build step required

## Testing
  node tests/app.test.js

## Deployment
Deployed on Vercel:
https://chunav-saathi-mocha.vercel.app

## Project Structure
  index.html      — Entry point
  app.js          — Router, state, navigation
  content.js      — All multilingual content
  screens.js      — Screen renderers
  styles.css      — Styles
  sw.js           — Service Worker
  tests/          — Unit tests

## Accessibility
WCAG 2.1 AA compliant.
Full keyboard navigation.
Screen reader compatible.
Voice readout in all 3 languages.

## License
MIT
